import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import WeatherComponent from "../../components/WeatherComponent";
// import bg from "../../imgs/background.jpg";
import logo from "../../imgs/logo.png";
import ProfileCard from "../../components/ProfileCard";
import NewsCard from "../../components/NewsCard";
import ArticleList from "../../components/ArticleList";
import { useNavigate } from "react-router-dom";

const NewsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add your token verification logic here
    const token = getTokenFromCookie();
    if (!verifyToken(token)) {
      // If the token is not verified, redirect to the login page
      navigate("/login");
    }
  }, [navigate]);

  const verifyToken = (token) => {
    // Implement your token verification logic here
    // Return true if the token is verified, false otherwise
    // You can use a library like jsonwebtoken for token verification

    // Example verification logic (replace with your actual logic)
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith("token=")) {
        return cookie.substring("token=".length, cookie.length);
      }
    }

    return null;
  };

  return (
    <div className="bg-news-bg bg-repeat ">
      <Navbar />
      <div className=" bg-white min-h-screen mx-72">
        <div class="grid grid-cols-3 gap-2 p-4">
          <div class="flex items-center justify-center">
            <img
              class="h-auto max-w-full rounded-lg items-center justify-center"
              src={logo}
              alt=""
            />
          </div>
          <div>
            <WeatherComponent />
          </div>
          <div>
            {/* <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
              alt=""
            /> */}
            <ProfileCard />
          </div>
          <div className="col-span-2 h-11/12 flex row-span-1">
            {/* <img
              class="h-11/12 max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
              alt=""
            /> */}
            <NewsCard />
          </div>
          <div className="">
            <img
              class="h-auto max-w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="p-6 mt-10">
          <ArticleList />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
