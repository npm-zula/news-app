import React from "react";
import icon from "../imgs/profile.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex flex-col md:flex-row items-center justify-between p-4 my-2 bg-white text-accent_primary">
        <div className="flex items-center">
          {/* <img src={logo} alt="Logo" className="w-full h-20 mr-2" /> */}
          <div className="font-bold text-2xl ml-8 hover:text-accent_secondary cursor-pointer">
            Lahore-Link
          </div>
        </div>
        <div className="relative ml-4">
          <input
            type="text"
            placeholder="Search"
            className="py-2 pl-10 pr-4 w-[420px] bg-gray-100 text-black rounded-full placeholder-gray-400 focus:outline-none"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-2 text-gray-400 w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div className="flex">
          <Link to="/profile" className="py-2 px-4 mx-4">
            <img src={icon} alt="Profile" className="h-8 w-8 rounded-full" />
          </Link>
          <button className="px-4 mr-4 bg-gray-100 rounded text-accent_primary font-bold">
            Logout
          </button>
        </div>
      </nav>
      <nav className="flex justify-center  bg-gray-200 text-accent_primary text-xl font-semibold py-4">
        <Link to="/" className="px-4 mx-4 hover:text-accent_secondary">
          Home
        </Link>
        <Link to="/about" className="px-4 mx-4 hover:text-accent_secondary">
          Blog
        </Link>
        <Link to="/services" className="px-4 mx-4 hover:text-accent_secondary">
          Forums
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
