let now = new Date();

let showDay = document.querySelector("#day");
let showTime = document.querySelector("#time");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

showDay.innerHTML = `${day}`;
showTime.innerHTML = `${hours}:${minutes}`;

function showWeather(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let showTemperature = document.querySelector("#temperature");


  h1.innerHTML = `${city}, ${description}`;
  iconElement.setAttribute(
    "src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  wind.innerHTML = `${windSpeed} km/h`;
  showTemperature.innerHTML = `${temperature}°C`;
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



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

