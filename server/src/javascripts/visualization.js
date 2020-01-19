async function createTable(filename){
  google.charts.load('current', {'packages':['corechart']});
/*   google.charts.setOnLoadCallback(createTable); */

  let item = await sendXMLRequest(`imagedata?id=${filename}`, null, method='GET');
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
