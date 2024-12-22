import React from "react";
import { useOutletContext } from "react-router-dom";

const PlaylistDetailPage = ({
  name,
  album,
  dateAdded,
  image,
  duration,
  artists,
  id,
  uri,
}) => {
  const formattedDate = new Date(dateAdded).toLocaleDateString();
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  const formattedDuration = `${minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
  const { handleTrackSelect } = useOutletContext();

  return (
    <div
      className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer"
      onClick={() => handleTrackSelect(uri)}
    >
      <div className="flex text-white">
        <p className="mr-4 text-[#a7a7a7]">{id}</p>

        <img className="inline w-10 mr-5" src={image} />
        <div className="max-w-[150px]">
          <p className="truncate">{name}</p>
          <p className="text-sm text-gray-500 truncate">{artists}</p>
        </div>
      </div>

      <p className="text-sm hidden sm:block">{album}</p>
      <p className="text-sm hidden sm:block">{formattedDate}</p>
      <p className="text-sm text-center">{formattedDuration}</p>
    </div>
  );
};

export default PlaylistDetailPage;
