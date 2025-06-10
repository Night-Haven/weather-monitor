const weatherIcon = document.getElementById("weather-icon");
const humidityValue = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const feelsLike = document.getElementById("feels-like");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const error = document.getElementById("error");
const temperature = document.querySelector(".temp");
const desc = document.querySelector(".desc");
const locatedCountry = document.querySelector(".country");

const apiRequest = async (city) => {
  try {
    const API = `/weather?city=${city}`;
    let response = await fetch(API);

    if (response.status === 404) {
      onError("Kota tidak ditemukan!");
      return;
    }

    let result = await response.json();
    getWeatherDetails(result);
    onSuccess();
  } catch (err) {
    onError("Terjadi kesalahan saat mengambil data.");
  }
};

const getWeatherDetails = (weatherDetails) => {
  const {
    city: name,
    country,
    temperature: temp,
    feels_like,
    humidity,
    wind_speed: speed,
    description,
    id,
  } = weatherDetails;

  temperature.innerText = `${Math.floor(temp)}°C`;
  desc.innerText = description;
  locatedCountry.innerText = `${name}, ${country}`;
  humidityValue.innerText = `${humidity}%`;
  windSpeed.innerText = `${speed} Km/hr`;
  feelsLike.innerText = `Feels Like ${Math.floor(feels_like)}° C`;

  // Gunakan ID cuaca untuk menentukan ikon
  if (id >= 200 && id <= 232) weatherIcon.src = "/static/icons/thunder.svg";
  else if (id >= 300 && id <= 321) weatherIcon.src = "/static/icons/rainy-2.svg";
  else if (id >= 500 && id <= 531) weatherIcon.src = "/static/icons/rainy-1.svg";
  else if (id >= 600 && id <= 622) weatherIcon.src = "/static/icons/snowy.svg";
  else if (id >= 701 && id <= 781) weatherIcon.src = "/static/icons/cloudy-day-1.svg";
  else if (id === 800) weatherIcon.src = "/static/icons/day.svg";
  else if (id >= 801 && id <= 804) weatherIcon.src = "/static/icons/cloudy-day-3.svg";

  console.log("Weather ID:", id);
  console.log("Icon path:", weatherIcon.src);
};

const onError = (text) => {
  error.innerText = text;
  error.classList.add("active");
};

const onSuccess = () => {
  error.innerText = "";
  error.classList.remove("active");
};

btn.addEventListener("click", (e) => {
  if (input.value !== "") {
    apiRequest(input.value);
  } else {
    onError("Silakan masukkan nama kota.");
    return;
  }
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && input.value !== "") apiRequest(input.value);
  else if (e.key === "Enter" && input.value === "") {
    onError("Silakan masukkan nama kota.");
    return;
  }
});
