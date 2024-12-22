import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext, useParams } from "react-router-dom";
import TrackCard from "../Track/TrackCard";
import Cookies from "js-cookie";

const ArtistTracks = ({ userId }) => {
  const token = Cookies.get("access_token");
  const { id } = useParams();
  const [tracks, setTracks] = useState([]);
  const { playlists } = useOutletContext();

  useEffect(() => {
    if (!token) {
      console.error("Access token is missing");
      return;
    }

    const fetchArtistData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/artists/${id}/top-tracks?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTracks(response.data.tracks);
      } catch (error) {
        console.error("Error fetching artist data", error);
      }
    };

    fetchArtistData();
  }, [id, userId, token]);

  if (!tracks.length) return <div>Loading...</div>;

  return (
    <>
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          id={track.id}
          name={track.name}
          image={track.album.images[1]?.url}
          desc={track.album.release_date}
          uri={track.uri}
          playlists={playlists}
          token={token}
          userId={userId}
        />
      ))}
    </>
  );
};

export default ArtistTracks;
