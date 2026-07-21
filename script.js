

const apiKey = "9e689cc08d70bb2e8da18a017368a3e1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return;
    }

    const data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const icon = data.weather[0].icon;

    switch (icon) {

        case "01d":
            weatherIcon.src = "img/clear-day.png";
            break;

        case "01n":
            weatherIcon.src = "img/clear-night.png";
            break;

        case "02d":
        case "03d":
        case "04d":
            weatherIcon.src = "img/clouds-day.png";
            break;

        case "02n":
        case "03n":
        case "04n":
            weatherIcon.src = "img/clouds-night.png";
            break;

        case "09d":
        case "09n":
        case "10d":
        case "10n":
            weatherIcon.src = "img/rain.png";
            break;

        case "11d":
        case "11n":
            weatherIcon.src = "img/thunderstorm.png";
            break;

        case "13d":
        case "13n":
            weatherIcon.src = "img/snow.png";
            break;

        case "50d":
        case "50n":
            weatherIcon.src = "img/mist.png";
            break;

        default:
            weatherIcon.src = "img/clouds-day.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    }

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

