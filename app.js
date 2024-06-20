document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("searchBtn");
  const weatherInfo = document.getElementById("weatherInfo");
  const cityName = document.getElementById("cityName");
  const weatherIcon = document.getElementById("weatherIcon");
  const temperature = document.getElementById("temperature");
  const weatherDescription = document.getElementById("weatherDescription");
  const highTemp = document.getElementById("highTemp");
  const lowTemp = document.getElementById("lowTemp");

  searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    }
  });

  async function getWeather(city) {
    const apiKey = "fc1c635862ddb645812c2dd7397cb3e5"; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      console.log(data);

      // Update weather info
      cityName.textContent = data.name;
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      highTemp.textContent = `${Math.round(data.main.temp_max)}`;
      lowTemp.textContent = `${Math.round(data.main.temp_min)}`;

      // Show weather info container
      weatherInfo.classList.remove("hidden");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("City not found. Please enter a valid city name.");
    }
  }
});
