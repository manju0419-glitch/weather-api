# 🌦️ WeatherLY

A modern, responsive weather application that provides real-time weather information and a 5-day forecast for cities around the world.

WeatherLY combines a Flask REST API with a polished 3D-inspired frontend and Progressive Web App (PWA) support, allowing users to install it like a native application.

---

## 🚀 Live Demo

🔗 **Live Application:** YOUR_RENDER_URL_HERE

---

## ✨ Features

- 🌡️ Real-time weather information
- 📅 5-day weather forecast
- 🌍 Search weather for any city
- 💧 Humidity information
- 🌡️ Feels-like temperature
- 💨 Wind speed
- 🌈 Weather-based visual backgrounds
- ⌨️ Search using the Enter key
- ⚠️ Proper error handling
- 📱 Fully responsive design
- 🎨 Modern 3D/glass-inspired UI
- 📲 Progressive Web App (PWA)
- ⚙️ Service worker support
- 🖼️ Custom application icons
- 🚀 Deployed and publicly accessible

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Responsive Design
- PWA / Service Workers

### Backend
- Python
- Flask
- REST API
- Requests
- python-dotenv

### Weather Data
- OpenWeather API

### Development & Deployment
- Git
- GitHub
- Postman
- Render

---

## 🏗️ Project Architecture

```text
                    👤 USER
                       │
                       ▼
              🌦️ WeatherLY Frontend
                       │
                       │ HTTP Request
                       ▼
                ⚙️ Flask REST API
                       │
                       │ API Request
                       ▼
                ☁️ OpenWeather API
                       │
                       │ JSON Response
                       ▼
                ⚙️ Flask REST API
                       │
                       │ Filtered JSON
                       ▼
              🌦️ WeatherLY Frontend
                       │
                       ▼
               🌡️ Weather Display
