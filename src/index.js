let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "December"
  ];

  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}`;
}

console.log(formatDate(currentTime));

function searchCity(city) {
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  
  searchCity(cityInput.value);

  cityInput.value = "";
}

let findCity = document.querySelector("#search-form");
findCity.addEventListener("submit", showCity);

searchCity("Tokyo");

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#main-city-tempr");
  let h1 = document.querySelector("#main-city");
  let weatherDescr = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  
  temperatureElement.innerHTML = `${temperature}° C`;
  weatherDescr.innerHTML = description;

  h1.innerHTML = response.data.name.toUpperCase();
  iconElement.setAttribute(
    "src",

    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
