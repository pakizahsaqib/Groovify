import React from "react";

const PremiumCard = () => {
  return (
    <div className="bg-neutral-900 text-white max-w-sm p-6 rounded-lg shadow-md">
      {/* Free for 1 Month Label */}
      <div className="bg-purple-200 text-black text-xs font-bold px-2 py-1 rounded w-fit mb-4">
        Free for 1 month
      </div>

      {/* Premium Logo and Title */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-sm font-bold">🎵 Premium</span>
      </div>
      <h2 className="text-3xl font-bold text-purple-200 mb-2">Student</h2>

      {/* Pricing */}
      <p className="text-lg font-bold mb-1">Free for 1 month</p>
      <p className="text-gray-400 mb-4">PKR 175 / month after</p>

      {/* Thin Horizontal Line */}
      <hr className="my-4 bg-neutral-700 border-0 h-px" />

      {/* Features */}
      <ul className="list-disc list-inside space-y-2 text-sm">
        <li>1 verified Premium account</li>
        <li>Discount for eligible students</li>
        <li>Cancel anytime</li>
        <li>Subscribe or one-time payment</li>
      </ul>

      {/* Button */}
      <button className="mt-6 bg-purple-400 text-black font-bold py-2 px-4 rounded-full w-full">
        Try free for 1 month
      </button>

      {/* Disclaimer */}
      <p className="text-gray-400 text-xs mt-4">
        Free for 1 month, then PKR 175 per month after. Offer available only to
        students at an accredited higher education institution and if you
        haven't tried Premium before.{" "}
        <a href="#" className="underline">
          Terms apply.
        </a>
      </p>
    </div>
  );
};

export default PremiumCard;
