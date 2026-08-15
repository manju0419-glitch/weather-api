const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const forecastContainer = document.getElementById("forecastContainer");
const emptyState = document.getElementById("emptyState");
const currentWeather = document.getElementById("currentWeather");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");
const windSpeed = document.getElementById("windSpeed");

const errorMessage = document.getElementById("errorMessage");
const loading = document.getElementById("loading");

const API_BASE_URL = "http://127.0.0.1:5000";

async function getWeather(city) {
    try {
        errorMessage.textContent = "";
        loading.style.display = "block";

        const response = await fetch(
            `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }
        
        currentWeather.style.display = "block";
        emptyState.style.display = "none";
        

        cityName.textContent = data.city;
        temperature.textContent = Math.round(data.weather.temperature);
        feelsLike.textContent = `${Math.round(data.weather.feels_like)}°C`;
        humidity.textContent = `${data.humidity}%`;
        condition.textContent = data.weather.condition;
        document.body.className = "";

        const weatherCondition = data.weather.condition.toLowerCase();

        if (weatherCondition.includes("clear")) {
            document.body.classList.add("weather-clear");
        } else if (
            weatherCondition.includes("rain") ||
            weatherCondition.includes("drizzle")
        ) {
            document.body.classList.add("weather-rain");
        } else if (weatherCondition.includes("thunderstorm")) {
            document.body.classList.add("weather-storm");
        } else if (weatherCondition.includes("cloud")) {
            document.body.classList.add("weather-clouds");
        } else if (
            weatherCondition.includes("mist") ||
            weatherCondition.includes("fog") ||
            weatherCondition.includes("haze")
        ) {
            document.body.classList.add("weather-mist");
        }
        windSpeed.textContent = `${data.wind_speed} m/s`;

    } catch (error) {
        errorMessage.textContent = `⚠️ ${error.message}`;

    } finally {
        loading.style.display = "none";
    }
}

async function getForecast(city) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/forecast?city=${encodeURIComponent(city)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to load forecast");
        }

        forecastContainer.innerHTML = "";

        data.forecast.forEach(day => {
            const card = document.createElement("div");
            card.className = "forecast-card";

            const date = new Date(day.date);

            const formattedDate = date.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short"
            });

            const icon = getWeatherIcon(day.condition);

            card.innerHTML = `
                <div class="forecast-date">${formattedDate}</div>
                <div class="forecast-icon">${icon}</div>
                <div class="forecast-temp">${Math.round(day.temperature)}°C</div>
                <div class="forecast-condition">${day.condition}</div>
            `;

            forecastContainer.appendChild(card);
        });

    } catch (error) {
        forecastContainer.innerHTML = "";
        errorMessage.textContent =`⚠️ ${error.message}`;

    }
}

function getWeatherIcon(condition) {
    const weather = condition.toLowerCase();

    if (weather.includes("thunderstorm")) {
        return "⛈️";
    }

    if (weather.includes("rain") || weather.includes("drizzle")) {
        return "🌧️";
    }

    if (weather.includes("snow")) {
        return "❄️";
    }

    if (weather.includes("cloud")) {
        return "☁️";
    }

    if (weather.includes("clear")) {
        return "☀️";
    }

    if (weather.includes("mist") ||
        weather.includes("fog") ||
        weather.includes("haze")) {
        return "🌫️";
    }

    return "🌤️";
}

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (!city) {
        errorMessage.textContent = " ⚠️ Please enter a city name.";
        return;
    }

    getWeather(city);
    getForecast(city);
});
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});