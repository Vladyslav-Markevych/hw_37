import { WEATHER_API_DOMAIN } from "./constants.js";
import { fillDetails } from "./showElements.js";

function getWeatherDetails(weatherUrl) {
  fetch(weatherUrl)
    .then((data) => data.json())
    .then(fillDetails)
    .catch((error) => {
      console.log(error);
      console.error(error.message);
      alert("something went wrong, please return to us in few minutes");
    });
}

function handleSubmit(event) {
  event.preventDefault();
  const city = document.getElementById("city").value.trim();
  if (city?.length >= 1) {
    getWeatherDetails(`${WEATHER_API_DOMAIN}&q=${city}`);
  }
}

function weatherApp() {
  const form = document.getElementById("city-form");
  form.addEventListener("submit", handleSubmit);
}

weatherApp();
