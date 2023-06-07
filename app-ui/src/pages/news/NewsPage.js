import React from "react";
import Navbar from "../../components/Navbar";
import WeatherComponent from "../../components/WeatherComponent";
// import bg from "../../imgs/background.jpg";
import logo from "../../imgs/logo.png";
import ProfileCard from "../../components/ProfileCard";
import NewsCard from "../../components/NewsCard";
import ArticleList from "../../components/ArticleList";

const NewsPage = () => {
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
