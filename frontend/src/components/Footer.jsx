import React from "react";

const Footer = () => {
  return (
    <footer className="text-neutral-400 text-sm mt-4 py-6">
      <div className="flex gap-6 ">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold text-base mb-2 text-white  ">
              Company
            </h3>
            <ul className="space-y-2">
              <li>About</li>
              <li>Jobs</li>
              <li>For the Record</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2 text-white ">
              Communities
            </h3>
            <ul className="space-y-2">
              <li>For Artists</li>
              <li>Developers</li>
              <li>Advertising</li>
              <li>Investors</li>
              <li>Vendors</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2 text-white ">
              Useful links
            </h3>
            <ul className="space-y-2">
              <li>Support</li>
              <li>Free Mobile App</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-base mb-2 text-white ">
              Groovify Plans
            </h3>
            <ul className="space-y-2">
              <li>Premium Individual</li>
              <li>Premium Duo</li>
              <li>Premium Family</li>
              <li>Premium Student</li>
              <li>Groovify Free</li>
            </ul>
          </div>
        </div>

        <div className="flex space-x-6 text-md text-white">
          <a
            href="#"
            className="rounded-full w-9 h-9 p-2  text-center bg-neutral-800"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="rounded-full w-9 h-9 p-2 text-center bg-neutral-800"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="rounded-full w-9 h-9 p-2 text-center bg-neutral-800"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>

      <hr className="my-6 bg-neutral-700 border-0 h-px" />

      <div className="flex justify-between items-center">
        <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-6 text-neutral-400 text-xs mt-4">
          <a href="#">Legal</a>
          <a href="#">Safety & Privacy Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies</a>
          <a href="#">About Ads</a>
          <a href="#">Accessibility</a>
        </div>

        <div className="text-center text-neutral-400 text-xs mt-4">
          &copy; 2024 Groovify AB
        </div>
      </div>
    </footer>
  );
};

export default Footer;
