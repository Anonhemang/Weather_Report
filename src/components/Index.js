import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import PartlyCloudyImg from "../img/PartlyCloudy.gif";
export default function Index() {
  const [weather, SetWeather] = useState(null);
  const getData = async (lat, lon) => {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=c1fd5e6c48ef408b85e123112240810&q=${lat},${lon}&aqi=no`
    );
    console.log(response.data);
    SetWeather(response.data);
  };

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

  // Condition Background Image
  const setBackground = (condition) => {
    const body = document.body;

    if (condition.includes("Rain")) {
      body.style.backgroundImage = `url(${PartlyCloudyImg}`;
    } else if (condition.includes("Partly Cloudy")) {
      body.style.backgroundImage = `url(${PartlyCloudyImg}`;
    } else if (condition.includes("Sunny") || condition.includes("Clear")) {
      body.style.backgroundImage = `url(${PartlyCloudyImg}`;
    } else if (condition.includes("Snow")) {
      body.style.backgroundImage = `url(${PartlyCloudyImg}`;
    } else {
      body.style.backgroundImage = `url(${PartlyCloudyImg}`; // default background
      body.style.backgroundColor = "#111000"; // or any default color
    }

    body.style.backgroundSize = "cover"; // Ensure the background covers the screen
  };
  // -------------------------------- End
  useEffect(() => {
    if (weather && weather.current) {
      setBackground(weather.current.condition.text);
    }
  }, [weather]);
  useEffect(() => {
    getLocation();
  }, []);
  return (
    <div>
      <Navbar
        degc={weather ? weather.current.temp_c : null}
        degf={
          weather ? ((weather.current.temp_c * 9) / 5 + 32).toFixed(1) : null
        }
      />
      {weather ? (
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
        <h1>No Data Found For Your Location</h1>
      )}
    </div>
  );
}
