import { Link } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
const Sidebar = ({ playlists, onPlaylistClick }) => {
  console.log("Sidebar received playlists:", playlists);
  return (
    <div className="w-[25%] h-full px-2 flex-col gap-2 text-white lg:flex">
      <div className="bg-[#121212] h-[85%] rounded-lg">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="Stack-Icon" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="Arrow Icon" />
            <img className="w-5" src={assets.plus_icon} alt="Plus Icon" />
          </div>
        </div>

        <div className="mt-6 px-4">
          <h2 className="text-lg font-semibold mb-4">Your Playlists</h2>

          <ul className="space-y-2">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <Link
                  key={playlist.id}
                  to={`/main/playlist`}
                  className="hover:text-green-600"
                >
                  <li
                    key={playlist.id}
                    className="text-sm my-2 font-medium cursor-pointer hover:text-gray-400 flex items-center "
                    onClick={() => onPlaylistClick(playlist)}
                  >
                    <img
                      className="inline w-10 mr-5"
                      src={playlist.images[0]?.url}
                    />
                    <div>
                      <p className="text-base font-light hover:text-green-500">
                        {" "}
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
      </div>
    </div>
  );
};

export default Sidebar;
