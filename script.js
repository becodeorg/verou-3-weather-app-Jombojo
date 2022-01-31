import weatherKey from "./config.js"


const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const submitbutton = document.querySelector('#submitbutton');
submitbutton.addEventListener('click', () => {
  let api = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let city;
let units = '&units=metric&appid=';
  let cityName = document.getElementById("citySearch");
  city = cityName.value;
  console.log(city);
  const fullApi = api+city+units+weatherKey.key;
  fetch(fullApi)
    .then(response => response.json())
    .then(data => {
      let everyDay = [];
      for (let i = 0; i < 5; i++) {
        let day = new Date().getDay();
        everyDay.push(weekDay[(day + i) % 7]);
      }
      let everyHour = [];
      console.log(data);
      
      cardInfo(data);
      addCard(data.list[0], "card", everyDay[0]);
      addCard(data.list[8], "card", everyDay[1]);
      addCard(data.list[16], "card", everyDay[2]);
      addCard(data.list[24], "card", everyDay[3]);
      addCard(data.list[32], "card", everyDay[4]);
    })
    
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
        city.innerText ="Country: " + data.city.country;
        infoCard.appendChild(city);
        const cityImage = document.createElement("div");
        cityImage.className = "cityImage";
        cityImage.innerHTML = `<img src= "weather-8.jpg" alt="pic" style="width:200px;height:200px">`;
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
// const cardContainer = document.createElement("section");
// cardContainer.className = "card-container";
// body.appendchild(cardContainer);
// const 
// for (let i = 0; i < 6; i++) {
//   const cardMaker = weather[i]
//   console.log(weather[i])
// }



