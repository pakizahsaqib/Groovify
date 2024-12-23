import React, { useState, useEffect } from "react";
import { assets } from "../../assets/frontend-assets/assets";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const TrackCard = ({ name, image, desc, id, uri, playlists, token }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [addedTracks, setAddedTracks] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const { handleTrackSelect } = useOutletContext();

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
    <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative group">
      <img className="rounded" src={image} alt={name} />
      <p className="font-bold mt-2 mb-1">{name.slice(0, 18)}</p>
      <p className="text-slate-200 text-sm">{desc}</p>

      {/* Add Button */}
      <button
        className={`add-to-playlist-btn mt-2 ${
          addedTracks.includes(id) ? "added" : ""
        }`}
        onClick={() => {
          addTrackToPlaylist(id, uri);
          setShowPlaylist(false); // Hide the dropdown when the button is clicked
        }}
        onMouseEnter={() => setShowPlaylist(true)} // Show playlist dropdown on hover
        disabled={addedTracks.includes(id)}
      >
        {addedTracks.includes(id) ? "✓ Added" : "+ Add"}
      </button>

      {showPlaylist && (
        <div className="mt-2 absolute top-16 left-2 bg-neutral-800 p-2 rounded shadow-md max-w-[160px] z-10">
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

      <button
        onClick={() => handleTrackSelect(uri)}
        className="absolute top-4 left-4 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <img src={assets.play_icon} alt="Play" className="w-5 h-5" />
      </button>
    </div>
  );
};

export default TrackCard;
