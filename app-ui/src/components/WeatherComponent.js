import React from "react";
import { useState, useEffect } from "react";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentDate, setcurrentDate] = useState();

  useEffect(() => {
    // Fetch weather data from the API
    const fetchWeatherData = async () => {
      try {
        const today = new Date();
        const formattedDate = formatDate(today);
        setcurrentDate(formattedDate);
        const latitude = 33.72;
        const longitude = 73.04;

        const apiUrl = `http://localhost:5000/api/weather/${latitude}/${longitude}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        // Update the weather data state
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div class=" items-center justify-center ">
        <div class="flex flex-col rounded-3xl px-12 pb-4 w-full bg-blue-200">
          <div class="font-bold text-xl pt-4">Islamabad</div>
          <div class="text-sm text-gray-500">{currentDate}</div>
          {/* <div class="text-sm text-gray-500">Thursday 10 May 2020</div> */}
          <div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
            <svg
              class="w-32 h-32"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              ></path>
            </svg>
          </div>
          <div class="flex flex-row items-center justify-center mt-6">
            <div class="font-medium text-6xl"> {weatherData.currentTemp}°</div>
            <div class="flex flex-col items-center ml-6">
              <div>Cloudy</div>
              <div class="mt-1">
                <span class="text-sm">
                  <i class="far fa-long-arrow-up"></i>
                </span>
                <span class="text-sm font-light text-gray-500">
                  {weatherData.maxTemp}°C
                </span>
              </div>
              <div>
                <span class="text-sm">
                  <i class="far fa-long-arrow-down"></i>
                </span>
                <span class="text-sm font-light text-gray-500">
                  {weatherData.minTemp}°C
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between mt-6">
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Wind</div>
              <div class="text-sm text-gray-500">
                {weatherData.Windspeed}k/h
              </div>
            </div>
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Humidity</div>
              <div class="text-sm text-gray-500">{weatherData.Humidity}%</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Visibility</div>
              <div class="text-sm text-gray-500">{weatherData.Visibility}m</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherComponent;
