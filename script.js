let api = 'http://api.openweathermap.org/data/2.5/weather?q=';
let city;
let units = '&units=metric&appid=';
let weatherKey = 'f20b3d81afbc226e2cf6912fe5397493';

const submitbutton = document.querySelector('#submitbutton');

submitbutton.addEventListener('click', () => {
  let cityName = document.getElementById("citySearch");
  city = cityName.value;
  console.log(city);
  const fullApi = api+city+units+weatherKey
  fetch(fullApi)
    .then(response => response.json())
    .then(data => {
      var weather = data;
      console.log(weather) 
    });
    
});
const cardContainer = document.createElement("section");
cardContainer.className = "card-container";
main.appendchild(cardContainer);

import Data from "./config.js";

