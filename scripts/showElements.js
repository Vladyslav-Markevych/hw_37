function fillLocation(name, coord) {
  const { lon, lat } = coord;

  document.getElementById("city-name").textContent = name;
  document.getElementById("longitude").textContent = lon;
  document.getElementById("latitude").textContent = lat;
}

function fillTemperature(weather, main) {
  const { main: weatherTitle, description, icon } = weather[0];
  const { temp, feels_like } = main;

  document.getElementById(
    "weather-icon"
  ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById("weather-main").textContent = weatherTitle;
  document.getElementById("weather-description").textContent = description;
  document.getElementById("temp-current").textContent = temp;
  document.getElementById("temp-current-feelings").textContent = feels_like;
}

function fillWindAndHumidity(main, wind) {
  const { humidity } = main;
  const { speed } = wind;

  document.getElementById("wind-speed").textContent = speed;
  document.getElementById("humidity").textContent = humidity;
}

export function showDetails() {
  const info = document.querySelector(".weather-info");
  info.classList.remove("hidden");
}

export function fillDetails(response) {
  const {
    cod,
    message,
    name,
    coord,
    weather,
    main,
    wind,
    visibility,
    sys,
    timezone,
  } = response;

  if (cod === "404") {
    alert("please enter existing city", message);
    return false;
  }

  console.log(response);
  fillLocation(name, coord);
  fillTemperature(weather, main);
  fillWindAndHumidity(main, wind);
  fillModalInfo(main, visibility);
  fillSun(sys, timezone);
  imageChange(name, weather);
  showDetails();
}

// hw

function fillModalInfo(main, visibility) {
  const { pressure, temp_max, temp_min } = main;

  document.getElementById("pressure").textContent = pressure;
  document.getElementById("visibility").textContent = visibility;
  document.getElementById("tempMax").textContent = temp_max;
  document.getElementById("tempMin").textContent = temp_min;
}

function fillSun(sys, timezone) {
  const rise = sys.sunrise;
  const set = sys.sunset;
  const utc = timezone / 60 / 60;

  let sunRise = new Date(rise * 1000);
  sunRise.setUTCHours(sunRise.getUTCHours() + utc);
  const textSunRise = sunRise.toISOString().slice(11, 16);
  //    `${sunRise.getUTCHours()}:${sunRise.getMinutes()}`;

  let sunSet = new Date(set * 1000);
  sunSet.setUTCHours(sunSet.getUTCHours() + utc);
  const textSunSet = sunSet.toISOString().slice(11, 16);
  //   `${sunSet.getUTCHours()}:${sunSet.getMinutes()}`;

  document.getElementById("sunrise").textContent = textSunRise;
  document.getElementById("sunset").textContent = textSunSet;
}

function imageChange(name, weather) {
  fetch(
    `https://api.unsplash.com/search/photos?page=1&client_id=tGXVHvidW1by7XJ_PDGyY_AygUFF_rvcbg4lM4rm9A0&query=${name}+city+${weather[0].main}`
  )
    .then((data) => data.json())
    .then((response) => {
      document.body.style.backgroundImage = `url(${response.results[0].urls.regular})`;
    })
    .catch((error) => {
      console.log(error);
    });
}
