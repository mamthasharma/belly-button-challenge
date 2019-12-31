
var url = "./samples.json";
let data = [];
d3.json(url).then(function(d) {
  data = d;
  console.log(data);
  init();
  
});
function optionChanged(newSample) {
  createChart(newSample);
  demoInfo(newSample);
  // gaugeChart(newSample);
}
function demoInfo(key) {
  var panel = d3.select("#sample-metadata");
  panel.html("");
  const metaData = data.metadata.filter(item => item.id == key)[0];
   Object.entries(metaData).forEach(([key, value]) => {
    panel
      .append("p")
      .html(`${key} : ${value}`)
      .append("br");
  });
}
function createChart(sample_val) {
  var samples = data.samples;
  var filterArray = samples.filter(i => i.id == sample_val);
  var sample_index = filterArray[0];
  var otu_ids = sample_index.otu_ids;
  var otu_labels = sample_index.otu_labels;
  var sample_values = sample_index.sample_values;
  
  var bartrace = {
    margin: { l: 150, t: 40 },
  };
  var y_baraxis = otu_ids
    .slice(0, 10)
    .map(j => `OTU ${j}`)
    .reverse();
  var barChartdata = [
    {
      y: y_baraxis,
      x: sample_values.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    },
  ];
  Plotly.newPlot("bar", barChartdata, bartrace);
  var bubleLayout = {
    margin: {
      t: 0,
    },
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
  };
  var bubleChartdata = [
    {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth",
      },
    },
  ];
  Plotly.newPlot("bubble", bubleChartdata, bubleLayout);
}

function init() {
  var dropDownselector = d3.select("#selDataset");
  var samples_name = data.names;
  var samples_indi = data.metadata;
  samples_name.forEach(sample => {
    dropDownselector
      .append("option")
      .text(sample)
      .property("value", sample);
  });
  var sample1 = samples_name[0];
  createChart(sample1);
  demoInfo(sample1);
}