//13.3.2

//Obtains the data from the json file
//The then90 method forces the code to wait to complete the first part to run next part
d3.json("samples.json").then(function(data){
    console.log(data);
});

//extracts the data with an id of wfreq from the json file then sorts it largest to smallest and deletes all null values and prints it to the console
d3.json("samples.json").then(function(data){
    wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
    filteredWfreq = wfreq.filter(element => element !=
null);
    console.log(filteredWfreq);
});