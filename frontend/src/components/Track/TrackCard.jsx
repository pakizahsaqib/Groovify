import React from "react";
import { useOutletContext } from "react-router-dom";

const TrackCard = ({ name, image, desc, id, uri }) => {
  const { handleTrackSelect } = useOutletContext();
  return (
    <div
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26"
      onClick={() => handleTrackSelect(uri)}
    >
      <img className="rounded" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default TrackCard;
