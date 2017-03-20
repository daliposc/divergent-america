// draw histogram in sidebar
google.charts.load('current', {'packages':['corechart']});

function drawScatterplot(dataArr) {
    var data = google.visualization.arrayToDataTable(dataArr);
    
    var options = {
        title: 'Whiteness vs Poverty Rates',
        hAxis: {title: '% white', minValue: 0, maxValue: 100},
        vAxis: {title: '% impoverished', minValue: 0, maxValue: 100},
        legend: 'none'
    }
    
    var scatterplot = new google.visualization.ScatterChart(document.getElementById('scatterplot'));
    
    scatterplot.draw(data, options);    
}

function drawPieChart(dataArr) {
    var data = google.visualization.arrayToDataTable(dataArr);

    var options = {
      title: 'Race Compositon'
    };

    var piechart = new google.visualization.PieChart(document.getElementById('piechart'));

    piechart.draw(data, options);
}

