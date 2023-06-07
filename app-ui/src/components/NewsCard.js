import React, { useEffect, useState } from "react";
import picture from "../imgs/profile.png";

const NewsCard = (props) => {
  const [name, setName] = useState("Erling Aashir");
  const [title, setTitle] = useState("Can coffee make you a better developer?");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/articles/retrieveArticle",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle the user data
        setName(data[0].authorUserName);
        setTitle(data[0].title);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <div class="">
        <div class=" border-b pb-3 bg-white  p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <p class="text-xl text-gray-600 flex items-center mb-2">
              <svg
                class="fill-current text-gray-500 w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Featured Article
            </p>
            <div class="text-accent_primary font-black text-3xl mb-2">
              {title}
            </div>
            <p class="text-gray-700 text-normal">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil. Lorem ipsum dolor sit amet,
            </p>
          </div>
          <div class="flex items-center mt-10">
            <img
              class="w-12 h-12 rounded-full mr-4"
              src={picture}
              alt="Avatar of Jonathan Reinink"
            />
            <div class="text-xl">
              <p class="text-gray-900 leading-none">{name}</p>
              <p class="text-gray-600">Aug 18</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
