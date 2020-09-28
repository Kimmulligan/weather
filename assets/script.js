var jumbotron = $(".jumbotron")
console.log(jumbotron);
var url =
"https:/api.openweathermap.org/data/2.5/forecast?appid=2c59ec07f638941e1e698a2dfc34b3f6&q=";
var citySearchBar = document.getElementById("citySearch")
  function searchCity(cityString){
    fetch(url + cityString)
    .then((response) => response.json())
    .then((data) => {
    console.log(data);
    data.list[0];
    buildJumbotron(data.list[0], cityString)
    });
  }
  var searchForm = $("#searchForm")
  searchForm.on("submit", function(event){
    event.preventDefault()
    var text = citySearchBar.value
    searchCity(text)
    submitCity(text)
  })
  function buildJumbotron(todaysWeather, cityName){
    jumbotron.html(`
    <h2>${cityName}</h2>
    <p>Temperature:${todaysWeather.main.temp}</p>`)
  }
  function buildCards(list){};
  // <h2>Chicago 8/14/2002</h2>
  // <p>Temperature:</p>
  // <p>Humidity:</p>
  // <p>Wind Speed:</p>
  // <p>UV Index:</p>

  function submitCity(city) {
    // If city feild is empty
    if(city){
      var pastCitySearch =
        JSON.parse(localStorage.getItem("Cities")) || [];
      // Get the city info
     var previousCity = {
        city: city}
      // Save to Local Storage
      pastCitySearch.push(previousCity);
      localStorage.setItem("Cities", JSON.stringify(pastCitySearch));
    }
    }


    //every 8th item in array
 // end of for loop i+=8

