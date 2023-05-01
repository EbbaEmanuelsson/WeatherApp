function showWeather(response) {
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let showIcon = document.querySelector("#icon");
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let showTemperature = document.querySelector("#temperature");

  
  celsiusTemp = response.data.main.temp;
  

  showTemperature.innerHTML = Math.round(celsiusTemp);
  h1.innerHTML = `${city}, ${description}`;
  showIcon.setAttribute(
    "src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  wind.innerHTML = `${windSpeed} km/h`;
  showTemperature.innerHTML = `${temperature}`;
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

function showTempFahrenheit(event){
  event.preventDefault();
  let showTemperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  showTemperature.innerHTML = Math.round(fahrenheitTemp);
}

function showTempCelsius(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let showTemperature = document.querySelector("#temperature");
  showTemperature.innerHTML = Math.round(celsiusTemp);
}


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

showDay.innerHTML = `${day}`;
showTime.innerHTML = `${hours}:${minutes}`;

let celsiusTemp = null;

let button = document.querySelector("button");
button.addEventListener("click", locationHere);


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showTempFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showTempCelsius);

