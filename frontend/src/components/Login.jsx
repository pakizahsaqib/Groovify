import React from "react";
import { assets } from "../assets/frontend-assets/assets";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-neutral-800 to-black">
      <div className="w-full max-w-2xl m-8 py-8 px-10 bg-gradient-to-b from-neutral-950 to-neutral-900 rounded-lg shadow-md text-white">
        <div className="max-w-sm m-auto p-4">
          <div className="flex justify-center mb-6">
            <img src={assets.spotify_w} alt="Spotify Logo" className="w-10" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-6">
            Log in to Groovify
          </h2>

          {/* <div className="space-y-3">
            <button className="w-full flex items-center relative p-3 bg-transparent rounded-full border border-gray-400 hover:border-white">
              <img
                className="w-5 absolute left-8"
                src={assets.google}
                alt="Google"
              />

              <span className="mx-auto font-semibold">
                Continue with Google
              </span>
            </button>

            <button className="w-full flex items-center relative p-3 bg-transparent rounded-full border border-gray-400 hover:border-white">
              <img
                className="w-5 absolute left-8"
                src={assets.facebook}
                alt="Facebook"
              />
              <span className="mx-auto font-semibold">
                Continue with Facebook
              </span>
            </button>

            <button className="w-full flex items-center relative p-3 bg-transparent rounded-full border border-gray-400 hover:border-white">
              <img
                className="w-5 absolute left-8"
                src={assets.apple}
                alt="Apple"
              />
              <span className="mx-auto font-semibold">Continue with Apple</span>
            </button>
          </div> */}

          <button
            onClick={() =>
              (window.location.href = "http://localhost:3000/auth/login")
            }
            className="w-full flex items-center relative p-3 bg-transparent rounded-full border border-gray-400 hover:border-white"
          >
            <img
              className="w-6 absolute left-8"
              src={assets.spotify_logo}
              alt="Spotify"
            />
            <span className="mx-auto font-semibold">Login with Spotify</span>
          </button>

          <hr className="mt-8 mb-6 border-neutral-700" />

          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold" htmlFor="email">
              Email or username
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email or username"
              className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-md outline-none focus:border-white"
            />

            <label
              className="block my-4 text-sm font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full p-3 bg-transparent border border-gray-400 text-white rounded-md outline-none focus:border-white"
              />
              <img
                className="cursor-pointer absolute right-3 top-3 w-6"
                src={assets.pw_view}
              />
            </div>
          </div>

          <button className="w-full p-3 bg-green-500 text-black font-semibold rounded-full hover:bg-green-600 transition cursor-pointer">
            Log In
          </button>

          <div className="text-center mt-6">
            <a
              to="/forgot-password"
              className="text-sm font-semibold text-white hover:text-green-400 cursor-pointer"
            >
              Forgot your password?
            </a>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a
              to="/signup"
              className="text-white font-semibold hover:text-green-400 cursor-pointer"
            >
              Sign up for Groovify.
            </a>
          </p>
        </div>
      </div>
      <div className="bg-neutral-900 w-full p-8 ">
        <p className="mt-2 text-center text-xs text-white cursor-pointer">
          This site is protected by reCAPTCHA and the Google
          <a href="#" className="mx-1 hover:underline">
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

export default Login;
