var city = $("#searchTerm").val();
var apiKey = "&appid=48a5cb92f8bcd3cfcc83073fb0090b83";

For (i=0; i < 4; i++ ) {

  var today = new Date();
  var dd = today.getDate()+1;
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();

    if(dd<10) {
            
    dd='0'+dd;} 
              

    if(mm<10) {

    mm='0'+mm;}
 
today = mm+'-'+dd+'-'+yyyy;
};
console.log(today);



function getItems() {
  var city = JSON.parse(localStorage.getItem("search"));
  if (city == null) {
    search = city;
  };
  for (i = 0, i < search.length; i++;) {
    if (i == 10) {
      break;
    }
    
  }
  var city;
  getItems();


  console.log(city);

  

