import React, { useState, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import axios from "axios";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import ArtistDetailPage from "./components/Artist/ArtistDetailPage";
import ArtistAlbums from "./components/Artist/ArtistAlbums";
import ArtistTracks from "./components/Artist/ArtistTracks";
import Cookies from "js-cookie";
import AlbumDetailPage from "./components/Album/AlbumDetailPage";
import AlbumTracks from "./components/Album/AlbumTracks";
import Home from "./components/Home";
import PlaylistItem from "./components/Playlist/PlaylistItem";
import SearchResults from "./components/SearchResult";
import ExplorePremium from "./components/ExplorePremium";
import InstallApp from "./components/InstallApp";
import Signup from "./components/Signup";

function App() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" || false
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    if (accessToken && !userData) {
      axios
        .get("/auth/callback", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          const fetchedUserData = response.data.userData;
          setUserData(fetchedUserData);
          setIsAuthenticated(true);
          localStorage.setItem("userData", JSON.stringify(fetchedUserData));
          localStorage.setItem("isAuthenticated", "true");
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem("userData");
          localStorage.removeItem("isAuthenticated");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [userData]);

  const handleLogout = () => {
    setUserData(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("isAuthenticated");
    Cookies.remove("access_token");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {isAuthenticated ? (
        <>
          <Route
            path="/main"
            element={<MainLayout userData={userData} onLogout={handleLogout} />}
          >
            <Route index element={<Home userId={userData.userId} />} />
            <Route path="playlist" element={<PlaylistItem />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="premium" element={<ExplorePremium />} />
            <Route path="installApp" element={<InstallApp />} />
            <Route
              path="artists/:id"
              element={<ArtistDetailPage userId={userData.userId} />}
            />
            <Route path="artists/:id/albums" element={<ArtistAlbums />} />
            <Route path="artists/:id/top-tracks" element={<ArtistTracks />} />
            <Route
              path="album/:id"
              element={<AlbumDetailPage userId={userData.userId} />}
            />
            <Route path="album/:id/tracks" element={<AlbumTracks />} />
          </Route>
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}

      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/main" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
