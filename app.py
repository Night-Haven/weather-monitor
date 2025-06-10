from flask import Flask, render_template, request, jsonify
import requests
from datetime import datetime

app = Flask(__name__)
API_KEY = "b395c8b7d87bde1849e17a5141749809"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather', methods=['GET'])
def weather():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City is required"}), 400

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url).json()

    if 'main' not in res or 'weather' not in res:
        return jsonify({"error": "City not found"}), 404

    return jsonify({
        'city': res['name'],
        'country': res['sys']['country'],
        'temperature': res['main']['temp'],
        'feels_like': res['main']['feels_like'],
        'humidity': res['main']['humidity'],
        'wind_speed': res['wind']['speed'],
        'description': res['weather'][0]['description'],
        'id': res['weather'][0]['id'],
        'timestamp': datetime.now().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True)