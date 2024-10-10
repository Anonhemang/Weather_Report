import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import PartlyCloudyImg from "../img/PartlyCloudy.gif";
import eg from "../img/eg.jpg";
import sunny from "../img/sunny.webp";
export default function Index() {
  //------------------------------------------
  const [city, setCity] = useState(null);
  const [weather, SetWeather] = useState(null);

  // Search City Function
  const searchCity = async (city) => {
    if (city) {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=c1fd5e6c48ef408b85e123112240810&q=${city}&aqi=no`
        );
        console.log(response.data);
        setCity(response.data.location.name); // Update city name from response
        SetWeather(response.data); // Set weather data
      } catch (error) {
        console.error("Error fetching city weather:", error);
      }
    }
  };

  // Get User's Current Location Function
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getData(lat, lon);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Fetch weather data by latitude and longitude
  const getData = async (lat, lon) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=c1fd5e6c48ef408b85e123112240810&q=${lat},${lon}&aqi=no`
      );
      console.log(response.data);
      SetWeather(response.data);
    } catch (error) {
      console.error("Error fetching location weather:", error);
    }
  };

  // Condition Background Image
  const setBackground = (condition) => {
    const body = document.body;

    if (condition.includes("Rain")) {
      body.style.backgroundImage = `url(${PartlyCloudyImg}`;
    } else if (condition.includes("Partly Cloudy")) {
      body.style.backgroundImage = `url(${PartlyCloudyImg}`;
    } else if (condition.includes("Sunny") || condition.includes("Clear")) {
      body.style.backgroundImage = `url(${sunny}`;
    } else if (condition.includes("Snow")) {
      body.style.backgroundImage = `url(${PartlyCloudyImg}`;
    } else {
      body.style.backgroundImage = `url(${eg}`;
      body.style.backgroundColor = "";
    }

    body.style.backgroundSize = "cover"; // Ensure the background covers the screen
  };

  // Update background based on weather condition
  useEffect(() => {
    if (weather && weather.current) {
      setBackground(weather.current.condition.text);
    }
  }, [weather]);

  // Get location on initial load
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div>
      {/* Pass searchCity function to Navbar */}
      <Navbar
        degc={weather ? weather.current.temp_c : null}
        degf={
          weather ? ((weather.current.temp_c * 9) / 5 + 32).toFixed(1) : null
        }
        onSearch={searchCity}
      />

      {city ? (
        <div className="infobox">
          <h3>
            <i className="bi bi-geo-alt-fill"></i> {weather.location.name}
          </h3>
          <hr />
          <h3>
            <i className="bi bi-cloud-sun-fill"></i>{" "}
            {weather.current.condition.text}
          </h3>
          <h3>
            <i className="bi bi-droplet-half"></i> {weather.current.humidity}%
          </h3>
          <h3>
            <i className="bi bi-tornado"></i> {weather.current.wind_kph} kph
          </h3>
        </div>
      ) : weather ? (
        weather.location ? (
          <div className="infobox">
            <h3>
              <i class="bi bi-geo-alt-fill"></i> {weather.location.name}
            </h3>
            <hr />
            <h3>
              <i class="bi bi-cloud-sun-fill"></i>{" "}
              {weather.current.condition.text}
            </h3>
            <h3>
              <i class="bi bi-droplet-half"></i> {weather.current.humidity}
            </h3>
            <h3>
              <i class="bi bi-tornado"></i> {weather.current.wind_kph}
            </h3>
            
          </div>
        ) : (
          <div>Fetching Data.......</div>
        )
      ) : (
        <div className="d-flex">
          <h1>No Data Found For Your Location</h1>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}
