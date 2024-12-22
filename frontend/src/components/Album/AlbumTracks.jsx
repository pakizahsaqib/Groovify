import React from "react";
import { useOutletContext } from "react-router-dom";

const AlbumTracks = ({ name, duration, artist, id, url, uri }) => {
  const { handleTrackSelect } = useOutletContext();
  const formattedDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div
      className="grid grid-col-2 sm:grid-cols-4 gap-4 p-2 mt-4 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer"
      onClick={() => handleTrackSelect(uri)}
    >
      <div className="flex text-white">
        <p className="mr-4 text-[#a7a7a7]">{id}</p>

        {/* <img className="inline w-10 mr-5" src={image} /> */}
        <div className="max-w-[150px]">
          <p className="truncate">{name}</p>
        </div>
      </div>
      <p className="text-sm hidden sm:block">{artist}</p>

      {/* <p className="text-sm hidden sm:block">{album}</p> */}

      <p className="text-sm hidden sm:block text-center">
        {formattedDuration(duration)}
      </p>
      <a
        href={url}
        rel="noopener noreferrer"
        className="text-center text-green-500 hover:text-green-400"
      >
        Play
      </a>
    </div>
  );
};

export default AlbumTracks;
