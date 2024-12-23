import React, { useState, useEffect } from "react";
import ArtistCard from "./Artist/ArtistCard";
import AlbumCard from "./Album/AlbumCard";
import axios from "axios";
import Cookies from "js-cookie";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { userData, searchResults } = useOutletContext();
  console.log("Search Results : ", searchResults.length);
  const [popularArtists, setPopularArtists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [filter, setFilter] = useState("All");

  console.log("HOME : ", userData.userId);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    console.log("Access Token", accessToken);
    if (accessToken) {
      fetchArtist(accessToken);
      fetchReleases(accessToken);
    } else {
      console.error("No access token found!");
    }
  }, []);

  const fetchArtist = async (token) => {
    console.log("FetchArtist", token);

    if (!token) {
      console.error("Token is missing");
      return;
    }

    if (!userData.userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/artists?userId=${userData.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data) {
        console.log("Fetched artists:", response.data);
        setPopularArtists(response.data || []);
      } else {
        console.error("Invalid response data");
      }
    } catch (error) {
      console.error("Error fetching popular artists:", error);
    }
  };

  const fetchReleases = async (token) => {
    console.log("FetchReleases", token);
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/popular/new-releases/${userData.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewReleases(response.data.albums || []);
    } catch (error) {
      console.error("Error fetching newly-released playlist:", error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            filter === "All"
              ? "bg-white text-black"
              : "bg-neutral-700 hover:bg-white hover:text-black"
          }`}
          onClick={() => setFilter("All")}
        >
          All
        </p>
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            filter === "Albums"
              ? "bg-white text-black"
              : "bg-neutral-700 hover:bg-white hover:text-black"
          }`}
          onClick={() => setFilter("Albums")}
        >
          Albums
        </p>
        <p
          className={`px-4 py-1 rounded-2xl cursor-pointer ${
            filter === "Artists"
              ? "bg-white text-black"
              : "bg-neutral-700 hover:bg-white hover:text-black"
          }`}
          onClick={() => setFilter("Artists")}
        >
          Artists
        </p>
      </div>
      <div className="my-4 overflow-auto">
        {filter === "All" || filter === "Artists" ? (
          <div className="mb-4">
            <h1 className="m-1 font-bold text-2xl p-4">Popular Artists</h1>
            <div className="flex overflow-auto p-4">
              {popularArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  id={artist.id}
                  name={artist.name}
                  image={
                    artist.imageUrl ? artist.imageUrl : "default-image-url.jpg"
                  }
                />
              ))}
            </div>
          </div>
        ) : null}

        {filter === "All" || filter === "Albums" ? (
          <div className="mb-4">
            <h1 className="m-1 font-bold text-2xl p-4">Featured Albums</h1>
            <div className="flex overflow-auto p-4">
              {newReleases.map((album) => (
                <AlbumCard
                  key={album.id}
                  id={album.id}
                  name={album.name}
                  image={
                    album.images && album.images[0]
                      ? album.images[0].url
                      : "default-image-url.jpg"
                  }
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
