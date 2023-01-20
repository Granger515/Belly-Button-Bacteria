//Sorts the cities by population growth and reverses the order of that sort
var sortedCities = cityGrowths.sort((a,b) =>
a.Increase_from_2016 - b.Increase_from_2016).reverse(); 

//Takes the first five entries of the previous array and puts them in a new array
var topFiveCities = sortedCities.slice(0,5);

//Creates two new arrays of city names and and top five growths in terms of absolute numbers
//the parstInt method converts the string number to an integer
var topFiveCityNames = cityGrowths.map(city => city.City);
var topFiveCityGrowths = cityGrowths.map(city => parseInt(city.Increase_from_2016));

//renders the above arrays into a graphic using Plotly
var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
  var data = [trace];
  var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: {title: "City" },
    yaxis: {title: "Population Growth, 2016-2017"}
  };
  Plotly.newPlot("bar-plot", data, layout);