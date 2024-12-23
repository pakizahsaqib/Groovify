import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import Cookies from "js-cookie";
import RenamePlaylist from "./RenamePlaylist";

const Sidebar = ({ userId, playlists, onPlaylistClick, setPlaylists }) => {
  const [width, setWidth] = useState(300);
  const [clicked, setClicked] = useState(true);
  const sidebarRef = useRef(null);
  const dragRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX || e.touches[0]?.clientX;
    const startWidth = sidebarRef.current.offsetWidth;

    const handleMouseMove = (moveEvent) => {
      const clientX = moveEvent.clientX || moveEvent.touches[0]?.clientX;
      const delta = clientX - startX;
      const newWidth = Math.min(Math.max(startWidth + delta, 220), 500);
      setWidth(newWidth);
      if (newWidth === 500) {
        setClicked(false);
      }
      if (newWidth === 220) {
        setClicked(true);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchend", handleMouseUp);
  };

  const createPlaylist = async (
    userId,
    playlistName,
    isPublic,
    description
  ) => {
    const accessToken = Cookies.get("access_token");
    const playlistData = {
      id: userId,
      name: playlistName,
      description: description || "",
      public: isPublic || false,
    };

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playlistData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create playlist");
      }

      const data = await response.json();
      console.log("Playlist created:", data);

      // Add the new playlist to the state
      setPlaylists((prevPlaylists) => [...prevPlaylists, data]);

      return data;
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handleOpenModal = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlaylist(null);
  };
  const handleRenamePlaylist = (playlistId, newName) => {
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.id === playlistId ? { ...playlist, name: newName } : playlist
    );
    setPlaylists(updatedPlaylists);
    renamePlaylist(playlistId, newName);
  };

  //Backend Part (Spotify API Request)
  const renamePlaylist = async (playlistId, newName) => {
    const accessToken = Cookies.get("access_token");
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
          }),
        }
      );

      const data = await response.json();
      console.log("Playlist renamed:", data);

      if (!data || !data.name) {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Error renaming playlist:", error);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      console.error("No access token found!");
      return;
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete playlist");
      }
      setPlaylists((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== playlistId)
      );

      console.log(`Playlist with ID ${playlistId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className="hidden lg:block bg-[#121212] h-full rounded-lg text-white mx-2"
      style={{ width: `${width}px`, position: "relative" }}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="w-8" src={assets.stack_icon} alt="Stack-Icon" />
          <p className="font-semibold">Your Library</p>
        </div>
        <div className="flex items-center gap-3">
          <img
            className="w-5 cursor-pointer"
            src={assets.plus_icon}
            alt="Plus Icon"
            onClick={() =>
              createPlaylist(
                userId,
                "My New Playlist",
                true,
                "This is a test playlist"
              )
            }
          />
          <img
            className="w-6"
            src={clicked ? assets.arrow_icon : assets.arrow_icon_r}
            onClick={() => {
              if (width === 500) {
                setWidth(300);
                setClicked(true);
              } else {
                setWidth(500);
                setClicked(false);
              }
            }}
            alt="Arrow Icon"
          />
        </div>
      </div>

      <div className="mt-6 px-4">
        <h2 className="text-base md:text-lg font-semibold mb-4">
          Your Playlists
        </h2>

        <ul className="space-y-2">
          {playlists.length > 0 ? (
            playlists.map((playlist, index) => {
              if (!playlist || !playlist.name) return null; // skip undefined playlists
              return (
                <li
                  key={playlist.id || index}
                  className="text-sm my-2 font-medium cursor-pointer hover:text-gray-400 flex items-center"
                  onClick={() => onPlaylistClick(playlist)}
                >
                  <img
                    className="inline w-10 mr-5"
                    src={
                      playlist?.images && playlist.images.length > 0
                        ? playlist.images[0]?.url
                        : "https://via.placeholder.com/150"
                    }
                    alt={playlist?.name || "Playlist Image"}
                  />
                  <div className="">
                    <Link
                      key={playlist.id}
                      to={`/main/playlist`}
                      className="hover:text-green-600"
                    >
                      <p className="text-base font-light hover:text-green-500">
                        {playlist.name}
                      </p>
                    </Link>
                    <p className="font-light text-neutral-400">
                      Playlist <b className="text-md">•</b>{" "}
                      {playlist.owner?.display_name || "Unknown"}
                    </p>
                  </div>
                  <div className="m-auto flex flex-col">
                    <button
                      onClick={() => handleOpenModal(playlist)}
                      className="text-green-500"
                    >
                      Rename
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePlaylist(playlist.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <div>No playlists available</div>
          )}
        </ul>
        <RenamePlaylist
          isOpen={isModalOpen}
          playlist={selectedPlaylist}
          onClose={handleCloseModal}
          onRename={handleRenamePlaylist}
        />
      </div>

      {/* Resizable Handle */}
      <div
        ref={dragRef}
        className="absolute top-0 right-0 w-2 bg-gray-600 cursor-ew-resize h-full"
        onMouseDown={handleMouseDown}
        style={{ cursor: "ew-resize" }}
      />
    </div>
  );
};

export default Sidebar;
