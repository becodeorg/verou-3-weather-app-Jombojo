import apiKey from "./config.js";


const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const submit = document.getElementById("submit");
const weatherPLace = document.getElementById("weatherPlace");


submit.addEventListener('click', function () {
  let place = weatherPLace.value;

  fetch(`https://api.unsplash.com/photos/?client_id=` + apiKey.imageKey)
  .then(response => response.json())
  .then(image => {
    console.log(image[0].urls.raw);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&units=metric&appid=` + apiKey.weatherKey)
    .then(response => response.json())
    .then(data => {
     
      let everyDay = [];
      for (let i = 0; i < 5; i++) {
        let day = new Date().getDay();
        everyDay.push(weekDay[(day + i) % 7]);
      }
      let everyHour = [];
      for (let i = 0; i < 24; i++) {
        let Hour = new Date().getHours();
        everyHour.push(hours[(Hour + i) % 24]);
      }
      console.log(data);
      chart(data, everyDay, everyHour);
      cardInfo(data, image);
      addCard(data.list[0], "card", everyDay[0]);
      addCard(data.list[8], "card", everyDay[1]);
      addCard(data.list[16], "card", everyDay[2]);
      addCard(data.list[24], "card", everyDay[3]);
      addCard(data.list[32], "card", everyDay[4]);
    })
  })

 

  const chart = (data, everyDay, everyHour) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [everyDay[0], everyDay[1], everyDay[2], everyDay[3], everyDay[4]],
        datasets: [{
          label: 'Temperature',
          data: [data.list[0].main.temp, data.list[8].main.temp, data.list[16].main.temp, data.list[24].main.temp, data.list[32].main.temp, ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }

    });
  }

  const cardInfo = (data, image) => {
    const main = document.querySelector("main");
    const section = document.createElement("section");
    main.appendChild(section);
    const infoCard = document.createElement("div");
    infoCard.className = "infoCard";
    section.appendChild(infoCard);
    const locationH1 = document.createElement("h1");
    locationH1.innerText = data.city.name;
    infoCard.appendChild(locationH1);
    const city = document.createElement("p");
    city.innerHTML = "<span>Country: </span>"+data.city.country;
    infoCard.appendChild(city);
    const cityImage = document.createElement("div");
    cityImage.className = "cityImage";
    cityImage.innerHTML = `<img src=${image[0].urls.raw} alt="pic" style="width:200px;height:200px">`;
    infoCard.append(cityImage);

  }

  const addCard = (data, style, weekDay) => {
    const main = document.querySelector("main");
    const section = document.createElement("section");
    main.appendChild(section);

    const day1 = document.createElement("div");
    day1.className = style;
    section.appendChild(day1);

    const mondayH1 = document.createElement("h1");
    mondayH1.innerText = weekDay;
    day1.appendChild(mondayH1);

    const dateParagraph = document.createElement("p");
    day1.appendChild(dateParagraph);
    dateParagraph.innerHTML = data.dt_txt;

    const tempH3 = document.createElement("h3");
    tempH3.innerText = "Temperature:";
    day1.appendChild(tempH3);

    const temperature = document.createElement("div");
    temperature.className = "temperature";
    day1.append(temperature);

    const tempParagraph = document.createElement("p");
    day1.append(tempParagraph);
    tempParagraph.innerHTML = data.main.temp + "<span>&#8451;</span>";

    const weatherH3 = document.createElement("h3");
    weatherH3.innerText = "Weather:";
    day1.append(weatherH3);

    const weather = document.createElement("div");
    weather.className = "weather";
    day1.append(weather);

    const weatherParagraph = document.createElement("p");
    weatherParagraph.innerHTML = data.weather[0].main;
    day1.append(weatherParagraph);

    const windH3 = document.createElement("h3");
    windH3.innerText = "Wind:";
    day1.append(windH3);

    const wind = document.createElement("div");
    wind.className = "wind";
    day1.append(wind);

    const windParagraph = document.createElement("p");
    windParagraph.innerHTML = data.wind.speed + "<span>MpS</span>";
    day1.append(windParagraph);
  }

})