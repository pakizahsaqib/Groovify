import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ArtistTracks from "./ArtistTracks";
import ArtistAlbums from "./ArtistAlbums";

const ArtistDetailPage = ({ userId }) => {
  const [artist, setArtist] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/artists/${id}?userId=${userId}`
        );

        console.log(response);

        setArtist(response.data);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };
    fetchData();
  }, [id, userId]);

  // Log artist data for debugging
  console.log("Artist data:", artist);

  if (!artist) return <div className="text-white">Loading...</div>;
  const { images, name, popularity, external_urls, genres, followers } = artist;
  return (
    <div className="overflow-auto text-white rounded-md ">
      {/* Artist Header */}
      <div className="p-2 rounded bg-gradient-to-b from-neutral-750  to-neutral-900 flex flex-col md:flex-row items-center md:items-start ">
        <img
          src={images[0]?.url}
          alt={name}
          className="rounded-lg w-64 h-64 object-cover shadow-md"
        />
        <div className="md:ml-8 mt-4  text-center md:text-left">
          <h1 className="text-4xl font-bold">{name}</h1>
          <p className="mt-2">Popularity: {popularity}</p>
          <p className=" mt-1">Followers: {followers.total.toLocaleString()}</p>

          {/* Artist Genres */}
          <div className="mt-3">
            <div className="flex flex-col md:flex-row flex-wrap  mt-4">
              {genres.map((genre, index) => (
                <span
                  key={index}
                  className="bg-neutral-300 text-black  text-sm px-3 py-1 md:py-2 rounded-full mr-2 mb-2"
                >
                  {genre.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <a
            href={external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-white bg-green-500 px-4 py-2 rounded-lg shadow hover:bg-green-600"
          >
            View on Spotify
          </a>
        </div>
      </div>

      <div className="mt-4 mb-4">
        <h1 className="m-1 font-bold text-2xl p-4">{artist.name}'s Tracks</h1>
        <div className="flex overflow-auto p-4">
          <ArtistTracks userId={userId} />
        </div>
      </div>

      <div className="mb-4">
        <h1 className="m-1 font-bold text-2xl p-4">{artist.name}'s' Albums</h1>
        <div className="flex overflow-auto p-4">
          <ArtistAlbums userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
