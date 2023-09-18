function changeCity(event) {
  event.preventDefault();
  let userSearch = document.querySelector("#search-input");
  let userCity = document.querySelector("#city-name");
  userSearch.value = userSearch.value.trim().toUpperCase();
  if (userSearch.value < 1) {
    userCity.innerHTML = `No data`;
  } else {
    userCity.innerHTML = `${userSearch.value}`;
  }
  let city = userCity.innerHTML;
  let apiKey = "26600fed117e610e58477193d80f1e65";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(currentWeather);
}

function currentWeather(response) {
  let maxTemp = document.querySelector("#max-t");
  let currentTemp = document.querySelector("#actualTemp");
  let minTemp = document.querySelector("#min-t");
  let precip = document.querySelector("#pre-number");
  let wind = document.querySelector("#wind-number");
  let description = document.querySelector("#w-description");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  precip.innerHTML = Math.round(response.data.main.humidity); //FIX this to precipitation data!!//
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].main;
}

let searchYourCity = document.querySelector("#search-form");
searchYourCity.addEventListener("submit", changeCity);

function coordsWeatherchange(response) {
  let coordsCity = document.querySelector("#city-name");
  let maxTemp = document.querySelector("#max-t");
  let currentTemp = document.querySelector("#actualTemp");
  let minTemp = document.querySelector("#min-t");
  let precip = document.querySelector("#pre-number");
  let wind = document.querySelector("#wind-number");
  let description = document.querySelector("#w-description");
  coordsCity.innerHTML = response.data.name;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  precip.innerHTML = response.data.main.humidity; //FIX this to precipitation data!!//
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.weather[0].description;
}

function currentPosition(position) {
  let apiKey = "26600fed117e610e58477193d80f1e65";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrlNav = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlNav).then(coordsWeatherchange);
}

function coordsWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let locateMe = document.querySelector("#currentLocBtn");
locateMe.addEventListener("click", coordsWeather);

function currentDayTime(date) {
  let now = new Date();
  let fullWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let today = fullWeek[now.getDay()];
  let todayHtml = document.querySelector("#current-day");
  todayHtml.innerHTML = `${today}`;

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return ` ${hours}:${minutes}`;
}
let timeNow = document.querySelector("#current-time");
let timeRefresh = new Date();
timeNow.innerHTML = currentDayTime(timeRefresh);
