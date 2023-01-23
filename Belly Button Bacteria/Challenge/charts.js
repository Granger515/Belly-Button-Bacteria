function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Deliverable 1: 1. Create the buildChart function.
function buildCharts(sample) {

  // Deliverable 1: 2. Use d3.json to load the samples.json file 
  
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Deliverable 1: 3. Create a variable that holds the samples array. 

    var samplesArray = data.samples;
    
    console.log('samples', samplesArray)

    // Deliverable 1: 4. Create a variable that filters the samples for the object with the desired sample number.

    //Gets the data in samples obj for the study participant in the pulldown menu with the appropriate id
    var bob = (samplesArray.filter(x => x["id"] === sample));
    
    // Deliverable 1: 5. Create a variable that holds the first sample in the array.
    //taking the json out of the array in the id of interest
    var bobDict = bob[0];
    
    // Deliverable 1: 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    //creating variables for each data array from bobDict
    var otu_ids = bobDict.otu_ids;
    var otu_labels = bobDict.otu_labels;
    var sample_values = bobDict.sample_values;

    console.log(bobDict);

    // console.log("otu_ids", otu_ids);
    // console.log("otu_labels", otu_labels);
    // console.log("sample_values", sample_values);

    var otu_idsSlice = otu_ids.slice(0,10).reverse();
    var otu_labelsSlice = otu_labels.slice(0,10).reverse();
    var sample_valuesSlice = sample_values.slice(0,10).reverse();
    
    console.log("otu_idsSlice", otu_idsSlice);
    console.log("otu_labelsSlice", otu_labelsSlice);
    console.log("sample_valuesSlice", sample_valuesSlice);

    // Deliverable 1: 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order 
    // so the otu_ids with the most bacteria are last. 
    var yticks = otu_idsSlice.map(x=>`otu ${x}`);
    console.log("yticks", yticks)

    // Deliverable 1: 8. Create the trace for the bar chart. 
    var barData = {
      type: "bar",
      x: sample_valuesSlice,
      y: yticks,
      orientation: "h"
  };

    // Deliverable 1: 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    };

    // Deliverable 1: 10. Use Plotly to plot the data with the layout. 

    Plotly.newPlot("bar", [barData], barLayout);

    // Deliverable 2: 1. Create the trace for the bubble chart.
    

    var bubbleData = {
      mode: "markers",
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: "Earth"
      }
  };

    // Deliverable 2: 2. Create the layout for the bubble chart.

    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      hovermode: "x unified"
    };


    // Deliverable 2: 3. Use Plotly to plot the data with the layout.
    
    Plotly.newPlot("bubble", [bubbleData], bubbleLayout);



    // Deliverable 3: 1. Create a variable that filters the metadata array for the object with the desired sample number.

    var metaArray = data.metadata;

    console.log("metaArray", metaArray)
    
    var notbob = (metaArray.filter(y => y["id"] === sample));

    console.log("notbob", notbob)

    // Deliverable 3: 2. Create a variable that holds the first sample in the metadata array.


    // Deliverable 3: 3. Create a variable that holds the washing frequency.


    // Deliverable 3: 4. Create the trace for the gauge chart.

    // var data = [
    //   {
    //     domain: { x: [0, 1], y: [0, 1] },
    //     value: 270,
    //     title: { text: "Speed" },
    //     type: "indicator",
    //     mode: "gauge+number"
    //   }
    // ];
    
    // Deliverable 3: 5. Create the layout for the gauge chart.

    // Deliverable 3: 6. Use Plotly to plot the gauge data and layout.

  });
}
