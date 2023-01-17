var fiveDayForecastFirstEl = $('#fiveDay-ForecastFirst');
var fiveDayForecastSecondEl = $('#fiveDay-ForecastSecond');
var currentDayWeatherEl = $('#currentDayForecast');
var weatherFormEl = $('#search-city');


for (var i = 0; i < localStorage.length; i++) {
  $('body').append(localStorage.getItem(localStorage.key(i)));

    }


function handleFormSubmit(event) {
  event.preventDefault();
  var citySearch = $('input[name="city-input"]').val();
  console.log(citySearch);

  localStorage.setItem(citySearch, citySearch);

var fetchURLDay = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=5225e5b4c0f8a976d70f50d5260b61e9"

fetch(fetchURLDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Current day weather \n----------');
      console.log(data);

      
          var currentDayTemp = data.main.temp;
          var currentDayCity = data.name;
          var currentDayIcon = data.clouds.all;
          var currentDayHumidity = data.main.humidity;
          var currentDayWind = data.wind.speed;
          console.log("this is current day temp: " + currentDayTemp);
          currentDayWeatherEl.append('<li>' + "Location: " + currentDayCity + '</li>');
          // currentDayWeatherEl.append('<li>' + currentDayIcon + '</li>');
          currentDayWeatherEl.append('<li>' + "Current temp: " + currentDayTemp + "F" + '</li>');
          currentDayWeatherEl.append('<li>' + "Current humidity: " + currentDayHumidity + '</li>');
          currentDayWeatherEl.append('<li>' + "Wind Speeds: " + currentDayWind + '</li>');

      


     

    });

  var fetchURLWeek = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=5225e5b4c0f8a976d70f50d5260b61e9"


  fetch(fetchURLWeek)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('5-day forcast \n----------');
      console.log(data);

      for (var i = 0; i < data.list.length; i++) {
        
        var currentTime = data.list[i].dt_txt;
        var currentTemp = data.list[i].main.temp;
        var currentHumidity = data.list[i].main.humidity;
        var currentWindSpeed = data.list[i].wind.speed;
        if (currentTime.endsWith("15:00:00")) {
          console.log(currentTime)
          console.log("Temp: " + currentTemp)
          console.log("Humidity: " + currentHumidity)
          console.log("Wind Speed: " + currentWindSpeed)
          console.log(data.list[i])
          var forecastCard = document.createElement('div');
          var tempEl = document.createElement('h3');
          var humEl = document.createElement('p');
          var windEl = document.createElement('p');
          forecastCard.classList.add('border', 'p-5');
          tempEl.textContent = "Temp: " + currentTemp;
          humEl.textContent = "Humidity: " + currentHumidity
          windEl.textContent = "Wind Speed: " + currentWindSpeed
          forecastCard.append(tempEl, humEl, windEl);

      
          fiveDayForecastFirstEl.append(forecastCard);
          // fiveDayForecastSecondEl.append('<li>' + "Humidity: " + currentHumidity + '</li>');
          // fiveDayForecastEl.append('<li>' + "Windspeed: " + currentWindSpeed + '</li>');
          
        }


       
      }



     

    });

    



};


addEventListener('submit', handleFormSubmit);







