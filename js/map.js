// initialize global variables
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvZzM3MWZpbmFsIiwiYSI6ImNqMGcwMHJ1MjAxejcycXFsbjh3ODV1anAifQ.elLqkIBh8HH_9SJX9wjBrw';
var zoomThreshold = 4;
var selectedLayer = 'nope';
var isCountiesLayer = false;
var quant = ['q1','q2','q3','q4','q5'];
var diverge = ['neg2','neg1','avg','pos1','pos2'];

// initialize map object
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/geog371final/cj0i5q36i00592rlb3bbv8s23?optimize=true',
    zoom: 3.5,
    center: [-98, 38],
    minZoom: 3,
    maxZoom: 10,
    maxBounds: [
        [-191.25, 0],
        [-37.265, 73.77]
    ]
});
});

//add fancy labels to legend
function addLegendLabels(geo) {
    // update legend items
    var lyr = Layers[selectedLayer];
    var quantNum = [];

    // add value labels
    for (var i = 0; i < 5; i++) {
        var val = lyr.legendLabels[geo][i];
        quantNum.push(val);
        document.getElementById(quant[i]).innerHTML = val;
    }
    // add divergence labels
    for (var x = 0; x < 5; x++) {
        var val = (lyr.legendLabels[geo][x] - quantNum[2]).toFixed(1);
        document.getElementById(diverge[x]).innerHTML = val;
    }    
}

// Update legend color ramps
function fillLegend(lyr) {
    // title
    document.getElementById('leg-title').innerHTML = lyr.name;
    
    // draw legend gradient
    var cssBkgrnd =  "linear-gradient(to right,";
    var concatCSS = cssBkgrnd.concat(
        //lyr['legendRamp'].a, ",",
        lyr['legendRamp'].b, ",",
        lyr['legendRamp'].c, ",",
        lyr['legendRamp'].d, ",",
        lyr['legendRamp'].e, ",",
        lyr['legendRamp'].f, ",",
        lyr['legendRamp'].g, ",",
        lyr['legendRamp'].h, ")"
        //lyr['legendRamp'].i, ")"
    );
    document.getElementById('leg-gradient').style.background = concatCSS;
    
    if (map.getZoom() > zoomThreshold) {
        addLegendLabels('county');
        isCountiesLayer = true;
    } else {
        addLegendLabels('state');
        isCountiesLayer = false;
    }
}

// Colors and displays the selected layer
function setLayer(lyrId) {
    selectedLayer = lyrId;
    
    //get layer style options
    var lyr = Layers[selectedLayer];
    
    //set opacity
    map.setPaintProperty('states-layer', 'fill-opacity', 0.7);
    map.setPaintProperty('counties-layer', 'fill-opacity', 0.7);   
    
    // set layer fill style
    lyr['colorRamp'].property = lyr.propertyName;
    var fillColor = lyr['colorRamp'];
    map.setPaintProperty('states-layer', 'fill-color', fillColor);
    map.setPaintProperty('counties-layer', 'fill-color', fillColor);
    
    // button styling, keep halo if selected
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].id == lyrId) {
            document.getElementById(lyrId).className += " activeLyrBtn";
        }
        else if (buttons[i].className == "firstBtn activeLyrBtn" || buttons[i].className == "firstBtn"){
            buttons[i].className = "firstBtn";
        }
        else if (buttons[i].className == "lastBtn activeLyrBtn" || buttons[i].className == "lastBtn") {
            buttons[i].className = "lastBtn";
        }
        else {
            buttons[i].className = "";
        }
    }

    // fill legend contents
    fillLegend(lyr);
};


//Mapload Function time fam bam
map.on('load', function() {    
    // add state layer to map
    map.addLayer({
        'id': 'states-layer',
        'source': {
            'type': 'vector',
            'url': 'mapbox://geog371final.5tkn5wya'
        },
        'source-layer': 'statesDataF-6rqrzf',
        'maxzoom': zoomThreshold,
        'type': 'fill',
        'paint': {'fill-opacity': 0.1}
    }, 'barrier_line-land-line');
    
    // add counties layer to map
    map.addLayer({
        'id': 'counties-layer',
        'source': {
            'type': 'vector',
            'url': 'mapbox://geog371final.7m4n0hyq'
        },
        'source-layer': 'countiesL-c6bnw9',
        'minzoom': zoomThreshold,
        'type': 'fill',
        'paint': {'fill-opacity': 0.1}
    }, 'barrier_line-land-line');
    
    // Filters feature array to unique features, remove duplicates
    function getUniqueFeatures(array, comparatorProperty) {
        var existingFeatureKeys = {};

        var uniqueFeatures = array.filter(function(el) {
            if (existingFeatureKeys[el.properties[comparatorProperty]]) {
                return false;
            } else {
                existingFeatureKeys[el.properties[comparatorProperty]] = true;
                return true;
            }
        });

        return uniqueFeatures;
    }

    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['states-layer','counties-layer'] });
        
        var feature = features[0];
        var lyr = Layers[selectedLayer];

        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML('<h3 style="text-align: center">' + feature.properties.NAME10 + '</h3><h2 style="text-align: center">' + feature.properties[lyr.valueName] + '</h2>')
            .addTo(map);
    });
    
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['states-layer', 'counties-layer'] });
 
        
/*      //tooltop to move with mouse position  
        if (features[0]) {
            var y = e.point.y + 50;
            var x = e.point.x + 300;

            document.getElementById("tooltip").style.top = y + "px";
            document.getElementById("tooltip").style.left = x + "px";
            document.getElementById("tooltip").innerHTML = features[0].properties.NAME10
        }*/
        
        // change mouse pointer
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });
    

    map.on('moveend', function() {
        //get zoom, change label if need be
        var zL = map.getZoom();
        if (zL > zoomThreshold && !(isCountiesLayer) && selectedLayer != 'nope') {
            addLegendLabels('county');
            isCountiesLayer = true;
        } else if (zL < zoomThreshold && isCountiesLayer && selectedLayer != 'nope') {
            addLegendLabels('state');
            isCountiesLayer = false;
        }
        
        /* Data for charts! */
        // Array of all rendered features in viewport
        var features = map.queryRenderedFeatures({layers:['states-layer','counties-layer']});

        if (features) {
            // unique feture for counties based on GEOID
            var renderedFeatures = getUniqueFeatures(features, "GEOID10");
            
            // data arrays for charts
            var renWhitePovHistData = [["white", "impoverished"]];            
            var renIncomeUninsuredData = [["Mean Income", "Uninsured"]];
            var renIncomeDegreeData =[["Mean Income", "Uninsured"]];
            var renLocNatDemoData = [["% White","% Black","% Asian","% Latino"]];
            var renRacePieChartData = [["Race"  , "Population"],
                                       ["White" , 0],
                                       ["Black" , 0],
                                       ["Latino", 0],
                                       ["Asian" , 0]];
            var viewportPopulation = 0;
            
            // fill chart data arrays
            for (var i=0; i < renderedFeatures.length; i++) {
                var pctWhite = renderedFeatures[i].properties.pctWhite;
                var pctAsian = renderedFeatures[i].properties.pctAsian;
                var pctLatino = renderedFeatures[i].properties.pctLatino;
                var pctBlack = renderedFeatures[i].properties.pctBlack;
                var pctPoverty = renderedFeatures[i].properties.pctPoverty;
                var popTotal = renderedFeatures[i].properties.popTotal;
                var meanIncome = renderedFeatures[i].properties.meanIncome;
                var pctUninsur = renderedFeatures[i].properties.pctUninsur;
                var pctDegree = renderedFeatures[i].properties.pctDegree;
                var nAvgWhite = 73.6;
                var nAvgBlack = 12.6;
                var nAvgAsian = 5.1;
                var nAvgLatino = 17.1;
                
                viewportPopulation += popTotal;
                
                renRacePieChartData[1][1] += ((pctWhite/100)  * popTotal);
                renRacePieChartData[2][1] += ((pctBlack/100)  * popTotal);
                renRacePieChartData[3][1] += ((pctLatino/100) * popTotal);
                renRacePieChartData[4][1] += ((pctAsian/100)  * popTotal);
                
                renWhitePovHistData.push([pctWhite, pctPoverty]);
                renIncomeUninsuredData.push([meanIncome, pctUninsur]);
                renIncomeDegreeData.push([meanIncome, pctDegree]);
            }
            
            //update viefreame population stat
            var popStatSpans = document.getElementsByClassName('popstat');
            
            var viewPop = viewportPopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            popStatSpans[0].innerHTML = viewPop;
            popStatSpans[1].innerHTML = viewPop;            
            
            // draw the charts
            if (Layers[selectedLayer]) {
                var lyr = Layers[selectedLayer];
                // demography charts
                if (lyr.category == 'dem') {
                    document.getElementById('socioecon-charts').style.display = "none";
                    document.getElementById('demographic-charts').style.display = "block";
                    //drawScatterplot(renWhitePovHistData);
                    drawPieChart(renRacePieChartData);
                }
                // socio-econ charts
                if (lyr.category == 'se') {
                    document.getElementById('demographic-charts').style.display = "none";
                    document.getElementById('socioecon-charts').style.display = "block";
                    //drawScatterplot2(renIncomeUninsuredData);
                    drawScatterplot3(renIncomeDegreeData);
                }
            }            
        }
    });
});














