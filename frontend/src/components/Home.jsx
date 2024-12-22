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
      //      console.log("Fetch Response", response.data);

      setNewReleases(response.data.albums || []);
    } catch (error) {
      console.error("Error fetching newly-released playlist:", error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-neutral-700 hover:bg-white hover:text-black px-4 py-1 rounded-2xl cursor-pointer">
          Music
        </p>
        <p className="bg-neutral-700 hover:bg-white hover:text-black px-4 py-1 rounded-2xl cursor-pointer">
          Podcast
        </p>
      </div>
      <div className="my-4 overflow-auto">
        <>
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
        </>
      </div>
    </>
  );
};
export default Home;
{
  /*
  // import React, { useEffect, useState } from "react";
  // import { getArtists, getAlbums, getTracks } from "../services/api";
  // import ArtistCard from "./ArtistCard";
  // import AlbumCard from "./AlbumCard";
  // const Home = () => {
  //   const [artists, setArtists] = useState([]);
  //   const [albums, setAlbums] = useState([]);
  //   const [tracks, setTracks] = useState([]);
  //   useEffect(() => {
  //     getArtists().then((data) => setArtists(data));
  //     getAlbums().then((data) => setAlbums(data));
  //     getTracks().then((data) => setTracks(data));
  //   }, []);
  //   return (
  //     <>
  //       <div className="mb-4">
  //         <h1 className="my-5 font-bold text-2xl">Popular Artists</h1>
  //         <div className="flex overflow-auto">
  //           {artists.map((artist) => (
  //             <ArtistCard key={artist.id} artist={artist} />
  //           ))}
  //         </div>
  //       </div>
  //       <div className="mb-4">
  //         <h1 className="my-5 font-bold text-2xl">Featured Albums</h1>
  //         <div className="flex overflow-auto">
  //           {albums.map((album) => (
  //             <AlbumCard key={album.id} album={album} />
  //           ))}
  //         </div>
  //       </div>
  //       <div className="mb-4">
  //         <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
  //         <div className="flex overflow-auto">
  //           {tracks.map((track) => (
  //             <TrackCard key={track.id} track={track} />
  //           ))}
  //         </div>
  //       </div>
  //     </>
  //   );
  // };
  // export default Home; */
}
