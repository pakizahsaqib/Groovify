import React, { useState, useEffect, Children } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import AudioPlayer from "./AudioPlayer";
import axios from "axios";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

function MainLayout({ userData }) {
  console.log("Main Layout", userData);
  const [playlists, setPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [trackUri, setTrackUri] = useState(
    "spotify:track:7qiZfU4dY1lWllzX7mPBI3"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
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
  const handleSearch = (results) => {
    setSearchResults(results);
    searchResults.length > 0 ? navigate("/main/search") : navigate("/main");
  };
  const handleTrackSelect = (uri) => {
    setTrackUri(uri);
  };

  return (
    <div className="h-screen bg-black relative">
      <Navbar username={userData?.username} setSearchResults={handleSearch} />
      <div className="h-[80%] m-0 flex">
        <Sidebar playlists={playlists} onPlaylistClick={handlePlaylistClick} />
        <div className="w-[100%] px-6 pt-4 flex-1 rounded-lg bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
          <Outlet
            context={{
              selectedPlaylist,
              userData,
              searchResults,
              handleTrackSelect,
              playlists,
            }}
          />
          <Footer />
        </div>
      </div>

      <div className="h-[10%] absolute bottom-0 left-0 right-0">
        {<AudioPlayer trackUri={trackUri} />}
      </div>
    </div>
  );
}

export default MainLayout;
