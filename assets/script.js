var fiveDayForecastEl = $('#fiveDay-Forecast');
var weatherFormEl = $('#search-city');



function handleFormSubmit(event) {
  event.preventDefault();
  var citySearch = $('input[name="city-input"]').val();
  console.log(citySearch);



var fetchURLDay = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=5225e5b4c0f8a976d70f50d5260b61e9"

fetch(fetchURLDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Twitter Public Members: Raw data \n----------');
      console.log(data);


    });

  var fetchURLWeek = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=5225e5b4c0f8a976d70f50d5260b61e9"


  fetch(fetchURLWeek)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Twitter Public Members: Raw data \n----------');
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
          fiveDayForecastEl.append('<li>' + currentTemp + '</li>');

        }



      
      }



     

    });

    



};


addEventListener('submit', handleFormSubmit);







