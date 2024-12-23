import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const AlbumTracks = ({ name, duration, artist, id, uri }) => {
  const { playlists, handleTrackSelect } = useOutletContext();
  const [addedTracks, setAddedTracks] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const token = Cookies.get("access_token");

  const formattedDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      if (!selectedPlaylist) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/playlists/${selectedPlaylist}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const trackIds = response.data.items.map((item) => item.track.id);
        setAddedTracks(trackIds);
      } catch (error) {
        console.error("Error fetching playlist tracks", error);
      }
    };

    fetchPlaylistTracks();
  }, [selectedPlaylist, token]);

  const addTrackToPlaylist = async (trackId, trackUri) => {
    if (!selectedPlaylist) {
      alert("Please select a playlist.");
      return;
    }

    try {
      if (addedTracks.includes(trackId)) {
        alert("Track is already in the playlist.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/playlists/add-track",
        {
          playlistId: selectedPlaylist,
          trackUri,
          token,
        }
      );
      console.log(
        `Details:  Token: ${token} , PlaylistId: ${selectedPlaylist} , TrackURI : ${trackUri}  `
      );

      if (response.status === 200) {
        setAddedTracks((prev) => [...prev, trackId]);
      } else {
        alert("Failed to add track to playlist.");
      }
    } catch (error) {
      console.error("Error adding track to playlist", error);
      if (error.status === 400) {
        alert("Track already in playlist.");
      } else {
        alert("An error occurred while adding the track.");
      }
    }
  };

  return (
    <div className="grid grid-col-2 sm:grid-cols-5 gap-4 p-2 mt-4 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer">
      <div className="flex text-white">
        <p className="mr-4 text-[#a7a7a7]">{id}</p>
        <div className="max-w-[150px]">
          <p className="truncate">{name}</p>
        </div>
      </div>
      <p className="text-sm hidden sm:block">{artist}</p>

      <div className="flex justify-center items-center relative">
        <button
          className={`text-xl rounded-full bg-neutral-600 hover:bg-green-500 hover:text-white h-8 w-8 pb-4  ${
            addedTracks.includes(id) ? "added" : ""
          }`}
          onClick={() => {
            addTrackToPlaylist(id, uri);
            setShowPlaylist(false); // Hide the dropdown when the button is clicked
          }}
          onMouseEnter={() => setShowPlaylist(true)} // Show playlist dropdown on hover
          disabled={addedTracks.includes(id)}
        >
          {addedTracks.includes(id) ? "✓" : "+"}
        </button>

        {showPlaylist && (
          <div className="mt-2 absolute top-[-14px] left-32  p-2 rounded shadow-md max-w-[100px] text-sm z-10">
            <select
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              className="bg-neutral-800 text-white p-2 rounded max-w-[160px]"
            >
              <option value="">Select a Playlist</option>
              {playlists &&
                playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      <p className="text-sm hidden sm:block text-center">
        {formattedDuration(duration)}
      </p>
      <a
        onClick={(e) => {
          e.stopPropagation();
          handleTrackSelect(uri);
        }}
        rel="noopener noreferrer"
        className="text-center text-green-500 hover:text-green-400"
      >
        Play
      </a>
    </div>
  );
};

export default AlbumTracks;
