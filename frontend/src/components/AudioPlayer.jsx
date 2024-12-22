import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import Cookies from "js-cookie";

const AudioPlayer = ({ trackUri }) => {
  const accessToken = Cookies.get("access_token");
  const [trackDetails, setTrackDetails] = useState(null); // Track details
  const [isPlaying, setIsPlaying] = useState(false); // Track play state

  // Fetch track details (name, artist, image)
  useEffect(() => {
    if (trackUri && accessToken) {
      fetchTrackDetails(trackUri, accessToken);
    }
  }, [trackUri, accessToken]);

  const fetchTrackDetails = async (uri, token) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks/${uri.split(":")[2]}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setTrackDetails({
        name: data.name,
        artist: data.artists[0].name,
        image: data.album.images[0]?.url,
      });
    } catch (error) {
      console.error("Error fetching track details:", error);
    }
  };

  // Callback to handle player state changes
  const handlePlayerStateChange = (state) => {
    if (state && state.is_playing !== undefined) {
      setIsPlaying(state.is_playing);
    }
  };

  return (
    <div className="bg-[#121212] flex justify-between items-center text-white">
      {/* <div className="flex items-center gap-4 w-[250px]">
        {trackDetails && (
          <div className="hidden lg:flex items-center gap-4">
            <img
              className="w-14"
              src={
                trackDetails ? trackDetails.image : assets.default_track_image
              }
              alt="Track Thumbnail"
            />
            <div className="text-sm">
              <p className="truncate max-w-[100px]">
                {trackDetails ? trackDetails.name : "Track Name"}
              </p>
              <p>
                {trackDetails ? trackDetails.artist.slice(0, 12) : "Artist"}
              </p>
            </div>
          </div>
        )}
      </div> */}

      {trackUri ? (
        <iframe
          src={`https://open.spotify.com/embed/track/${trackUri.split(":")[2]}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
};

export default AudioPlayer;

// import React, { useEffect, useState } from "react";
// import { assets } from "../assets/frontend-assets/assets";
// import Cookies from "js-cookie";

// const AudioPlayer = () => {
//   const accessToken = Cookies.get("access_token");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [player, setPlayer] = useState(null); // Spotify Player instance
//   const [trackUri, setTrackUri] = useState(
//     "spotify:track:4uLU6hMCjMI75M1A2tKUQC"
//   ); // Default track URI
//   const [currentTrack, setCurrentTrack] = useState(null); // Track details (name, artist, image)
//   const [playlist, setPlaylist] = useState([]); // Playlist of tracks

//   // Fetch the playlist from Spotify API
//   useEffect(() => {
//     if (!accessToken) return;

//     const fetchPlaylist = async () => {
//       const response = await fetch(
//         "https://api.spotify.com/v1/me/top/artists",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       const data = await response.json();
//       setPlaylist(data.items); // Assuming the response contains a list of items
//     };

//     fetchPlaylist();
//   }, [accessToken]);

//   // Load the Spotify Web Playback SDK script
//   useEffect(() => {
//     if (!accessToken) return;

//     const script = document.createElement("script");
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;
//     document.body.appendChild(script);

//     window.onSpotifyWebPlaybackSDKReady = () => {
//       const newPlayer = new window.Spotify.Player({
//         name: "Clone App Player",
//         getOAuthToken: (cb) => cb(accessToken),
//         volume: 0.5,
//       });

//       newPlayer.connect();

//       newPlayer.addListener("ready", ({ device_id }) => {
//         console.log("Ready with Device ID", device_id);
//       });

//       newPlayer.addListener("player_state_changed", (state) => {
//         if (!state) return;
//         setIsPlaying(!state.paused);
//       });

//       setPlayer(newPlayer); // Store the player instance
//     };
//   }, [accessToken]);

//   // Play selected track
//   const playTrack = (uri, trackName, artistName, trackImage) => {
//     if (player) {
//       setTrackUri(uri);
//       setCurrentTrack({
//         name: trackName,
//         artist: artistName,
//         image: trackImage,
//       });
//       player.play({ uris: [uri] }); // Play the selected track
//       setIsPlaying(true);
//     }
//   };

//   // Control playback (Play, Pause, Next, Previous)
//   const play = () => {
//     if (player) {
//       player.resume();
//       setIsPlaying(true);
//     }
//   };

//   const pause = () => {
//     if (player) {
//       player.pause();
//       setIsPlaying(false);
//     }
//   };

//   const next = () => {
//     if (player) {
//       player.nextTrack();
//     }
//   };

//   const prev = () => {
//     if (player) {
//       player.previousTrack();
//     }
//   };

//   const seek = (position) => {
//     if (player) {
//       player.seek(position);
//     }
//   };

//   return (
//     <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
//       <div className="hidden lg:flex items-center gap-4">
//         <img
//           className="w-12"
//           src={currentTrack ? currentTrack.image : assets.default_track_image} // Dynamic track image
//           alt="Track Thumbnail"
//         />
//         <div>
//           <p>{currentTrack ? currentTrack.name : "Track Name"}</p>
//           <p>{currentTrack ? currentTrack.artist : "Artist"}</p>
//         </div>
//       </div>
//       <div className="flex flex-col items-center gap-1 m-auto">
//         <div className="flex gap-4">
//           <img
//             className="w-4 cursor-pointer"
//             src={assets.shuffle_icon}
//             alt="Shuffle"
//           />
//           <img
//             className="w-4 cursor-pointer"
//             src={assets.prev_icon}
//             alt="Previous"
//             onClick={prev} // Previous track
//           />
//           <img
//             className="w-4 cursor-pointer"
//             src={isPlaying ? assets.pause_icon : assets.play_icon}
//             alt="Play/Pause"
//             onClick={isPlaying ? pause : play} // Play or Pause
//           />
//           <img
//             className="w-4 cursor-pointer"
//             src={assets.next_icon}
//             alt="Next"
//             onClick={next} // Next track
//           />
//           <img
//             className="w-4 cursor-pointer"
//             src={assets.loop_icon}
//             alt="Loop"
//           />
//         </div>
//         <div className="flex items-center gap-5">
//           <p>1:18</p>
//           <div
//             className="w-[60vw] max-w-[500px] bg-neutral-600 rounded-full cursor-pointer"
//             onClick={(e) => {
//               const progressBar = e.target;
//               const newPosition =
//                 (e.clientX - progressBar.offsetLeft) / progressBar.offsetWidth;
//               const newTime = newPosition * 200000; // 3:20 total time in ms (adjust as necessary)
//               seek(newTime);
//             }}
//           >
//             <hr className="h-1 border-none w-10 bg-white hover:bg-green-800 rounded-full" />
//           </div>
//           <p>3:20</p>
//         </div>
//       </div>
//       <div className="hidden lg:flex items-center gap-2 opacity-75">
//         <img className="w-4" src={assets.plays_icon} alt="Play Icon" />
//         <img className="w-4" src={assets.mic_icon} alt="Mic Icon" />
//         <img className="w-4" src={assets.queue_icon} alt="Queue Icon" />
//         <img className="w-4" src={assets.speaker_icon} alt="Speaker Icon" />
//         <img className="w-4" src={assets.volume_icon} alt="Volume Icon" />
//         <div className="w-20 bg-slate-50 h-1 rounded"></div>
//         <img
//           className="w-4"
//           src={assets.mini_player_icon}
//           alt="Open mini-player icon"
//         />
//         <img className="w-4" src={assets.zoom_icon} alt="Zoom Icon" />
//       </div>
//       <div className="flex gap-4 mt-4 overflow-x-auto">
//         {playlist.map((track) => (
//           <div
//             key={track.id}
//             className="flex flex-col items-center cursor-pointer"
//             onClick={() =>
//               playTrack(
//                 track.uri,
//                 track.name,
//                 track.artists[0].name,
//                 track?.album?.images[0]?.url
//               )
//             }
//           >
//             <img
//               src={track.album.images[0].url}
//               alt={track.name}
//               className="w-20 h-20 object-cover rounded-lg"
//             />
//             <p>{track.name}</p>
//             <p>{track.artists[0].name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AudioPlayer;
