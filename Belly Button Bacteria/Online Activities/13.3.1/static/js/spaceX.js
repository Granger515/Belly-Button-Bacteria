//13.3.1

//Assigns an object to hold a web address
const url = "https://api.spacexdata.com/v2/launchpads";

//Obtains the data from the url and prints it to the console
//The then90 method forces the code to wait to complete the first part to run next part
d3.json(url).then(receivedData => console.log(receivedData));
