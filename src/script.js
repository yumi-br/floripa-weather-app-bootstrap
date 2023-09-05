function displayDateTime() {
  let now = new Date();
  let dateTimeElement = document.querySelector("#date-time");
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = now.getFullYear();
  let seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  dateTimeElement.innerHTML = `${day}, ${month} ${date}, ${year}, <strong>${hours}:${minutes}`;
}

let city = "Florianopolis";
let unit = "metric";

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42" />
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
                <span class="weather-forecast-temperature-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
            </div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayFahrenheitForecast(response) {
  let fahrenheitForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="42" />
            <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-min"> ${Math.round(
                  (forecastDay.temp.min * 9) / 5 + 32
                )}° </span>
                <span class="weather-forecast-temperature-max"> ${Math.round(
                  (forecastDay.temp.max * 9) / 5 + 32
                )}° </span>
            </div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response);
  let city = response.data.name;
  let country = response.data.sys.country;
  let weatherDescription = response.data.weather[0].main;

  descriptionData = response.data.weather[0].main;
  celsiusTemperature = response.data.main.temp;
  cityData = response.data.name;

  tempMinData = Math.round(response.data.main.temp_min);
  tempMaxData = Math.round(response.data.main.temp_max);
  feelsLikeData = Math.round(response.data.main.feels_like);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  locationElement.innerHTML = `${city} ${country}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  tempMaxElement.innerHTML = `${tempMaxData}°`;
  tempMinElement.innerHTML = `${tempMinData}°`;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  pressureElement.innerHTML = `${response.data.main.pressure}`;
  descriptionElement.innerHTML = weatherDescription;
  sentenceElement.innerHTML = `The temperature right now feels like ${feelsLikeData}°C.`;
  celsiusLink.classList.add("active");

  displayDateTime();
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function searchLocation(position) {
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitFeelsLikeTemperature = Math.round((feelsLikeData * 9) / 5 + 32);

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  sentenceElement.innerHTML = `The temperature right now feels like ${fahrenheitFeelsLikeTemperature}°F.`;
  unit = "imperial";
  searchCity(city);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  sentenceElement.innerHTML = `The temperature right now feels like ${feelsLikeData}°C.`;
  unit = "metric";
  searchCity(city);
}

function displayCityOneWeather(event) {
  event.preventDefault();
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=eastbourne&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayCityTwoWeather(event) {
  event.preventDefault();
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=florianopolis&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayCityFourWeather(event) {
  event.preventDefault();
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=utrecht&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayCityThreeWeather(event) {
  event.preventDefault();
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=nagoya&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

let celsiusTemperature = null;
let tempMinData = null;
let tempMaxData = null;
let feelsLikeData = null;
let descriptionData = null;
let cityData = null;

let temperatureElement = document.querySelector("#temperature");
let tempMaxElement = document.querySelector("#temp-max");
let tempMinElement = document.querySelector("#temp-min");
let locationElement = document.querySelector("#location");
let iconElement = document.querySelector("#icon");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let windDegElement = document.querySelector("#wind-deg");
let pressureElement = document.querySelector("#pressure");
let sentenceElement = document.querySelector("#sentence-description");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#weather-description");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let menuCityOne = document.querySelector("#menu-city-1");
menuCityOne.addEventListener("click", displayCityOneWeather);

let menuCityTwo = document.querySelector("#menu-city-2");
menuCityTwo.addEventListener("click", displayCityTwoWeather);

let menuCityThree = document.querySelector("#menu-city-3");
menuCityThree.addEventListener("click", displayCityThreeWeather);

let menuCityFour = document.querySelector("#menu-city-4");
menuCityFour.addEventListener("click", displayCityFourWeather);

searchCity(city);
