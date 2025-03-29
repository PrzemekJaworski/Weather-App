// Selecting DOM elements
const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

// OpenWeatherMap API details
const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=d463bccbfd93ff4961abaa616e303e33";
const API_UNITS = "&units=metric";

// Function to fetch weather data and update UI
const getWeather = () => {
  // Use input value or default to 'Warszawa'
  const city = input.value || "Warszawa";
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then(res => {
      const temp = res.data.main.temp;
      const hum = res.data.main.humidity;
      // Directly access the first element of the weather array
      const status = res.data.weather[0];

      // Update UI elements with API data
      cityName.textContent = res.data.name;
      temperature.textContent = Math.floor(temp) + "℃";
      humidity.textContent = hum + "%";
      weather.textContent = status.main;

      // Clear warning and input field
      warning.textContent = "";
      input.value = "";

      // Update weather image based on status.id
      if (status.id >= 801 && status.id <= 804) {
        photo.setAttribute("src", "/img/cloud.png");
      } else if (status.id >= 200 && status.id <= 232) {
        photo.setAttribute("src", "/img/thunderstorm.png");
      } else if (status.id >= 300 && status.id <= 321) {
        photo.setAttribute("src", "/img/drizzle.png");
      } else if (status.id >= 500 && status.id <= 531) {
        photo.setAttribute("src", "/img/rain.png");
      } else if (status.id >= 600 && status.id <= 622) {
        photo.setAttribute("src", "/img/ice.png");
      } else if (status.id === 800) {
        photo.setAttribute("src", "/img/sun.png");
      } else if (status.id === 741) {
        photo.setAttribute("src", "/img/fog.png");
      }
    })
    .catch(() => {
      // Display warning if city name is incorrect
      warning.textContent = "Wpisz poprawną nazwę miasta !";
    });
};

// Initial fetch when page loads
getWeather();

// Check for Enter key press to trigger weather fetch
const enterCheck = e => {
  if (e.key === "Enter") {
    getWeather();
  }
};

// Event listeners for button click and keyup in input field
button.addEventListener("click", getWeather);
input.addEventListener("keyup", enterCheck);
