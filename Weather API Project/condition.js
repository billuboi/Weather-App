const weatherConditions = {
    "Clouds": "https://openweathermap.org/img/wn/02d@2x.png",
    "Clear": "https://openweathermap.org/img/wn/01d@2x.png",
    "Rain": "https://openweathermap.org/img/wn/10d@2x.png",
    "Snow": "https://openweathermap.org/img/wn/13d@2x.png",
    "Drizzle": "https://openweathermap.org/img/wn/09d@2x.png",
    "Thunderstorm": "https://openweathermap.org/img/wn/11d@2x.png"
};

const sameConditions = ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand","Ash", "Squall","Tornado"];
const commonUrl = "https://openweathermap.org/img/wn/50d@2x.png";

sameConditions.forEach(condition => {
    weatherConditions[condition] = commonUrl;
});