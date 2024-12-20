import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AudioPlayer from "./AudioPlayer";
import axios from "axios";
import Cookies from "js-cookie";
import Home from "./Home";
import PlaylistItem from "./PlaylistItem";

function MainLayout({ userData }) {
  const [playlists, setPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("access_token"); // Use js-cookie to get token

    // const accessToken = document.cookie
    //   .split("; ")
    //   .find((row) => row.startsWith("access_token="));
    console.log("Access Token", accessToken);
    if (accessToken) {
      fetchPlaylists(accessToken);
    } else {
      console.error("No access token found!");
    }
  }, []);
  const fetchPlaylists = async (token) => {
    console.log("FetchPlaylist", token);
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetch Response", response.data);
      console.log("Fetched playlists:", response.data.items);
      setPlaylists(response.data.items || []);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const handlePlaylistClick = (playlist) => {
    console.log("Selected Playlist:", playlist);
    setSelectedPlaylist(playlist);
    console.log("Updated selectedPlaylist state:", playlist);
  };

  return (
    <div className="h-screen bg-black">
      <Navbar setSearchResults={setSearchResults} />
      <div className="h-[80%] m-0 flex">
        <Sidebar playlists={playlists} onPlaylistClick={handlePlaylistClick} />
        <div className="w-[100%] px-6 pt-4 rounded-lg bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
          {searchResults.length > 0 ? (
            <Home searchResults={searchResults} />
          ) : selectedPlaylist ? (
            <PlaylistItem selectedPlaylist={selectedPlaylist} />
          ) : (
            <Home searchResults={[]} />
          )}
        </div>
      </div>

      <div className="main-content">
        <h1>{userData?.display_name || "Guest"}</h1>
        <AudioPlayer />
        {/* Additional content, like user's playlists or home section */}
      </div>
    </div>
  );
}

export default MainLayout;
