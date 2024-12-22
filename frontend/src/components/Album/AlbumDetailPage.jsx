import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets, songsData } from "../../assets/frontend-assets/assets";
import axios from "axios";
import AlbumTracks from "./AlbumTracks";

const AlbumDetailPage = ({ userId }) => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/albums/${id}?userId=${userId}`
        );
        setAlbum(response.data);
        console.log(album);
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    };
    fetchData();
  }, [id, userId]);

  if (!album) return <div className="text-white">Loading...</div>;

  return (
    <div className="overflow-auto">
      <div className="overflow-auto text-white rounded-md mt-2 flex items-center gap-8 flex-col md:flex-row  ">
        <img
          className="w-40 md:w-64 rounded"
          src={album.images?.[0]?.url || ""}
          alt={album.name}
        />
        <div className="flex flex-col p-2 items-center text-center md:items-start ">
          <p className="m-0">Album</p>
          <h2 className="text-3xl font-bold md:text-left mb-4 md:text-6xl">
            {album.name}
          </h2>
          <h4 className="text-sm text-green-600 ">{album.label}</h4>
          <h4 className="text-sm my-1 ">Realeased on : {album.release_date}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-6 mr-2"
              src={assets.spotify_logo}
              alt="Spotify Logo"
            />
            <b>Spotify</b>
            <span className="font-light text-sm inline-block">
              {" "}
              • {album.popularity} popularity • {album.total_tracks} tracks
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-col-4 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p className="hidden sm:block">Artist</p>
        <img
          className="m-auto w-4 hidden sm:block"
          src={assets.clock_icon}
          alt="Clock icon"
        />
        <img className="m-auto w-4" src={assets.play_icon} alt="Play icon" />
      </div>
      <hr />
      <div className="my-4">
        {album.tracks?.items?.map((track, index) => (
          <AlbumTracks
            key={track.id}
            id={index + 1}
            name={track.name}
            artist={track.artists[0].name}
            duration={track.duration_ms}
            url={track.external_urls.spotify}
            uri={track.uri}
          />
        ))}
      </div>
      {/* // <div
        //   key={track.id}
        //   className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26]"
        // >
        //   <p className="text-white">
        //     <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
        //     {track.name}
        //   </p>

        //   <p className="text-sm hidden sm:block">
        //     {formatDuration(track.duration_ms)}
        //   </p>
        // </div> */}
    </div>
  );
};

export default AlbumDetailPage;
