import React, { useState, useEffect } from "react";
import { assets } from "../../assets/frontend-assets/assets";
import axios from "axios";
import Cookies from "js-cookie";
import PlaylistDetailPage from "./PlaylistDetailPage";
import { useOutletContext } from "react-router-dom";

const PlaylistItem = () => {
  const { selectedPlaylist } = useOutletContext();
  const token = Cookies.get("access_token");

  const [tracks, setTracks] = useState([]);
  const [formattedDuration, setFormattedDuration] = useState("");

  // Fetch tracks when selectedPlaylist or accessToken changes
  useEffect(() => {
    const fetchTracks = async (playlistId) => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTracks(response.data.items);

        const totalDuration = response.data.items.reduce(
          (acc, track) => acc + track.track.duration_ms,
          0
        );
        formatDuration(totalDuration);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    if (selectedPlaylist?.id) {
      fetchTracks(selectedPlaylist.id);
    }
  }, [selectedPlaylist?.id, token]);

  //Formatting Duration --- 1:02:30
  const formatDuration = (durationMs) => {
    const totalMinutes = Math.floor(durationMs / 60000); // Total minutes
    const totalSeconds = Math.floor((durationMs % 60000) / 1000); // Remaining seconds

    const minutes = totalMinutes % 60; // To get minutes in the range 0-59
    const hours = Math.floor(totalMinutes / 60); // Hours calculation

    setFormattedDuration(
      hours > 0
        ? `${hours} hr ${minutes} min ${totalSeconds} sec`
        : `${minutes} min ${totalSeconds} sec`
    );
  };

  // Handle track removal
  const handleTrackRemoved = (trackUri) => {
    setTracks((prevTracks) =>
      prevTracks.filter((track) => track.track.uri !== trackUri)
    );
  };

  return (
    <div className="p-10 overflow-auto text-white rounded-md text-center sm:text-left">
      {selectedPlaylist && (
        <div>
          <div className="flex gap-8 flex-col md:flex-row md:items-center">
            <img
              className="w-48 rounded self-center sm:self-start"
              src={
                selectedPlaylist?.images && selectedPlaylist.images.length > 0
                  ? selectedPlaylist.images[0]?.url
                  : "https://via.placeholder.com/150"
              }
              alt={selectedPlaylist?.name || "Playlist Image"}
            />
            <div className="flex flex-col">
              <p>Playlist</p>
              <h2 className="text-5xl font-bold mb-4 md:text-8xl">
                {selectedPlaylist.name}
              </h2>
              <p className="mt-1">
                {selectedPlaylist.owner.display_name}
                <p className="font-light text-neutral-400 text-sm inline-block">
                  {" "}
                  <b className="text-neutral-300 mx-1 font-semibold">•</b>
                  {tracks.length} songs, {formattedDuration}
                </p>
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-6 mt-10 mb-4 pl-2 text-white text-left">
            <p className="col-span-1 md:col-span-2">
              <b className="mr-4">#</b>Title
            </p>

            <p className="hidden md:block">Album</p>
            <p className="hidden md:block">Date Added</p>
            <img
              className="m-auto w-4 hidden md:block"
              src={assets.clock_icon}
              alt="Clock icon"
            />
            <img
              className="m-auto w-4 text-right sm:text-center"
              src={assets.play_icon}
              alt="Play icon"
            />
          </div>
          <div className="mx-4 bg-neutral-300 h-[0.5px] mb-2"></div>

          <div>
            {tracks.map((track, index) => (
              <PlaylistDetailPage
                key={track.track.id}
                name={track.track.name}
                album={track.track.album.name}
                dateAdded={track.added_at}
                duration={track.track.duration_ms}
                image={track.track.album.images[0]?.url}
                artists={track.track.artists
                  .map((artist) => artist.name)
                  .join(", ")}
                id={index + 1}
                uri={track.track.uri}
                playlistId={selectedPlaylist.id}
                onTrackRemoved={handleTrackRemoved}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistItem;
