const apiKey = "YOUR_API_KEY_HERE"; // Get from openweathermap.org

function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherDisplay");
  if (data.cod !== 200) {
    weatherDiv.innerHTML = `<p>Error: ${data.message}</p>`;
    return;
  }

  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ Temperature: ${(data.main.temp - 273.15).toFixed(1)}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name.");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(err => alert("Error fetching weather data."));
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then(res => res.json())
      .then(data => displayWeather(data))
      .catch(err => alert("Failed to fetch weather data."));
  });
}
