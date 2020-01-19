google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function createTable(item : string){
  // json.parse returns a json object from some string
  var data = JSON.parse(item);
  var table = new google.visualization.DataTable();
  table.addColumn('number', "percentWaste");

  for (let keys in data){
    table.addRows(data[keys]["numeric data"]);
  }
  var options = {'title': 'Total Waste Breakdown'}
  var visual = new google.visualization.PieChart(document.getElementById('chart_div'));
  visual.draw(data, options);
}
