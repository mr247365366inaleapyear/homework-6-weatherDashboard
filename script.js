var city = $("#searchTerm").val();
var apiKey = "&appid=48a5cb92f8bcd3cfcc83073fb0090b83";

var date = new Date();

function getItems() {
  var cities = JSON.parse(localStorage.getItem("search"));
  if (cities == null) {
    search = cities;
  };
  for (i = 0, i < search.length; i++) {
    if (i == 8) {
      break;
    }
  }
};