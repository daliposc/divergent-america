// draw histogram in sidebar
google.charts.load('current', {'packages':['corechart']});

function drawScatterplot(dataArr) {
    var data = google.visualization.arrayToDataTable(dataArr);
    
    var options = {
        title: 'Whiteness vs Poverty Rates',
        hAxis: {title: '% white', minValue: 0, maxValue: 100},
        vAxis: {title: '% impoverished', minValue: 0, maxValue: 100},
        legend: 'none',
        colors: ['#114643'],
        pointsize: 3,
        bacgroundcolorfill: "#F9FD9C"
    };
    
    var scatterplot = new google.visualization.ScatterChart(document.getElementById('scatterplot'));

    //remove errors
    google.visualization.events.addListener(scatterplot, 'error', function (googleError) {
        google.visualization.errors.removeError(googleError.id);
    });
    
    scatterplot.draw(data, options);    
}

function drawPieChart(dataArr) {
    var data = google.visualization.arrayToDataTable(dataArr);

    var options = {
      title: 'Race Compositon',

        slices: {
            0: { color: '#d55e00' },
            1: { color: '#0072b2' },
            2: { color: '#f0e442' },
            3: { color: '#009e73' },
        }
    };

    var piechart = new google.visualization.PieChart(document.getElementById('piechart'));

    piechart.draw(data, options);
}

function drawScatterplot2(dataArr) {
    var data = google.visualization.arrayToDataTable(dataArr);

    var options = {
        title: 'Income vs People Uninsured',
        hAxis: {title: 'Mean Household Income', minValue: 0, maxValue: 100000},
        vAxis: {title: 'People Uninsured', minValue: 0, maxValue: 100000},
        legend: 'none',
        colors: ['#114643'],
        pointsize: 3,
        backgroundcolor: 'rgba(255, 255, 255, 0.2)'
    };

    var scatterplot2 = new google.visualization.ScatterChart(document.getElementById('scatterplot2'));

    // remove error message
    google.visualization.events.addListener(scatterplot2, 'error', function (googleError) {
        google.visualization.errors.removeError(googleError.id);
    });
    
    scatterplot2.draw(data, options);
}

function drawScatterplot3(dataArr) {
    var data = google.visualization.arrayToDataTable(dataArr);

    var options = {
        title: 'Income vs % People With Degrees',
        hAxis: {title: 'Mean Household Income', minValue: 0, maxValue: 100000},
        vAxis: {title: 'People Uninsured', minValue: 0, maxValue: 100},
        legend: 'none',
        colors: ['#114643'],
        pointsize: 3,
    };

    var scatterplot3 = new google.visualization.ScatterChart(document.getElementById('scatterplot3'));
    
    // remove error message
    google.visualization.events.addListener(scatterplot3, 'error', function (googleError) {
        google.visualization.errors.removeError(googleError.id);
    });
    
    scatterplot3.draw(data, options);
}
    
