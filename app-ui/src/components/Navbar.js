import React, { useState } from "react";
import icon from "../imgs/profile.png";
import { Link } from "react-router-dom";
import NotificationIcon from "./NotificationIcon";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searcharticles, setSearchArticles] = useState([]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search/articles?tags=${searchQuery}`
      );
      const data = await response.json();
      setSearchArticles(data);
      // console.log(data);
      openSearch();
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  const handleLogout = () => {
    // Clear the browser's cookies or perform any logout logic here
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Additional logout logic...
  };
  return (
    <div>
      <nav className="flex flex-col md:flex-row items-center justify-between p-4 bg-white text-accent_primary">
        <div className="flex items-center">
          <div className="font-bold text-2xl ml-8 hover:text-accent_secondary cursor-pointer">
            Lahore-Link
          </div>
        </div>
        <div className="relative ml-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
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
            onClick={fetchArticles}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        {isSearchOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
                onClick={closeSearch}
              ></div>
              <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-gray-100 px-4 py-3 border-b">
                  <h2 className="text-lg font-semibold">
                    Search Results ({searcharticles.slice(0, 5).length})
                  </h2>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {searcharticles.slice(0, 5).map((article) => (
                      <li key={article._id} className="border-b py-2">
                        <h3 className=" font-black text-xl">{article.title}</h3>
                        {/* <p className="text-gray-600 ">{notification.message}</p> */}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-100 px-4 py-3 border-t flex justify-end">
                  <button
                    className="text-sm text-gray-500"
                    onClick={closeSearch}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center">
          <span className="">
            <NotificationIcon />
          </span>
          <Link to="/profile" className="py-2 px-4 mx-4">
            <img src={icon} alt="Profile" className="h-8 w-8 rounded-full" />
          </Link>
          <button
            className="px-4 p-1.5 mr-4 bg-gray-100 rounded text-accent_primary font-bold"
            onClick={handleLogout}
          >
            <Link to="/login">Logout</Link>
          </button>
        </div>
      </nav>
      <nav className="flex justify-center  bg-gray-200 text-accent_primary text-xl font-semibold py-4">
        <Link to="/news" className="px-4 mx-4 hover:text-accent_secondary">
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
