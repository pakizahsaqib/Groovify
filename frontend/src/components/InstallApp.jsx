import React from "react";
import { assets } from "../assets/frontend-assets/assets";
const InstallApp = () => {
  return (
    <div className="bg-gradient-to-b from-[#8df7cb]  to-[#fca7f1] flex justify-center items-center max-h-[800px]">
      <div className="  max-w-7xl w-full m-12 p-12 md:flex md:items-center md:justify-between bg-gradient-to-b from-[#f4a9ea] to-[#8df7cb] rounded shadow-lg">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <div className="flex gap-2 items-center mb-8">
            <img className="w-9" src={assets.spotify_logo} />
            <p className="text-black font-spotify text-xl font-bold">
              Groovify
            </p>
          </div>
          <h1 className="text-lg md:text-3xl font-bold text-gray-900 mb-4">
            Download Groovify for Mac
          </h1>
          <p className="text-sm md:text-lg text-gray-800 mb-8">
            Enjoy high-quality audio, offline playback, and a lively friend feed
            to stay in tune with your friends’ favourites.
          </p>
          <button className="text-sm md:text-base lg:text-lg bg-white text-gray-900 px-8 py-3 rounded-full font-medium shadow-md hover:bg-gray-100">
            Download the free app
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.mock_img}
            alt="Groovify Mac App Mockup"
            className="rounded-xl max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default InstallApp;
