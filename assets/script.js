var jumbotron = $(".jumbotron");
var cityList = $("#list-group");
var cardArea = document.getElementById("cardContainer");
cityList.on("click", getCityName);
console.log(jumbotron);
var url =
  "https:/api.openweathermap.org/data/2.5/weather?units=imperial&appid=2c59ec07f638941e1e698a2dfc34b3f6&q=";
var citySearchBar = document.getElementById("citySearch");
function searchCity(cityString) {
  fetch(url + cityString)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // data.list[0];
      buildJumbotron(data, cityString)
      uvIndex(data.coord.lat, data.coord.lon)
      getForecast(cityString);
    });
}
function uvIndex(lat,lon){
var uvUrl =
"https://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid=2c59ec07f638941e1e698a2dfc34b3f6&units=imperial";
  fetch(uvUrl)
  .then((response) => response.json())
  .then((data)=>{
    console.log(data);
    var displayUv = `<button class="button">UV Index: ${data.value}</button>`;
    jumbotron.append(displayUv)
  })
}

var searchForm = $("#searchForm");
searchForm.on("submit", function (event) {
  event.preventDefault();
  var text = citySearchBar.value;
  searchCity(text);
  submitCity(text);
  showHistory()
});
function showHistory(){
cityList.empty() 
  // cityList.append(list);
  var localHistoryArray = JSON.parse(localStorage.getItem('Cities'))
  if (localHistoryArray !== null) {
    for (let index = 0; index < localHistoryArray.length; index++) {
      const element = localHistoryArray[index];
      var list = $(`<li><button>${element}</button><li>`);
      cityList.append(list)
    }
    
  }
}
showHistory()
function buildJumbotron(todaysWeather, cityName) {
  jumbotron.html(`
    <h2>${cityName}</h2>
    <p>Temperature:${todaysWeather.main.temp}</p>
    <p>${todaysWeather.weather[0].description}</p>
    <img src="http://openweathermap.org/img/wn/${todaysWeather.weather[0].icon}@2x.png" />
    <br>`);
}
function buildCards(list) {
  cardArea.innerHTML = ''
  const forecastArray = [list[4],list[12],list[20],list[28],list[36]];
  for (let index = 0; index <forecastArray.length; index++) {
    const element = forecastArray[index];
    var d = new Date(element.dt_txt);
    var n = d.toLocaleDateString();
    cardArea.innerHTML +=`<div class="card">
    <div class="card-body">
      <h5 class="card-title">${n}</h5>
      <p>${element.main.temp}
      <p class="card-text">${element.weather[0].description}</p>
      <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" />
    </div>
  </div>`
    
  }
}
// <h2>Chicago 8/14/2002</h2>
// <p>Temperature:</p>
// <p>Humidity:</p>
// <p>Wind Speed:</p>
// <p>UV Index:</p>

function submitCity(city) {
  // If city feild is empty
  if (city) {
    var pastCitySearch = JSON.parse(localStorage.getItem("Cities")) || [];
    // Get the city info
    pastCitySearch.push(city);
    var mySet = new Set(pastCitySearch)
    var newArray = Array.from(mySet)
    // Save to Local Storage
   
    localStorage.setItem("Cities", JSON.stringify(newArray));
  }
}
function getCityName(event) {
  var cityName = event.target.textContent;
  searchCity(cityName);
}
const getForecast = (cityString) => {
  console.log(cityString);
  var url =
    "https:/api.openweathermap.org/data/2.5/forecast?units=imperial&appid=2c59ec07f638941e1e698a2dfc34b3f6&q=";
  fetch(url + cityString)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      buildCards(data.list)
    });
};
//every 8th item in array
// end of for loop i+=8

if (dt_text.indexOf("15:00:00") !== -1) {
}
