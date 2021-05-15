let dates = document.querySelector("#dates");
let time = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

let enterCity = document.querySelector("#search_city");
let currentLocation = document.querySelector("#current_location");
let input_city_field = document.getElementById("input_city");
let temperatureElement = document.querySelector("#current_temperature");
let max_min_temp_element = document.querySelector("#max_min_temp");
let humidityElement = document.querySelector("#current_humidity");
let windElement = document.querySelector("#windSpeed");
let city = document.querySelector("#city");
let weatherDescriptionElement = document.querySelector("#weather_description");
let weatherIconElement = document.querySelector("#weather_icon");
let day1Element = document.querySelector("#day1");
let day2Element = document.querySelector("#day2");
let day3Element = document.querySelector("#day3");
let day4Element = document.querySelector("#day4");
let day5Element = document.querySelector("#day5");
let day1TemperatureElement = document.querySelector("#day1_temperature");
let day2TemperatureElement = document.querySelector("#day2_temperature");
let day3TemperatureElement = document.querySelector("#day3_temperature");
let day4TemperatureElement = document.querySelector("#day4_temperature");
let day5TemperatureElement = document.querySelector("#day5_temperature");
let day1WeatherIconElement = document.querySelector("#day1_weather_icon");
let day2WeatherIconElement = document.querySelector("#day2_weather_icon");
let day3WeatherIconElement = document.querySelector("#day3_weather_icon");
let day4WeatherIconElement = document.querySelector("#day4_weather_icon");
let day5WeatherIconElement = document.querySelector("#day5_weather_icon");

let baseCity = "Basel";

let apiKey = "136704be6c76187eb0ff7a4b79f385ce";

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let forecastApiUrl =
  "https://api.openweathermap.org/data/2.5/onecall?units=metric&exclude=hourly,minutely,alerts,current&appid=";

axios.get(`${apiUrl}${baseCity}&appid=${apiKey}`).then(showTemperature);

function cityDateTime(dt) {
  let curr_date = new Date(dt * 1000);
  let date = curr_date.getDate();
  if (date < 10) {
    new_date = `0${date}`;
  } else {
    new_date = date;
  }
  let hours = curr_date.getHours();
  if (hours < 10) {
    new_hours = `0${hours}`;
  } else {
    new_hours = hours;
  }
  let minutes = curr_date.getMinutes();
  if (minutes < 10) {
    new_minutes = `0${minutes}`;
  } else {
    new_minutes = minutes;
  }
  let year = curr_date.getFullYear();
  let day = days[curr_date.getDay()];
  let day1 = days[(curr_date.getDay() + 1) % 7].substring(0, 3);
  let day2 = days[(curr_date.getDay() + 2) % 7].substring(0, 3);
  let day3 = days[(curr_date.getDay() + 3) % 7].substring(0, 3);
  let day4 = days[(curr_date.getDay() + 4) % 7].substring(0, 3);
  let day5 = days[(curr_date.getDay() + 5) % 7].substring(0, 3);
  let month = months[curr_date.getMonth()];
  dates.innerHTML = `${day}, ${new_date} ${month} ${year}`;
  time.innerHTML = `${new_hours}:${new_minutes}`;
  day1Element.innerHTML = day1;
  day2Element.innerHTML = day2;
  day3Element.innerHTML = day3;
  day4Element.innerHTML = day4;
  day5Element.innerHTML = day5;
}

function showTemperature(response) {
  cityDateTime(response.data.dt);
  let temperature = Math.round(response.data.main.temp);
  let max_temp = Math.round(response.data.main.temp_max);
  let min_temp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind_speed = Math.round(response.data.wind.speed);
  let weather_desc = response.data.weather[0].description;

  city.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}°C`;
  max_min_temp_element.innerHTML = `Temperature: ${max_temp}°C / ${min_temp}°C`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind_speed} km/h`;
  weatherDescriptionElement.innerHTML = weather_desc;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  axios
    .get(
      `${forecastApiUrl}${apiKey}&lat=${response.data.coord.lat}&lon=${response.data.coord.lon}`
    )
    .then(showForecast);
}

function showForecast(response) {
  day1TemperatureElement.innerHTML = `${Math.round(
    response.data.daily[1].temp.day
  )}°C`;
  day2TemperatureElement.innerHTML = `${Math.round(
    response.data.daily[2].temp.day
  )}°C`;
  day3TemperatureElement.innerHTML = `${Math.round(
    response.data.daily[3].temp.day
  )}°C`;
  day4TemperatureElement.innerHTML = `${Math.round(
    response.data.daily[4].temp.day
  )}°C`;
  day5TemperatureElement.innerHTML = `${Math.round(
    response.data.daily[5].temp.day
  )}°C`;
  day1WeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[1].weather[0].icon}@2x.png`
  );
  day2WeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[2].weather[0].icon}@2x.png`
  );
  day3WeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[3].weather[0].icon}@2x.png`
  );
  day4WeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[4].weather[0].icon}@2x.png`
  );
  day5WeatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[5].weather[0].icon}@2x.png`
  );
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiUrl_curr = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl_curr).then(showTemperature);
}

function searchCity() {
  let input_city = document.getElementById("input_city").value;
  axios.get(`${apiUrl}${input_city}&appid=${apiKey}`).then(showTemperature);
}

enterCity.addEventListener("click", searchCity);
currentLocation.addEventListener("click", getCurrentLocation);
input_city_field.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search_city").click();
  }
});
