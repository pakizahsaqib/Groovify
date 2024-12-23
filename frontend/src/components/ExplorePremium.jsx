import React from "react";
import PremiumCard from "./PremiumCard";

import { assets } from "../assets/frontend-assets/assets";

const ExplorePremium = () => {
  const data = [
    {
      id: 1,
      name: "Student",
      btn_color: "#c084fc",
      bg_color: "#e9d5ff",
      price: "175",
      desc: "Free for 1 month, then PKR 175 per month after. Offer available only to students at an accredited higher education institution and if you haven't tried Premium before.",
    },
    {
      id: 2,
      name: "Individual",
      btn_color: "#ff9002",
      bg_color: "#ffc478",
      price: "400",
      desc: "Free for 3 month, then PKR 400 per month after.Cancel anytime.15 hours/month of listening time from our audiobooks subscriber catalog.",
    },
    {
      id: 3,
      name: "Duo",
      btn_color: "#00a6ff",
      bg_color: "#80cffa",
      price: "800",
      desc: "Free for 1 month, then PKR 800 per month after. 2 Premium accounts.Cancel anytime. 15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)",
    },
    {
      id: 4,
      name: "Family",
      btn_color: "#ff2672",
      bg_color: "#fd81ac",
      price: "2000",
      desc: "Up to 6 Premium or Kids accounts. Control content marked as explicit. Access to Spotify Kids.Cancel anytime. 15 hours/month of listening time from our audiobooks subscriber catalog (plan manager only)",
    },
  ];
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
          <button className="border border-white  px-6 py-3 rounded-full font-medium hover:bg-gray-200  hover:text-purple-600">
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

      <div className=" text-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Affordable plans for any situation
        </h2>
        <p className="text-center text-lg mb-6">
          Choose a Premium plan and listen to ad-free music without limits on
          your phone, speaker, and other devices. Pay in various ways. Cancel
          anytime.
        </p>
        <div className="flex justify-center items-center space-x-6 cursor-pointer">
          <img
            src={assets.visa}
            alt="Visa"
            className="bg-neutral-100 px-3 py-1 w-12 h-auto"
          />
          <img
            src={assets.master}
            alt="MasterCard"
            className="bg-neutral-100  px-3 py-1 w-12 h-auto"
          />
          <img
            src={assets.union_pay}
            alt="UnionPay"
            className="bg-neutral-100 px-3 py-1 w-12 h-auto"
          />
          <img
            src={assets.jcb}
            alt="JCB"
            className="bg-neutral-100 px-3 py-1 w-12 h-auto"
          />
          <span className="text-base font-normal">+ 6 more</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-between gap-4 p-4">
        {data.map((item) => {
          return (
            <PremiumCard
              key={item.id}
              name={item.name}
              price={item.price}
              desc={item.desc}
              bg_color={item.bg_color}
              btn_color={item.btn_color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExplorePremium;
