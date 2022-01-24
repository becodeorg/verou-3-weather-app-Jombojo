const cityName2 = document.querySelector("#citySearch");
const weatherKey = "f20b3d81afbc226e2cf6912fe5397493";
let cityName 
document.getElementById("citybutton").addEventListener('click', function(){
   cityName = document.getElementById("citySearch")
   fetch('http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid='+weatherKey)
  .then(response => response.json())
  .then(data => console.log(data));

import Data from "./config.js";
})



