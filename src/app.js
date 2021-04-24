let now = new Date();

let dates = document.querySelector("#dates");
let time = document.querySelector("#time");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

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

dates.innerHTML = `${day}, ${date} ${month} ${year}`;
time.innerHTML = `${hours}:${minutes}`;

let enterCity = document.querySelector("#button-addon2");
let input_city_field = document.getElementById("input_city");
let temperatureElement = document.querySelector("#current_temperature");
let max_min_temp_element = document.querySelector("#max_min_temp");
let humidityElement = document.querySelector("#current_humidity");
let windElement = document.querySelector("#windSpeed");
let city = document.querySelector("#city");

let apiKey = "136704be6c76187eb0ff7a4b79f385ce";

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let max_temp = Math.round(response.data.main.temp_max);
  let min_temp = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind_speed = Math.round(response.data.wind.speed);

  temperatureElement.innerHTML = `${temperature}°C`;
  max_min_temp_element.innerHTML = `Temperature: ${max_temp}°C / ${min_temp}°C`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind_speed} km/h`;
}

function searchCity() {
  let input_city = document.getElementById("input_city").value;
  city.innerHTML = `${input_city}`;
  console.log(`${apiUrl}${input_city}&appid=${apiKey}`);
  axios.get(`${apiUrl}${input_city}&appid=${apiKey}`).then(showTemperature);
}

enterCity.addEventListener("click", searchCity);
input_city_field.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("button-addon2").click();
  }
});
