import APIkey from './config.js';
import { UNSPLASH_API_KEY } from './config.js';

const cityNameInput = document.getElementById('inputField');
const submitBtn = document.getElementById('submit');
const cityProperties = document.getElementById('cityProperties');
const dayNamesOfWeek = document.getElementById('daysOfWeek');
const showCityName = document.getElementById('inputArea').children[0];
const cityImage = document.getElementById('cityImg');

let visitedCities = [];

async function getCity5Days(cityName) {
    const apiString5Days = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=40&units=metric&appid=" + APIkey;
    const response5Days = await fetch(apiString5Days).then(response => response.json());

    if(response5Days.city == undefined) {
        showCityName.textContent = "City not found";
        return;
    }

    const skyData = [
        response5Days.list[0].weather[0].main,
        response5Days.list[8].weather[0].main,
        response5Days.list[16].weather[0].main,
        response5Days.list[24].weather[0].main,
        response5Days.list[32].weather[0].main,
        response5Days.list[39].weather[0].main,
    ];

    const responseTempValues = [
        response5Days.city.name,
        response5Days.list[0].main.temp,
        response5Days.list[8].main.temp,
        response5Days.list[16].main.temp,
        response5Days.list[24].main.temp,
        response5Days.list[32].main.temp,
        response5Days.list[39].main.temp,
    ];

    // Get today's date
    let todaysDate = new Date();
    // Set all the weekdays in app correctly according to today
    getDayAndSetAllDaysOfWeek(todaysDate);

    // Show city name on top
    showCityName.textContent = responseTempValues[0];

    // Show temperature for all days
    setTempAllDays(responseTempValues);

    // Show sky description for all days
    setSkyStatusAllDays(skyData);

    const temperatures = setTempAllDays(responseTempValues);
    const dayLabels = getDayAndSetAllDaysOfWeek(todaysDate);
    dayLabels.pop();

    drawGraph(dayLabels, temperatures);

    visitedCities.push(responseTempValues[0]);
    visitedCities = visitedCities.filter((value, index, city) => city.indexOf(value) === index);

    createVisitedCitiesListItem(visitedCities);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDayAndSetAllDaysOfWeek(today) {
    let todayNr = today.getDay();
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    while(todayNr != 0) {
        let day = daysOfWeek.shift();
        daysOfWeek.push(day);
        todayNr--;
    }

    for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
        dayNamesOfWeek.children[i].children[0].innerHTML = daysOfWeek[i + 1];
    }

    return daysOfWeek;
}

function setTempAllDays(tempData) {
    let temperatures = [];
    
    const todaysTemperature = Math.round(tempData[1]);
    temperatures.push(todaysTemperature);

    cityProperties.children[2].innerHTML = todaysTemperature + "??";
    
    for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
        dayNamesOfWeek.children[i].children[2].innerHTML = Math.round(tempData[i + 2]) + "??";
        temperatures.push(Math.round(tempData[i + 2]));
    }

    return temperatures;
}

function setSkyStatusAllDays(skyData) {
    cityProperties.children[1].innerHTML = skyData[0];

    for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
        dayNamesOfWeek.children[i].children[1].innerHTML = skyData[i + 1];
    }
}

let myChart = null;



// Events
cityNameInput.addEventListener('keyup', (event) => {
    cityProperties.children[1].innerHTML = "-";
    cityProperties.children[2].innerHTML = "-";
    for(let j = 1; j < 3; j++) {
        for(let i = 0; i < dayNamesOfWeek.children.length; i++) {
            dayNamesOfWeek.children[i].children[j].innerHTML = "-";
        }
    }

    cityImage.src = "";

    if(myChart != null)
        myChart.destroy();

    if(event.key == "Enter") {
        cityNameInput.value = capitalizeFirstLetter(cityNameInput.value);
        getCity5Days(cityNameInput.value);
        getCityImage(cityNameInput.value);
    }
});

submitBtn.addEventListener('click', () => {
    cityNameInput.value = capitalizeFirstLetter(cityNameInput.value);
    getCity5Days(cityNameInput.value);
    getCityImage(cityNameInput.value);
});

// Dummy data to show on page load
const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const data = [10, 5, 7, 8, 3, 11];
drawGraph(labels, data);

function drawGraph(labels, data) {
    const ctx = document.getElementById("myChart").getContext("2d");

    if(myChart != null) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            data: data,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
}



function createVisitedCitiesListItem(visitedCities) {
    let list = document.getElementById('visitedCities').children[1];
    
    // Remove all list items
    let child = list.lastElementChild;  
    while(child) { 
        list.removeChild(child); 
        child = list.lastElementChild; 
    }

    // Update list with unique cities
    visitedCities.forEach(city => {
        let listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(city));
        list.appendChild(listItem);
    });
}

async function getCityImage(cityName) {
    const url = "https://api.unsplash.com/search/photos?query=" + cityName + "&client_id=" + UNSPLASH_API_KEY;
    const getImage = await fetch(url).then(response => response.json());
    
    cityImage.src = getImage.results[0].urls.regular;
}