import API_KEY from "./config.js";

const form = document.querySelector("form");
const input = document.querySelector("input");
const title = document.querySelector(".weatherDetails");
const temp = document.querySelector(".temp");
const feelsLike = document.querySelector(".feelsLike");
const img = document.querySelector("img");

const imageMap = {
  hot: "./images/sunHot.png",
  warm: "./images/sunWarm.png",
  cold: "./images/sunRain.png",
};
async function getWeather(event) {
  event.preventDefault();
  try {
    const location = input.value;
    const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`;

    const response = await fetch(API_URL, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      `Temperature in F: ${data.current.temp_f}, Feels like: ${data.current.feelslike_f}, Location: ${data.location.name}, ${data.location.region}`
    );

    title.textContent = `${data.location.name}, ${data.location.region}`;
    temp.textContent = `Temperature in F: ${data.current.temp_f}`;
    feelsLike.textContent = `Feels like: ${data.current.feelslike_f}`;
    const feelsLikeTemp = data.current.feelslike_f;
    updateImage(feelsLikeTemp);
  } catch (err) {
    console.log(`error fetching data`, err);
  }
}

function updateImage(feelsLikeTemp) {
  let key;
  if (feelsLikeTemp >= 65) {
    key = "hot";
  } else if (feelsLikeTemp >= 45) {
    key = "warm";
  } else {
    key = "cold";
  }

  if (imageMap[key]) {
    img.src = imageMap[key];
  }
}

form.addEventListener("submit", getWeather);
