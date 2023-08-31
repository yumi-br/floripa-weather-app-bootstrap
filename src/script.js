let now = new Date();
let h3 = document.querySelector("h3.date-time");
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
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h3.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

function toggleF() {
  let f = document.getElementById("forecast");
  if (f.style.display === "none") {
    f.style.display = "block";
  } else {
    f.style.display = "none";
  }
}

function getForecast(coordinates) {
  let apiKey = "cd173a006b0e51dac58c6d8064c94178";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response.data);
  let city = response.data.name;
  let country = response.data.sys.country;
  let weatherDescription = response.data.weather[0].main;

  descriptionData = response.data.weather[0].main;
  celsiusTemperature = response.data.main.temp;
  cityData = response.data.name;

  tempMinData = Math.round(response.data.main.temp_min);
  tempMaxData = Math.round(response.data.main.temp_max);
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  locationElement.innerHTML = `${city} ${country}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  tempMaxElement.innerHTML = `${tempMaxData}°C`;
  tempMinElement.innerHTML = `${tempMinData}°C`;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  windDegElement.innerHTML = `${response.data.wind.deg}deg`;
  pressureElement.innerHTML = `${response.data.main.pressure}`;
  descriptionElement.innerHTML = weatherDescription;
  sentenceElement.innerHTML = `${weatherDescription} today in ${city}. <br>
  The minimum temperature will be ${tempMinData}°C and <br>
  the maximum temperature will be ${tempMaxData}°C.`;
  celsiusLink.classList.add("active");

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function searchLocation(position) {
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherCondition);
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
  let fahrenheitMinTemperature = Math.round((tempMinData * 9) / 5 + 32);
  let fahrenheitMaxTemperature = Math.round((tempMaxData * 9) / 5 + 32);

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  sentenceElement.innerHTML = `${descriptionData} today in ${cityData}. <br>
  The minimum temperature will be ${fahrenheitMinTemperature}°F and <br>
  the maximum temperature will be ${fahrenheitMaxTemperature}°F.`;
  tempMinElement.innerHTML = `${fahrenheitMinTemperature}°F`;
  tempMaxElement.innerHTML = `${fahrenheitMaxTemperature}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  sentenceElement.innerHTML = `${descriptionData} today in ${cityData}. <br>
  The minimum temperature will be ${tempMinData}°C and <br>
  the maximum temperature will be ${tempMaxData}°C.`;
  tempMinElement.innerHTML = `${tempMinData}°C`;
  tempMaxElement.innerHTML = `${tempMaxData}°C`;
}

function displayCityOneWeather(event) {
  event.preventDefault();
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=eastbourne&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayCityTwoWeather(event) {
  event.preventDefault();
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=florianopolis&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayCityFourWeather(event) {
  event.preventDefault();
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=utrecht&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayCityThreeWeather(event) {
  event.preventDefault();
  let apiKey = "127b5ec2f6d0997638b7af4846d15bfb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=nagoya&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let celsiusTemperature = null;
let tempMinData = null;
let tempMaxData = null;
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

searchCity("Florianopolis");
