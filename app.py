from datetime import date

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("WEATHER_API_KEY")
print("API KEY LOADED:", bool(API_KEY))

@app.route("/")
def home():
    return "Weather API is running!"


@app.route("/api/weather")
def weather():
    city = request.args.get("city")

    if not city or not city.strip():
        return jsonify({
            "error": "City parameter is required"
        }), 400

    city = city.strip()

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)

    if response.status_code == 404:
        return jsonify({
            "error": "City not found"
        }), 404
    if response.status_code != 200:
        return jsonify({
            "error": "Weather service unavailable"
        }), 502

    data = response.json()

    return jsonify({
    "city": data["name"],
    "weather": {
        "temperature": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "condition": data["weather"][0]["description"]
    },
    "humidity": data["main"]["humidity"],
    "wind_speed": data["wind"]["speed"]
    })
@app.route("/api/forecast")
def forecast():
    city = request.args.get("city")

    if not city or not city.strip():
        return jsonify({
            "error": "City parameter is required"
        }), 400

    city = city.strip()

    url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)

    if response.status_code == 404:
        return jsonify({
            "error": "City not found"
        }), 404

    if response.status_code != 200:
        return jsonify({
            "error": "Weather service unavailable"
        }), 502

    data = response.json()

    forecast_data = []

    for item in data["list"]:
        if "12:00:00" in item["dt_txt"]:
            forecast_data.append({
                "date": item["dt_txt"].split(" ")[0],
                "temperature": item["main"]["temp"],
                "feels_like": item["main"]["feels_like"],
                "humidity": item["main"]["humidity"],
                "condition": item["weather"][0]["description"],
                "wind_speed": item["wind"]["speed"]
            })

    return jsonify({
    "city": data["city"]["name"],
    "forecast": forecast_data
    })

if __name__ == "__main__":
    app.run(debug=True)