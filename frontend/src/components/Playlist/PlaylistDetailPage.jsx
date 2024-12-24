import React from "react";
import Cookies from "js-cookie";
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
  playlistId,
  onTrackRemoved,
}) => {
  const accessToken = Cookies.get("access_token");
  const formattedDate = new Date(dateAdded).toLocaleDateString();
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  const formattedDuration = `${minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
  const { handleTrackSelect } = useOutletContext();

  // Function to remove the track from the playlist

  const handleRemoveClick = async (e) => {
    e.stopPropagation(); // Prevents the track from being selected when removing
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tracks: [{ uri }], // The track URI to remove
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove track");
      }

      onTrackRemoved(uri);
      alert("Track removed from playlist");
    } catch (error) {
      console.error(error);
      alert("Error removing track");
    }
  };

  return (
    <div className="grid grid-cols-1 justify-between sm:grid-cols-2 md:grid-cols-6 gap-4 p-2 text-left text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer">
      <div className="flex text-white col-span-1 md:col-span-2 group">
        <p className="mr-4 text-[#a7a7a7]">{id}</p>
        <img className="inline w-10 h-10 mr-5" src={image} />
        <div className="max-w-[150px]">
          <p className="truncate">{name}</p>
          <p className="text-sm text-gray-500 truncate">{artists}</p>
        </div>
        <button
          onClick={handleRemoveClick}
          className="rounded-full mt-2 w-6 h-6 text-base  bg-neutral-600 hover:bg-red-600 text-white hover:text-white ml-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          -
        </button>
      </div>

      <p className="text-sm hidden md:block">{album}</p>
      <p className="text-sm hidden md:block">{formattedDate}</p>

      <p className="text-sm hidden md:block text-center">{formattedDuration}</p>
      <a
        onClick={(e) => {
          e.stopPropagation();
          handleTrackSelect(uri);
        }}
        rel="noopener noreferrer"
        className="text-center hover:text-green-400"
      >
        Play
      </a>
    </div>
  );
};

export default PlaylistDetailPage;
