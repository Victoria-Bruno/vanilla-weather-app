//Extract current time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let currentTime = document.querySelector("#timer");
currentTime.innerHTML = `${day} ${hours}:${minutes}`;

//Forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="card-body">`;
  let days = ["thursday", "friday", "saturday", "sunday", "monday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="forecast-date">${day}</div>
              <i class="fas fa-sun"></i>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Link input city to actual weather (API)
function displayWeatherCondition(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity-value").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  if (response.data.weather[0].main == "Clouds") {
    document
      .querySelector("#icon-weather")
      .setAttribute("src", "media/cloud-pixilart.png");
  } else if (response.data.weather[0].main == "Clear") {
    document
      .querySelector("#icon-weather")
      .setAttribute("src", "media/sunny.png");
  } else if (response.data.weather[0].main == "Rain") {
    document
      .querySelector("#icon-weather")
      .setAttribute("src", "media/rainy.png");
  } else if (response.data.weather[0].main == "Snow") {
    document
      .querySelector("#icon-weather")
      .setAttribute("src", "media/snowy.png");
  } else if (
    (response.data.weather[0].main == "Clouds") &
    (response.data.weather[0].description == "few clouds")
  ) {
    document
      .querySelector("#icon-weather")
      .setAttribute("src", "media/sunandclouds.png");
  }
  celsiusTemperature = response.data.main.temp;
}

// city input
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// coordinates
function searchLocation(position) {
  let apiKey = "559d4e8adbce809e1299cc093a978168";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Bonus
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// let currentLocationButton = document.querySelector("#current-location-button");
// currentLocationButton.addEventListener("click", getCurrentLocation);

//Unit conversion
function displayFarhenheitTemperature(event) {
  event.preventDefault();
  let farhenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farhenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let farhenheitLink = document.querySelector("#farhenheit-link");
farhenheitLink.addEventListener("click", displayFarhenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();
