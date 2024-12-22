import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AlbumCard from "../Album/AlbumCard";
const ArtistAlbums = ({ userId }) => {
  const [albums, setAlbums] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/artists/${id}/albums?userId=${userId}`
        );
        console.log("Artist Albums Data: ", response);

        setAlbums(response.data.items);
      } catch (error) {
        console.error("Error fetching artist data");
      }
    };
    fetchArtistData();
  }, [id, userId]);

  return (
    <>
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          id={album.id}
          name={album.name}
          image={
            album.images && album.images[0]
              ? album.images[0].url
              : "default-image-url.jpg"
          }
          desc={album.release_date}
        />
      ))}
    </>
  );
};

export default ArtistAlbums;
