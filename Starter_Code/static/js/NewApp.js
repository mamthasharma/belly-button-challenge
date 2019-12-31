var url = "./samples.json";
d3.json(url).then(function(data){
    console.log(data.names[1]);
    init();
});



function buildMetadata(data){
    var url = "./samples.json";
    d3.json(url).then(function(data) {
    console.log(data);
    var sample_metadata = d3.select("#sample-metadata");
    sample_metadata.html("");
    
    Object.defineProperties(data).forEach(function([key,value]) {
        var row = sample_metadata.append("p");
        row.text(`${key}:${value}`);
    init();           
    });
}
    )};
function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    var url = "./samples.json";
    d3.json(url).then(function(data) {

          // @TODO: Build a Bubble Chart using the sample data
        var x_values = data.otu_ids;
        var y_values = data.sample_values;
        var m_size = data.sample_values;
        var m_colors = data.otu_ids; 
        var t_values = data.otu_labels;
    
        var trace1 = {
        x: x_values,
        y: y_values,
        text: t_values,
        mode: 'markers',
        marker: {
            color: m_colors,
            size: m_size
        } 
        };
        
        var data = [trace1];
      
        var layout = {
        xaxis: { title: "OTU ID"},
        };
        Plotly.newPlot('bubble', data, layout);
   

        // @TODO: Build a Pie Chart
        d3.json(url).then(function(data) {  
        var pie_values = data.sample_values.slice(0,10);
          var pie_labels = data.otu_ids.slice(0,10);
          var pie_hover = data.otu_labels.slice(0,10);
    
          var data = [{
            values: pie_values,
            labels: pie_labels,
            hovertext: pie_hover,
            type: 'pie'
          }];
    
          Plotly.newPlot('pie', data);
    
        });
      });   
    }
    function init() {
        // Grab a reference to the dropdown select element
        d3.json(url).then(function(data){
        var selector = d3.select("#selDataset");
        var sampleNames= data.names;
        var samples_index = data.metadata;
        // Use the list of sample names to populate the select options
        // d3.json(data.names).then((sampleNames) => {
        //     sampleNames.forEach((data) => {
        //       selector
        //         .append("option")
        //         .text(data)
        //         .property("value", data);
        //     });
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
      
      function optionChanged(newSample) {
        // Fetch new data each time a new sample is selected
        buildCharts(newSample);
        buildMetadata(newSample);
      }
      
      // Initialize the dashboard

    //   init();



    var data = [
        {
          type: "indicator",
          value: 200,
          delta: { reference: 160 },
          gauge: { axis: { visible: false, range: [0, 250] } },
          domain: { row: 0, column: 0 }
        }
    ];
          var layout = {
        width: 600,
        height: 400,
        margin: { t: 25, b: 25, l: 25, r: 25 },
        grid: { rows: 2, columns: 2, pattern: "independent" },
        template: {
          data: {
            indicator: [
              {
                title: { text: "Speed" },
                mode: "number+delta+gauge",
                delta: { reference: 90 }
              }
            ]
          }
        }
      };
      
      Plotly.newPlot('myDiv', data, layout);