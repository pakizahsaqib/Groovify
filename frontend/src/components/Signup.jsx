import React from "react";
import { assets } from "../assets/frontend-assets/assets";

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm p-8 bg-black text-white">
        <div className="flex justify-center mb-6">
          <img src={assets.spotify_w} alt="Groovify Logo" className="w-10" />
        </div>

        <h2 className="text-[44px] font-spotify font-bold text-center mt-6 ">
          Sign up to start listening
        </h2>

        <div className="mb-4 mt-10">
          <label className="block mb-2 text-sm font-semibold" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@domain.com"
            className="w-full p-3 bg-transparent border border-gray-400 hover:border-white text-white rounded-md outline-none"
          />
        </div>

        <button className="w-full p-3 bg-green-500 text-black font-semibold rounded-full hover:bg-green-600">
          Next
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-t border-gray-700" />
          <span className="px-4 text-sm">or</span>
          <hr className="flex-1 border-t border-gray-700" />
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center p-3 bg-transparent rounded-full border border-gray-400 hover:border-white">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google"
              className="h-5 mr-3"
            />
            Sign up with Google
          </button>

          <button className="w-full flex items-center justify-center p-3 bg-transparent rounded-full border border-gray-400 hover:border-white">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
              alt="Facebook"
              className="h-5 mr-3"
            />
            Sign up with Facebook
          </button>

          <button className="w-full flex items-center justify-center p-3 bg-transparent rounded-full border border-gray-400 hover:border-white cursor-pointer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
              className="h-5 mr-3"
            />
            Sign up with Apple
          </button>
        </div>
        <hr className="my-6 flex-1 border border-gray-700" />
        <p className="my-6 text-center text-sm">
          Already have an account?
          <a
            href="/login"
            className="text-white hover:text-green-500 hover:underline cursor-pointer"
          >
            Log in here.
          </a>
        </p>

        <p className="mt-2 text-center text-xs text-gray-500">
          This site is protected by reCAPTCHA and the Google
          <a href="#" className="mx-1 hover:underline cursor-pointer">
            Privacy Policy
          </a>
          and
          <a href="#" className="mx-1 hover:underline cursor-pointer">
            Terms of Service
          </a>
          apply.
        </p>
      </div>
    </div>
  );
};

export default Signup;
