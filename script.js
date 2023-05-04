function showForecast(response){
  let forecast = response.data.daily;

  let showForecastMenu = document.querySelector("#forecast");

  

  let forecastHTML = `<div class="row menu">`;
  forecast.forEach(function(forecastDay){
    forecastHTML =
      forecastHTML +
      `
          <div class="col-3">
            <p>
              <strong>
                ${forecastDay.dt}
              </strong>
              <br />
              21 march
            </p>
          </div>
          <div class="col-3" id="">
            <img 
            src="https//openwethermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
            alt="light rain"   
            />
          </div>
          <div class="col-2">
            Wind
          </div>
          <div class="col-1">
            ${forecastDay.temp.min}°
          </div>
          <div class="col-1">
            ${forecastDay.temp.max}°
          </div>
          <div class="col-1"></div>
          <div class="col-1">
            <button type="button" class="btn btn-light">»</button>
          </div>`;
  });
  
  forecastHTML = forecastHTML + `</div>`;
  showForecastMenu.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);  
  let apiKey = "7c42ee22976f9e22c8a745edb621c2d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

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

  getForecast(response.data.coord);
}

function getCity(city) {
  let apiKey = "7c42ee22976f9e22c8a745edb621c2d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  getCity(city);
}

function getPosition(position) {
  let apiKey = "7c42ee22976f9e22c8a745edb621c2d1";
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

getCity("Gothenburg");

