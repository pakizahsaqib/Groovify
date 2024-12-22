import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { assets } from "../assets/frontend-assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ username, setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Function to handle the API call
  const handleSearch = async (query) => {
    try {
      const token = Cookies.get("access_token");
      const response = await axios.get("http://localhost:3000/search", {
        params: { query, type: "artist" },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSearchResults(response.data.artists?.items || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Trigger search when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      handleSearch(debouncedQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery]);

  return (
    <div className="w-full flex justify-between items-center font-semibold bg-black px-6 py-3">
      <img className="w-8" src={assets.spotify_w} />
      <div className="flex items-center gap-2 absolute left-1/2  transform -translate-x-1/2">
        <div className="bg-neutral-800 p-3 rounded-full hover:scale-105 cursor-pointer">
          <Link to="/main" onClick={() => searchQuery("")}>
            <img className="w-6" src={assets.home_icon} />
          </Link>
        </div>
        <div className="w-[100%] flex items-center justify-between bg-neutral-800 px-6 py-0.5 rounded-full gap-24">
          <div className="flex items-center gap-2">
            <img className="w-5" src={assets.search_icon} />
            <input
              type="text"
              placeholder="What do you want to play?"
              className="w-60 p-2 text-base text-white font-light bg-transparent focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-white h-4 w-[1px]"></div>
            <img className="w-5 cursor-pointer" src={assets.browse} />
          </div>
        </div>
      </div>
      {/* <div className="flex items-center gap-2">
        <img
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          src={assets.arrow_left}
        />
        <img
          className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
          src={assets.arrow_right}
        />
      </div> */}
      <div className="flex items-center gap-4">
        <Link to="/main/premium">
          <button className="rounded-full bg-white text-black text-sm cursor-pointer px-4 py-1.5 hidden md:block">
            Explore Premium
          </button>
        </Link>
        <div className="flex items-center gap-1 text-white text-sm cursor-pointer px-4 py-1">
          <img className="w-4" src={assets.download} />
          <Link to="/main/installApp">
            <p>Install App</p>
          </Link>
        </div>
        <img className="w-8 p-2 cursor-pointer" src={assets.bell_icon} />
        <div className="bg-neutral-800 p-2 rounded-full hover:scale-105 cursor-pointer">
          <p className="bg-orange-500 text-md text-black w-7 h-7 rounded-full flex items-center justify-center ">
            {username.charAt(0).toUpperCase() + username.slice(1, 1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
