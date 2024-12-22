import React from "react";
import { Link } from "react-router-dom";

const AlbumCard = ({ image, name, desc, id }) => {
  return (
    <Link to={`/main/album/${id}`}>
      <div className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="rounded" src={image} alt="" />
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm">{desc}</p>
      </div>
    </Link>
  );
};

export default AlbumCard;
