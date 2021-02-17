var city = $("#searchTerm").val();
var apiKey = "&appid=48a5cb92f8bcd3cfcc83073fb0090b83";

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();

if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = mm+'-'+dd+'-'+yyyy;
console.log(today);

var oneDay = new Date;
var oneDD = oneDay.getDate()+1;
var mm = oneDay.getMonth()+1; 
var yyyy = oneDay.getFullYear();
if(oneDD<10) 
{
    oneDD='0'+oneDD;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = mm+'-'+dd+'-'+yyyy;
console.log(oneDay);

function currentWeather() {
  var city = JSON.parse(localStorage.getItem("search"));
  if (city == null) {
    search = city;
  };
  for (i = 0, i < search.length; i++;) {
    if (i == 8) {
      break;
    }
  }

  $("#namecity").text(cityName)
  $("#tempcity").text($currentTemp);
  //console.log(currentWeather);
  console.log(fiveDayForcast);
};