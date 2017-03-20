// initialize global variables
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvZzM3MWZpbmFsIiwiYSI6ImNqMGcwMHJ1MjAxejcycXFsbjh3ODV1anAifQ.elLqkIBh8HH_9SJX9wjBrw';
var zoomThreshold = 4;
var selectedLayer;

// Set layer style options
var lyrStyleOptions = {
    'mInc': {
        'name': 'Mean Income',
        'colorRamp': RedToTeal["fill-color"],
        'propertyName': 'mIncSTDV',
        'category': 'se',
        'legendRamp': {
            'a': adjRtL[0],
            'b': adjRtL[1],
            'c': adjRtL[2],
            'd': adjRtL[3],
            'e': 'lightyellow',
            'f': adjLtT[1],
            'g': adjLtT[2],
            'h': adjLtT[3],
            'i': adjLtT[4]
        }
    },
    'pctDegree': {
        'name': 'Percent w/ Adv. Degree',
        'colorRamp': CrimsonToIndigo["fill-color"],
        'propertyName': 'pctDeSTDV',
        'category': 'se',
        'legendRamp': {
            'a': adjCtL[0],
            'b': adjCtL[1],
            'c': adjCtL[2],
            'd': adjCtL[3],
            'e': 'lightyellow',
            'f': adjLtI[1],
            'g': adjLtI[2],
            'h': adjLtI[3],
            'i': adjLtI[4]
        }
    }
}

// initialize map object
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/geog371final/cj0i5q36i00592rlb3bbv8s23?optimize=true',
    zoom: 3.5,
    center: [-98, 38],
    minZoom: 3,
    maxZoom: 10,
});
// add navigation control
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

/* 
Mapload Function:
    1. Add vector tile sources
    2. Add layers
    3. Filter dup features function
    4. On Click functions
    5. On Moveend functions
    6. On mouseover functions: TODO
*/
map.on('load', function() {    
    // get vector tileset sources
    map.addSource('states', {
        'type': 'vector',
        'url': 'mapbox://geog371final.5tkn5wya'
    });
    
    map.addSource('counties', {
        'type': 'vector',
        'url': 'mapbox://geog371final.0vyzgmm0'
    });
    
    // add state layer to map
    map.addLayer({
        'id': 'states-layer',
        'source': 'states',
        'source-layer': 'statesDataF-6rqrzf',
        'maxzoom': zoomThreshold,
        'type': 'fill',
        'paint': {'fill-opacity': 0.1}
    }, 'barrier_line-land-line');
    
    // add counties layer to map
    map.addLayer({
        'id': 'counties-layer',
        'source': 'counties',
        'source-layer': 'countiesF-55xz2i',
        'minzoom': zoomThreshold,
        'type': 'fill',
        'paint': {'fill-opacity': 0.1}
    }, 'barrier_line-land-line');
    
    // on map click
    map.on('click', function(e) {
        // get clicked feature
        var feature = map.queryRenderedFeatures(e.point, { layers: ["counties-layer", "states-layer"]});

        console.log(feature);
    });
    
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
    
    // On map moveend: Get data and render charts
    map.on('moveend', function() {
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
                
                if(!isNaN((pctWhite/100)  * popTotal)) {
                    renRacePieChartData[1][1] += ((pctWhite/100)  * popTotal);
                }
                if(!isNaN((pctBlack/100)  * popTotal)) {
                    renRacePieChartData[2][1] += ((pctBlack/100)  * popTotal);
                }
                if(!isNaN((pctLatino/100)  * popTotal)) {
                    renRacePieChartData[3][1] += ((pctLatino/100) * popTotal);
                }
                if(!isNaN((pctAsian/100)  * popTotal)) {
                    renRacePieChartData[4][1] += ((pctAsian/100)  * popTotal);
                }
                
                renWhitePovHistData.push([pctWhite, pctPoverty]);
                renIncomeUninsuredData.push([meanIncome, pctUninsur]);
                renIncomeDegreeData.push([meanIncome, pctDegree])
            }
            
            // draw the charts
            if (lyrStyleOptions[selectedLayer]) {
                var lyr = lyrStyleOptions[selectedLayer];
                // demography charts
                if (lyr.category == 'dem') {
                    document.getElementById('socioecon-charts').style.display = "none";
                    document.getElementById('demographic-charts').style.display = "block";
                    drawScatterplot(renWhitePovHistData);
                    drawPieChart(renRacePieChartData);
                }
                // socioecon charts
                if (lyr.category == 'se') {
                    console.log(lyr);
                    document.getElementById('demographic-charts').style.display = "none";
                    document.getElementById('socioecon-charts').style.display = "block";
                    drawScatterplot2(renIncomeUninsuredData);
                    drawScatterplot3(renIncomeDegreeData);
                }
            }            
        }
    });
});

// Update Legend
function fillLegend(lyr) {    
    // title
    document.getElementById('leg-title').innerHTML = lyr.name;
    
    // draw legend gradient
    var cssBkgrnd =  "linear-gradient(to right,";
    var concatCSS = cssBkgrnd.concat(
        lyr['legendRamp'].a, ",",
        //lyr['legendRamp'].b, ",",
        lyr['legendRamp'].c, ",",
        lyr['legendRamp'].d, ",",
        lyr['legendRamp'].e, ",",
        lyr['legendRamp'].f, ",",
        lyr['legendRamp'].g, ",",
        //lyr['legendRamp'].h, ",",
        lyr['legendRamp'].i, ")"
    );
    console.log(concatCSS);
    document.getElementById('leg-gradient').style.background = concatCSS;
}

// Colors and displays the selected layer
function setSelectedLayer(lyrId) {
    selectedLayer = lyrId;
    console.log(selectedLayer);
    
    //get layer style options
    var lyr = lyrStyleOptions[selectedLayer];
    
    //set opacity
    map.setPaintProperty('states-layer', 'fill-opacity', 0.7);
    map.setPaintProperty('counties-layer', 'fill-opacity', 0.7);   
    
    // set layer fill style
    lyr['colorRamp'].property = lyr.propertyName;
    var fillColor = lyr['colorRamp'];
    map.setPaintProperty('states-layer', 'fill-color', fillColor);
    map.setPaintProperty('counties-layer', 'fill-color', fillColor);

    // fill legend contents
    fillLegend(lyr);
};











