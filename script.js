let api = 'http://api.openweathermap.org/data/2.5/weather?q=';
let city;
let units = '&units=metric&appid=';
let weatherKey = 'f20b3d81afbc226e2cf6912fe5397493';

const submitbutton = document.querySelector('#submitbutton');

submitbutton.addEventListener('click', () => {
  let cityName = document.getElementById("citySearch");
  city = cityName.value;
  console.log(city);
  console.log(cityName);
  const fullApi = api+city+units+weatherKey
  fetch(fullApi)
    .then(response => response.json())
    .then(data => console.log(data));
    console.log(weather.main.humidity)
});



import Data from "./config.js";

