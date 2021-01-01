//Selecting reference to the dropdown menu
var subjectid = d3.select("#selDataset")
//Reading the json file

d3.json("data/samples.json").then((data) => {
    console.log(data);
data.names.forEach(element => {
    subjectid.append("option").text(element).property("value")

    
});
optionChanged(data.names[0])
})


//Function to build Metadata

function buildMetaData(sample){
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;

        //filter data to get the first object
        var sampleArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var sampleResult = sampleArray[0];
        console.log(sampleResult);
        console.log(sampleArray);
        //Selecting reference to the demographic info
        var Panel = d3.select("#sample-metadata");
        //Clearing the list
        Panel.html("")
        //Appending the demographic info box
        Object.entries(sampleResult).forEach(([key, value])=>{
            Panel.append("p").text(`${key}:${value}`)
        })
    });
}
function optionChanged(subjectid){
    buildMetaData(subjectid)
    chart(subjectid)
}
//Function to build charts
function chart(sampleid){
    d3.json("data/samples.json").then((data) => {
        var subsamples = data.samples;

        //filter data to get the first object
        var samplefiltered = subsamples.filter(sampleObject => sampleObject.id == sampleid);
        var samplefirst = samplefiltered[0];
        console.log(samplefiltered);
        console.log(samplefirst);
        var ids = samplefirst.otu_ids.map(ids => `otuid ${ids}`).slice(0,10).reverse();
        var samplevals = samplefirst.sample_values.slice(0,10).reverse();
        var samplabels = samplefirst.otu_lables;
        // var labels = samplabels.slice(0,10).reverse();
        var toplabels = samplefirst.otu_labels.slice(0, 10).reverse();
        console.log(samplefirst.otu_labels)
        var trace = [{
            x: samplevals,
            y: ids,
            name: "Belly Button Bar Chart",
            text: toplabels,
            type: "bar",
            orientation: "h"
        }]
        // render the bar plot in the bar div tag
        Plotly.newPlot("bar",trace)

        // creating trace for bubble chart
        var bubbletrace = [{
            x: samplefirst.otu_ids,
            y: samplefirst.sample_values,
            text: samplabels,
            mode: "markers",
            marker: {
                color: samplefirst.otu_ids, size: samplefirst.sample_values
            }
        }]
        var bubblelayout = {
            title: "Belly Button Bubble Chart",
            xaxis: {title:  "Sample Values"},
            yaxis: {title:  "OTU IDS"},
            width: 1200, height: 700

        }
        // render the bar plot in the bar div tag
        Plotly.newPlot("bubble",bubbletrace,bubblelayout)
})}

    





    //Function to build bubble chart
    // Plotly.newPlot("bar")
    //Bonus:  Freq. guage




//Function for initialization (build metadata and all of the charts)


//Call init function
// buildMetaData();