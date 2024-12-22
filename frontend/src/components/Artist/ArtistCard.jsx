import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = ({ name, image, id }) => {
  return (
    <Link to={`/main/artists/${id}`}>
      <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img
          className="rounded-full w-[150px] h-[150px]"
          src={image}
          alt={name}
        />
        <p className="font-bold mt-2 mb-1 text-center">{name}</p>
      </div>
    </Link>
  );
};

export default ArtistCard;
