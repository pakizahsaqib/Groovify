// import React from "react";

// const AudioPlayer = ({ trackUri }) => {
//   return (
//     <div className="bg-[#121212] flex justify-between items-center text-white pb-1">
//       {trackUri ? (
//         <iframe
//           src={`https://open.spotify.com/embed/track/${trackUri.split(":")[2]}`}
//           width="100%"
//           height="80"
//           frameBorder="0"
//           allow="encrypted-media"
//         ></iframe>
//       ) : (
//         <p>No track selected</p>
//       )}
//     </div>
//   );
// };

// export default AudioPlayer;

//....................................................................

//PLAYBACK Logic - Remote Control
import { useEffect, useState } from "react";
import { assets, songsData } from "../assets/frontend-assets/assets";
import Cookies from "js-cookie";
import spotifyServices from "../services/spotifyServices";

const AudioPlayer = ({ trackUri }) => {
  const accessToken = Cookies.get("access_token");
  const [deviceId, setDeviceId] = useState(null);
  const [player, setPlayer] = useState(null);
  const [trackDetails, setTrackDetails] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (state) {
          setCurrentTime(state.position);
          setDuration(state.duration);
          setIsPlaying(!state.paused);
          const currentTrack = state.track_window.current_track;
          setTrackDetails({
            name: currentTrack.name,
            artist: currentTrack.artists
              .map((artist) => artist.name)
              .join(", "),
            image: currentTrack.album.images[0]?.url,
          });
        }
      });

      player.connect();
      setPlayer(player);
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken]);

  const fetchCurrentTrack = async () => {
    try {
      const response = await spotifyServices.getCurrentlyPlayingTrack(
        accessToken
      );
      if (response.data?.item) {
        setTrackDetails({
          name: response.data.item.name,
          artist: response.data.item.artists
            .map((artist) => artist.name)
            .join(", "),
          image: response.data.item.album.images[0]?.url,
        });
        setDuration(response.data.item.duration_ms);
      }
    } catch (error) {
      console.error("Error fetching current track:", error);
    }
  };

  // Fetch and update track details whenever trackUri changes
  useEffect(() => {
    if (trackUri) {
      spotifyServices
        .startResumePlayback(accessToken, deviceId, [trackUri])
        .then(() => {
          setIsPlaying(true);
          fetchCurrentTrack();
        });
    }
  }, [trackUri, accessToken, deviceId]);

  const togglePlayPause = () => {
    if (isPlaying) {
      spotifyServices
        .pausePlayback(accessToken)
        .then(() => setIsPlaying(false));
    } else {
      spotifyServices
        .startResumePlayback(accessToken, deviceId, [trackUri])
        .then(() => {
          setIsPlaying(true);
          fetchCurrentTrack();
        });
    }
  };

  const playNextSong = async () => {
    try {
      await spotifyServices.skipToNextTrack(accessToken);
      fetchCurrentTrack();
    } catch (error) {
      console.error("Error skipping to next track:", error);
    }
  };

  const playPreviousSong = async () => {
    try {
      await spotifyServices.skipToPreviousTrack(accessToken);
      fetchCurrentTrack();
    } catch (error) {
      console.error("Error skipping to previous track:", error);
    }
  };

  const toggleShuffle = async () => {
    const newShuffleState = !isShuffle;
    setIsShuffle(newShuffleState);
    try {
      await spotifyServices.setShuffleState(accessToken, newShuffleState);
    } catch (error) {
      console.error("Error toggling shuffle:", error);
    }
  };

  const toggleRepeatMode = async () => {
    let newRepeatMode;
    if (repeatMode === "off") {
      newRepeatMode = "track";
    } else if (repeatMode === "track") {
      newRepeatMode = "context";
    } else {
      newRepeatMode = "off";
    }
    setRepeatMode(newRepeatMode);
    try {
      await spotifyServices.setRepeatMode(accessToken, newRepeatMode);
    } catch (error) {
      console.error("Error toggling repeat mode:", error);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    spotifyServices.setPlaybackVolume(accessToken, newVolume);
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    spotifyServices.seekToPosition(accessToken, newTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        player.getCurrentState().then((state) => {
          if (!state) {
            return;
          }
          setCurrentTime(state.position);
          setDuration(state.duration);
          setIsPlaying(!state.paused);
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  return (
    <div className=" bg-black flex justify-between items-center text-white p-4">
      {/* Section 1 : Name, Artist */}
      <div className=" hidden lg:flex items-center gap-4  ">
        <img
          className="w-12"
          src={trackDetails ? trackDetails.image : songsData[0].image}
          alt={trackDetails?.name}
        />
        <div className="hidden lg:block">
          <p className="text-sm font-semibold">
            {trackDetails?.name || "No track playing"}
          </p>
          <p className="text-xs text-gray-400">
            {trackDetails?.artist || "Unknown Artist"}
          </p>
        </div>
      </div>
      {/* Section 2 : Player and player controls */}
      <div className="flex flex-col items-center gap-4 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={isShuffle ? assets.shuffle_icon : assets.shuffle_icon}
            alt="Shuffle"
            onClick={toggleShuffle}
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="Previous"
            onClick={playPreviousSong}
          />
          <img
            className="w-4 cursor-pointer"
            src={isPlaying ? assets.pause_icon : assets.play_icon}
            alt={isPlaying ? "Pause" : "Play"}
            onClick={togglePlayPause}
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="Next"
            onClick={playNextSong}
          />
          <img
            className="w-4 cursor-pointer"
            src={
              repeatMode === "off"
                ? assets.loop_icon
                : repeatMode === "track"
                ? assets.loop_icon
                : assets.loop_icon
            }
            alt="Repeat"
            onClick={toggleRepeatMode}
          />
        </div>

        <div className="flex items-center gap-5">
          <p className="text-xs">
            {`${Math.floor(currentTime / 60000)}:${(
              (currentTime % 60000) /
              1000
            )
              .toFixed(0)
              .padStart(2, "0")}`}
          </p>

          <div className="w-[60vw] max-w-[500px] bg-neutral-600 rounded-full cursor-pointer">
            <input
              type="range"
              value={currentTime}
              max={duration}
              className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
              onChange={handleProgressChange}
            />
            <div
              className="bg-green-500 h-1 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs">
            {`${Math.floor(duration / 60000)}:${((duration % 60000) / 1000)
              .toFixed(0)
              .padStart(2, "0")}`}
          </p>
        </div>
      </div>
      {/* Section 3 : Volume and Other Control */}
      <div className="hidden lg:flex items-center gap-2 opacity-75  ">
        <img className="w-4" src={assets.plays_icon} alt="Play Icon" />
        <img className="w-4" src={assets.mic_icon} alt="Mic Icon" />
        <img className="w-4" src={assets.queue_icon} alt="Queue Icon" />
        <img className="w-4" src={assets.speaker_icon} alt="Speaker Icon" />
        <div className="flex items-center gap-2">
          <input
            type="range"
            value={volume}
            max="100"
            onChange={handleVolumeChange}
            className="w-24 h-1 cursor-pointer"
          />
          <img
            className="w-4"
            src={assets.mini_player_icon}
            alt="Mini Player Icon"
          />
        </div>
        <img className="w-4" src={assets.zoom_icon} alt="Zoom Icon" />
      </div>
    </div>
  );
};

export default AudioPlayer;
