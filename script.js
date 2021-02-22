var apiKey = "48a5cb92f8bcd3cfcc83073fb0090b83";
var city = $("#searchTerm").val();
var date = new Date();

var currentConditions =
  "https://api.openweathermap.org/data/2.5/weather?appid=";
var fiveDay =
  "https://api.openweathermap.org/data/2.5/forecast?4e5dbe7db2b5e9c8b47fa40b691443d5q={city name},{country code}";
var uvIndex =
  "https://api.openweathermap.org/data/2.5/uvi?appid={appid}&lat={lat}&lon={lon}";
var searchedArr = JSON.parse(localStorage.getItem("searchedItems")) || [];

$("#searchTerm").keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $("#searchBtn").click();
  }
});
$("#searchBtn").on("click", function () {
  $("#forecastH5").addClass("show");

  city = $("#searchTerm").val();

  $("#searchTerm").val("");

  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    console.log(response.name);
    console.log(response.weather[0].icon);

    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    console.log(Math.floor(tempF));

    console.log(response.main.humidity);

    console.log(response.wind.speed);

    getCurrentConditions(response);
    getCurrentForecast(response);
    makeList();
  });
});

$(document).ready(function () {
  $("#search-input").on("click", function (event) {
    var userInput = $("#city-search").val();
    console.log(userInput);
    getWeather(userInput);
  });
});

function makeList() {
  const listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}

function getWeather(cityName) {
  var apiCall = "";

  if (cityName !== "") {
    apiCall = currentConditions + apiKey + "&q=" + cityName;
  } else {
    apiCall = currentConditions + apiKey + "&q=" + city;
  }

  $.ajax({
    url: apiCall,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var currentTemp = response.main.temp;
    currentTemp = (currentTemp - 273.15) * 1.8 + 32;
    currentTemp = Math.floor(currentTemp);
    city = response.name;
    $("#current-weather").append("<div>" + currentTemp + "</div>");
    $("#current-weather").append("<div>" + city + "</div>");
    fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    $.ajax({
      url: fiveDay,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var averageTemp = 0;
      var previousdate = "";
      var count = 0;
      var results = 0;
      previousdate = moment().format("MM/DD");
      for (let index = 0; index < response.list.length; index++) {
        var currentDate = moment(response.list[index].dt, "X").format("MM/DD");
        var temp = response.list[index].main.temp;
        temp = (temp - 273.15) * 1.8 + 32;
        temp = Math.floor(temp);
        console.log(currentDate);
        console.log(temp);

        if (previousdate === currentDate) {
          averageTemp = averageTemp + temp;
          count++;
          previousdate = currentDate;
        } else {
          results = averageTemp / count;
          results = Math.floor(results);
          console.log("results:", results);
          var card = $("<div class = 'card col-sm-2'>");

          var div1 = $("<div class= 'card-header'>");
          div1.append("Date" + "" + currentDate);
          card.append(div1);

          var div2 = $("<div class= 'card-body'>");
          div2.append("Average Temperature:" + results);
          card.append(div2);

          $("#five-day").append(card);

          count = 0;
          averageTemp = 0;
          previousdate = currentDate;
        }
      }
    });
  });
}
