import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TrackCard from "../Track/TrackCard";

const ArtistTracks = ({ userId }) => {
  console.log("User:", userId);
  const { id } = useParams();
  console.log("Artist:", id);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/artists/${id}/top-tracks?userId=${userId}`
        );
        console.log("Artist Tracks Data: ", response);

        setTracks(response.data.tracks);
      } catch (error) {
        console.error("Error fetching artist data");
      }
    };
    fetchArtistData();
  }, [id, userId]);

  if (!tracks) return <div>Loading...</div>;

  return (
    // <div className="bg-black text-white">
    //   <div className="p-6">
    //     <h2 className="text-2xl font-semibold mb-4">Tracks</h2>
    //     <div className="text-white space-y-4">
    <>
      {tracks.map((track, index) => (
        <TrackCard
          key={track.id}
          id={track.id}
          name={track.name}
          image={track.album.images[1]?.url}
          desc={track.album.release_date}
          uri={track.uri}
        />
        // <div
        //   key={track.id}
        //   className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
        // >
        //   <div className="flex items-center space-x-4">
        //     <div className="text-white text-lg font-semibold">
        //       {track.name}
        //     </div>
        //     <div className="text-gray-400 text-sm">
        //       {track.artists.map((artist) => artist.name).join(", ")}
        //     </div>
        //   </div>
        //   <div className="flex items-center space-x-4">
        //     <a
        //       href={track.external_urls.spotify}
        //       target="_blank"
        //       rel="noopener noreferrer"
        //       className="text-green-500 hover:text-green-400"
        //     >
        //       Play
        //     </a>
        //     <span className="text-gray-400">
        //       {Math.floor(track.duration_ms / 60000)}:
        //       {Math.floor((track.duration_ms % 60000) / 1000)
        //         .toString()
        //         .padStart(2, "0")}
        //     </span>
        //   </div>
        // </div>
      ))}
    </>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ArtistTracks;
