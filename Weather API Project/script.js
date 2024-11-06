const apiKey = "007b4c587a251f3e75c50b04289c47d0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl_forecast = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q="; 
const city = document.querySelector(".city")
const temp = document.querySelector(".temp")
const humidity = document.querySelector(".humidity")
const feels = document.querySelector(".feels")
const wind = document.querySelector(".wind")
const pressure = document.querySelector(".pressure")
const cityInput = document.querySelector(".city_input");
const searchBtn = document.querySelector(".search_btn"); 
const image = document.querySelector(".weather_img img");
const day = document.querySelectorAll(".day_text");
const date = document.querySelectorAll(".date_text");
const image_forecast = document.querySelectorAll(".day_temp img");
const temp_forecast = document.querySelectorAll(".day_temp p");
const forecastCity = document.querySelector(".outer_current_m .city");
const forecastTemp = document.querySelector(".outer_current_m .temp");
const forecastHumidity = document.querySelector(".outer_current_m .humidity");
const forecastFeels = document.querySelector(".outer_current_m .feels");
const forecastWind = document.querySelector(".outer_current_m .wind");
const forecastPressure = document.querySelector(".outer_current_m .pressure");
const forecastImage = document.querySelector(".outer_current_m .weather_img img");
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector('.close_btn');

//Getting todays day
const today = new Date();

const dayOfWeek = today.getDay();

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const todayDayName = dayNames[dayOfWeek];

async function checkWeather(city1){
    const response = await fetch(apiUrl + city1 + `&appid=${apiKey}`);
    var data = await response.json();

    if (data.cod === "404") {
        alert("City not found. Please enter a valid city name.");
        return;
    }
    
    console.log(data);
    city.innerHTML = data.name;
    temp.innerHTML = Math.round(data.main.temp) + "°c";
    humidity.innerHTML = data.main.humidity + "%";
    feels.innerHTML = Math.round(data.main.feels_like) + "°c";
    wind.innerHTML = data.wind.speed + "km/h";
    pressure.innerHTML = data.main.pressure + "hPa";

    for(currCondition in weatherConditions){
        if(data.weather[0].main == currCondition){
            image.src = weatherConditions[currCondition]
        }
    }

    const response1 = await fetch(apiUrl_forecast + city1 + `&appid=${apiKey}`);
    var data1 = await response1.json();
    console.log(data1);



    for (let i = 0; i < day.length; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i + 1);
    const dayIndex = (dayOfWeek + i + 1) % 7;

    day[i].innerHTML = dayNames[dayIndex].substring(0, 3);
    date[i].innerHTML = futureDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });

    // Use a modulo calculation to prevent going out of bounds
    const forecastIndex = (i + 1) * 8 < data1.list.length ? (i + 1) * 8 : data1.list.length - 1;

    if (forecastIndex < data1.list.length) {
        const forecastData = data1.list[forecastIndex];
        temp_forecast[i].innerHTML = Math.round(forecastData.main.temp) + "°c";

        const weatherCondition = forecastData.weather[0].main;
        for (currCondition in weatherConditions) {
            if (weatherCondition === currCondition) {
                image_forecast[i].src = weatherConditions[currCondition];
            }
        }
        document.querySelectorAll(".day")[i].addEventListener("click", () => {
            displayForecastDetails(data.name, forecastData);
        });
    }

    closeBtn.addEventListener('click', () => {
    document.querySelector('.outer_current_m').style.display = 'none';
    backdrop.style.display = 'none';
});
}

function displayForecastDetails(cityName, forecastData) {
    forecastCity.innerHTML = cityName;
    forecastTemp.innerHTML = Math.round(forecastData.main.temp) + "°c";
    forecastHumidity.innerHTML = forecastData.main.humidity + "%";
    forecastFeels.innerHTML = Math.round(forecastData.main.feels_like) + "°c";
    forecastWind.innerHTML = forecastData.wind.speed + "km/h";
    forecastPressure.innerHTML = forecastData.main.pressure + "hPa";
    forecastImage.src = weatherConditions[forecastData.weather[0].main] || "default_image.png";

    document.querySelector('.outer_current_m').style.display = 'flex';
    backdrop.style.display = 'block';
}

backdrop.addEventListener('click', () => {
    document.querySelector('.outer_current_m').style.display = 'none';
    backdrop.style.display = 'none';
});

}

document.addEventListener("DOMContentLoaded", () => {
    checkWeather("Lahore");
});


searchBtn.addEventListener("click", ()=>{
    checkWeather(cityInput.value);
})

cityInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    checkWeather(cityInput.value);
  }
});






