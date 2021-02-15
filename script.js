var city = $("#searchTerm").val();
var apiKey = "&appid=48a5cb92f8bcd3cfcc83073fb0090b83";

var date = new Date();

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

function makeList() {
  const listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}

function getCurrentConditions(response) {
  let tempF = (response.main.temp - 273.15) * 1.8 + 32;
  tempF = Math.floor(tempF);

  $("#currentCity").empty();

  const card = $("<div>").addClass("card");
  const cardBody = $("<div>").addClass("card-body");
  const city = $("<h4>").addClass("card-title").text(response.name);
  const cityDate = $("<h4>")
    .addClass("card-title")
    .text(date.toLocaleDateString("en-US"));
  const temperature = $("<p>")
    .addClass("card-text current-temp")
    .text("Temperature: " + tempF + " °F");
  const humidity = $("<p>")
    .addClass("card-text current-humidity")
    .text("Humidity: " + response.main.humidity + "%");
  const wind = $("<p>")
    .addClass("card-text current-wind")
    .text("Wind Speed: " + response.wind.speed + " MPH");
  const image = $("<img>").attr(
    "src",
    "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
  );

  city.append(cityDate, image);
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}

function getCurrentForecast() {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response.dt);
    $("#forecast").empty();

    let results = response.list;
    console.log(results);

    for (let i = 0; i < results.length; i++) {
      let day = Number(results[i].dt_txt.split("-")[2].split(" ")[0]);
      let hour = results[i].dt_txt.split("-")[2].split(" ")[1];
      console.log(day);
      console.log(hour);

      if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
        let temp = (results[i].main.temp - 273.15) * 1.8 + 32;
        let tempF = Math.floor(temp);

        const card = $("<div>").addClass(
          "card col-md-2 ml-4 bg-primary text-white"
        );
        const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
        const cityDate = $("<h4>")
          .addClass("card-title")
          .text(date.toLocaleDateString("en-US"));
        const temperature = $("<p>")
          .addClass("card-text forecastTemp")
          .text("Temperature: " + tempF + " °F");
        const humidity = $("<p>")
          .addClass("card-text forecastHumidity")
          .text("Humidity: " + results[i].main.humidity + "%");

        const image = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            results[i].weather[0].icon +
            ".png"
        );

        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);
      }
    }
  });
}