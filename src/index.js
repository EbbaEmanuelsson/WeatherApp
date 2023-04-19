let now = new Date();

let h1 = document.querySelector("h1");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

h1.innerHTML = `${day}, ${hours}:${minutes}`;

function showWeather(response) {
  let h2 = document.querySelector("h2");
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  h2.innerHTML = `${temperature}°C and ${description} in ${city}`;
}

function getCity(city) {
  let apiKey = "ad85da160c6f3ba80a4c59c524b772ee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  getCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getPosition(position) {
  let apiKey = "ad85da160c6f3ba80a4c59c524b772ee";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function locationHere(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", locationHere);