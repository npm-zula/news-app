const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:latitude/:longitude", async (req, res) => {
  // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${req.params.latitude}&longitude=${req.params.longitude}&hourly=temperature_2m`;
  // const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${req.params.latitude}&longitude=${req.params.longitude}&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=33.72&longitude=73.04&hourly=relativehumidity_2m,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&current_weather=true&forecast_days=1&timezone=auto`;

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    const maxTemp = weatherData.daily.temperature_2m_max[0];
    const minTemp = weatherData.daily.temperature_2m_min[0];
    const currentTemp = weatherData.current_weather.temperature;
    const Visibility = weatherData.hourly.visibility[0];
    const Humidity = weatherData.hourly.relativehumidity_2m[0];
    const WindSpeed = weatherData.current_weather.windspeed;

    res.json({
      maxTemp,
      minTemp,
      currentTemp,
      Visibility,
      Humidity,
      WindSpeed,
    });
    // Process and manipulate weatherData as per your requirements

    // res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve weather data" });
  }
});

module.exports = router;
