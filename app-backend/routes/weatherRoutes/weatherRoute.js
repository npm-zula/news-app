const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/weather/:latitude/:longitude", async (req, res) => {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${req.params.latitude}&longitude=${req.params.longitude}&hourly=temperature_2m`;

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;

    // Process and manipulate weatherData as per your requirements

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve weather data" });
  }
});

module.exports = router;
