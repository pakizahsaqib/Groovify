import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";

const Sidebar = ({ playlists, onPlaylistClick }) => {
  const [width, setWidth] = useState(240); // Initial width (in pixels)
  const [clicked, setClicked] = useState(true);
  const sidebarRef = useRef(null);
  const dragRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();

    // Capture initial positions and width
    const startX = e.clientX || e.touches[0]?.clientX; // Handle both mouse and touch events
    const startWidth = sidebarRef.current.offsetWidth;

    // Update the sidebar width based on mouse movement
    const handleMouseMove = (moveEvent) => {
      const clientX = moveEvent.clientX || moveEvent.touches[0]?.clientX; // Handle both mouse and touch events
      const delta = clientX - startX;
      const newWidth = Math.min(Math.max(startWidth + delta, 220), 500); // Constrain width between 150px and 400px
      setWidth(newWidth);
      if (newWidth === 500) {
        setClicked(false);
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

  return (
    <div
      ref={sidebarRef}
      className="bg-[#121212] h-full rounded-lg text-white mx-2"
      style={{ width: `${width}px`, position: "relative" }} // Ensure relative positioning
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="w-8" src={assets.stack_icon} alt="Stack-Icon" />
          <p className="font-semibold">Your Library</p>
        </div>
        <div className="flex items-center gap-3">
          <img className="w-5" src={assets.plus_icon} alt="Plus Icon" />
          <img
            className="w-6"
            src={clicked ? assets.arrow_icon : assets.arrow_icon_r}
            onClick={() => {
              if (width === 500) {
                setWidth(320); // Set width to 320px if it was 500px
                setClicked(true); // Toggle clicked state
              } else {
                setWidth(500); // Set width to 500px when clicked again
                setClicked(false); // Reset clicked state
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
            playlists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/main/playlist`}
                className="hover:text-green-600"
              >
                <li
                  className="text-sm my-2 font-medium cursor-pointer hover:text-gray-400 flex items-center"
                  onClick={() => onPlaylistClick(playlist)}
                >
                  <img
                    className="inline w-10 mr-5"
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                  />
                  <div>
                    <p className="text-base font-light hover:text-green-500">
                      {playlist.name}
                    </p>

                    <p className="font-light text-neutral-400">
                      Playlist <b className="text-md">•</b>{" "}
                      {playlist.owner.display_name}
                    </p>
                  </div>
                </li>
              </Link>
            ))
          ) : (
            <>
              <div className="p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                <h1>Create Your First Playlist</h1>
                <p className="font-light text-sm">
                  It's easy, we will help you
                </p>
                <button className="px-4 py-1.5 bg-white text-sm text-black rounded-full mt-4">
                  Create Playlist
                </button>
              </div>

              <div className="p-4 bg-[#242424] m-2 rounded-lg font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-6">
                <h1>Let's find some podcasts to follow</h1>
                <p className="font-light text-sm">
                  We will keep you updated on new episodes
                </p>
                <button className="px-4 py-1.5 bg-white text-sm text-black rounded-full mt-4">
                  Browse Podcasts
                </button>
              </div>
            </>
          )}
        </ul>
      </div>

      {/* Resizable Handle */}
      <div
        ref={dragRef}
        className="absolute top-0 right-0 w-2 bg-gray-600 cursor-ew-resize h-full"
        onMouseDown={handleMouseDown}
        style={{ cursor: "ew-resize" }} // Optional: Add custom cursor style
      />
    </div>
  );
};

export default Sidebar;
