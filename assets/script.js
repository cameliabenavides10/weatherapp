var fiveDayForecastFirstEl = $('#fiveDay-ForecastFirst');
var fiveDayForecastSecondEl = $('#fiveDay-ForecastSecond');
var currentDayWeatherEl = $('#currentDayForecast');
var pastSearchedCityEl = $('#stored-City');




function handleFormSubmit(event) {

  if ($('input[name="city-input"]').val() ===""){
    alert("please enter a valid city.");
}
  else{
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

      var currentDayTemp = data.main.temp;
      var currentDayCity = data.name;
      var currentDayHumidity = data.main.humidity;
      var currentDayWind = data.wind.speed;
      var weatherImgEl = document.createElement('img');
      weatherImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");

      currentDayWeatherEl.append(weatherImgEl);
      currentDayWeatherEl.append('<li>' + "<b>" + "Location: " + currentDayCity + '</li>');
      currentDayWeatherEl.append('<li>' + "<b>" + "Current temp: " + currentDayTemp + "°F" + '</li>');
      currentDayWeatherEl.append('<li>' + "<b>" + "Current humidity: " + currentDayHumidity + "%" + '</li>');
      currentDayWeatherEl.append('<li>' + "<b>" + "Wind Speeds: " + currentDayWind + '</li>');
      console.log("this is current day temp: " + currentDayTemp);

    });

  var fetchURLWeek = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=5225e5b4c0f8a976d70f50d5260b61e9"
  fetch(fetchURLWeek)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     

      for (var i = 0; i < data.list.length; i++) {

        var currentTime = data.list[i].dt_txt;
        var currentTemp = data.list[i].main.temp;
        var currentHumidity = data.list[i].main.humidity;
        var currentWindSpeed = data.list[i].wind.speed;
        var currentWeatherIcon = data.list[i].weather[0].icon;
        var currentWeatherDate = data.list[i].dt_txt;
        if (currentTime.endsWith("15:00:00")) {
          var forecastImgEl = document.createElement("img");
          var forecastCard = document.createElement('div');
          var dateEl = document.createElement("h4");
          var tempEl = document.createElement('h5');
          var humEl = document.createElement('h6');
          var windEl = document.createElement('h6');
          forecastCard.classList.add('border', 'p-5');
          forecastCard.setAttribute("class", "backGroundBlue")
          forecastImgEl.setAttribute("src", "https://openweathermap.org/img/wn/" + currentWeatherIcon + ".png");
          dateEl.textContent = moment(currentWeatherDate).format("MMM Do YY");
          tempEl.textContent = "Temp: " + currentTemp + " °F";
          humEl.textContent = "Humidity: " + currentHumidity + "%";
          windEl.textContent = "Wind Speed: " + currentWindSpeed
          forecastCard.append(forecastImgEl);
          forecastCard.append(dateEl, tempEl, humEl, windEl);
          fiveDayForecastFirstEl.append(forecastCard);

        }

      }

    });
  }
};


for (var i = 0; i < localStorage.length; i++) {
  var listOfCities = localStorage.getItem(localStorage.key(i));
  var localStorageButton = $("<button>");
  localStorageButton.attr("class", "btn btn-outline-secondary d-grid gap-2 col-6 mx-auto w-100");
  localStorageButton.attr("type", "text");
  localStorageButton.attr("value", listOfCities);
  localStorageButton.text(localStorage.getItem(localStorage.key(i)));
  $('#stored-City').append(localStorageButton);
  console.log(document.getElementById("#stored-City"));
}


addEventListener('submit', handleFormSubmit);







