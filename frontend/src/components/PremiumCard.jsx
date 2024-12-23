import React from "react";

const PremiumCard = ({ name, bg_color, btn_color, price, desc }) => {
  return (
    <div className="bg-neutral-900 text-white max-w-sm p-6 rounded-xl shadow-md">
      <div
        className="text-black text-xs font-bold px-2 py-1 rounded w-fit mb-4"
        style={{ backgroundColor: bg_color }}
      >
        Free for 1 month
      </div>

      <div className="flex items-center space-x-2 mb-2">
        <span className="text-sm font-bold">🎵 Premium</span>
      </div>
      <h2 style={{ color: bg_color }} className="text-3xl font-boldmb-2">
        {name}
      </h2>

      <p className="text-lg font-bold mb-1">Free for 1 month</p>
      <p className="text-gray-400 mb-4">PKR {price}/ month after</p>

      <hr className="my-4 bg-neutral-700 border-0 h-px" />

      <ul className="list-disc list-inside space-y-2 text-sm">
        <li>1 verified Premium account</li>
        <li>Discount for eligible students</li>
        <li>Cancel anytime</li>
        <li>Subscribe or one-time payment</li>
      </ul>

      <button
        className="mt-6 text-black font-bold py-2 px-4 rounded-full w-full"
        style={{ backgroundColor: btn_color }}
      >
        Try free for 1 month
      </button>

      <p className="text-gray-400 text-xs mt-4">
        {desc}{" "}
        <a href="#" className="underline">
          Terms apply.
        </a>
      </p>
    </div>
  );
};

export default PremiumCard;
