import React from "react";
import PremiumCard from "./PremiumCard";

const ExplorePremium = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-600 to-indigo-800 text-white text-center py-16 px-6">
        <h1 className="text-4xl font-bold mb-4">
          Ends soon: Rs 0.00 for 3 months of Premium
        </h1>
        <p className="mb-6 text-lg">
          Don't miss ad-free music listening, offline playback, and more. Cancel
          anytime.
        </p>
        <div className="flex justify-center space-x-4 mb-6">
          <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-gray-200">
            Get started
          </button>
          <button className="border border-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-purple-600">
            View all plans
          </button>
        </div>
        <p className="text-sm">
          Premium Individual only. Free for 3 months, then PKR 349 per month
          after. Offer only available if you haven't tried Premium before.{" "}
          <a href="#" className="underline">
            Terms apply
          </a>
          .
        </p>
        <p className="text-sm mt-2">Offer ends December 31, 2024.</p>
      </div>

      {/* Affordable Plans Section */}
      <div className=" text-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Affordable plans for any situation
        </h2>
        <p className="text-center text-lg mb-6">
          Choose a Premium plan and listen to ad-free music without limits on
          your phone, speaker, and other devices. Pay in various ways. Cancel
          anytime.
        </p>
        <div className="flex justify-center items-center space-x-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="Visa"
            className="w-9 h-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="MasterCard"
            className="w-9 h-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Amex_logo.svg"
            alt="American Express"
            className="w-9 h-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/cf/JCB_logo.svg"
            alt="JCB"
            className="w-9 h-auto"
          />
          <span className="text-lg font-medium">+ 6 more</span>
        </div>
      </div>
      <div className="flex justify-between gap-4 p-4">
        <PremiumCard />
        <PremiumCard />
        <PremiumCard />
      </div>
    </div>
  );
};

export default ExplorePremium;
