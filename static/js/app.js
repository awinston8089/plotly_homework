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
        var sampleArray = subsamples.filter(sampleObject => sampleObject.id == sampleid);
        var sampleResult = sampleArray[0];
        console.log(sampleResult);
        console.log(sampleArray);
        var ids = sampleResult.otu_ids
        var samplevals = sampleResult.sample_values
        var samplabels = sampleResult.otu_lables
        
})}

    //Function build bar chart


    //Function to build bubble chart
    // Plotly.newPlot("bar")
    //Bonus:  Freq. guage




//Function for initialization (build metadata and all of the charts)


//Call init function
// buildMetaData();