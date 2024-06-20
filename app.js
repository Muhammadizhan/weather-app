const apiKey = "3beccae796b7b99ee1f5c4a788c99cea"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weather = document.getElementById("weather");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      displayWeather(data);
    } else {
      alert("City not found");
    }
  } catch (error) {
    alert("Error fetching weather data");
  }
}

function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  weather.textContent = `Weather: ${data.weather[0].description}`;
  const iconCode = data.weather[0].icon;
  weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherInfo.classList.remove("hidden");
}
