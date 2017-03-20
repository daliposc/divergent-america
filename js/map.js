// initialize global variables
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvZzM3MWZpbmFsIiwiYSI6ImNqMGcwMHJ1MjAxejcycXFsbjh3ODV1anAifQ.elLqkIBh8HH_9SJX9wjBrw';
var zoomThreshold = 4;

// initialize map object
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/geog371final/cj0i3bii8004p2sqgso8xnsqw?optimize=true',
    zoom: 3.5,
    center: [-98, 38],
    minZoom: 3,
    maxZoom: 10,
});

// Add navigation control
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

// Filter array to unique features, remove duplicates
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

/* 
Mapload Function:
    1. Add vector tile sources
    2. Add layers
    3. On Click functions
    4. On Moveend functions  
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
        'paint': RedToTeal,
    }, 'barrier_line-land-line');
    
    // add counties layer to map
    map.addLayer({
        'id': 'counties-layer',
        'source': 'counties',
        'source-layer': 'countiesF-55xz2i',
        'minzoom': zoomThreshold,
        'type': 'fill',
        'paint': RedToTeal
    }, 'barrier_line-land-line');
    
    // on map click
    map.on('click', function(e) {
        // get clicked feature
        var feature = map.queryRenderedFeatures(e.point, { layers: ["counties-layer", "states-layer"]});

        console.log(feature);
    });
    
    // On map moveend
    map.on('moveend', function() {
        // Get rendered feature from the map
        var features = map.queryRenderedFeatures({layers:['states-layer','counties-layer']});

        if (features) {
            // unique feture for counties based on GEOID
            var renderedFeatures = getUniqueFeatures(features, "GEOID10");
            
            // data arrays for charts
            var renWhitePovHistData = [["white", "impoverished"]];            
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
            }
            
            // draw the charts
            drawScatterplot(renWhitePovHistData);
            drawPieChart(renRacePieChartData);
        }
    });
});

// set layer fill style based on selection
function setLayerFillColor(lyr, query) {
    if (query == 'blueOrange') {
        if (lyr == 'states') {
            return '#4286f4';
        }
        if (lyr == 'counties') {
            return '#f47d42';
        }
    }
    
    if (query == 'orangeBlue') {
        if (lyr == 'states') {
            return '#f47d42';
        }
        if (lyr == 'counties') {
            return '#4286f4';
        }
    }
}

// get layer selection
var lyrSelect = document.getElementById('layerSelect');

/*
// set layer color when there is a new selection
lyrSelect.addEventListener("click", function() {
   var lyrChoice = lyrSelect.value;
    console.log(lyrChoice);
    
    map.setPaintProperty('counties-layer', 'fill-color', setLayerFillColor('counties', lyrChoice));
    map.setPaintProperty('states-layer', 'fill-color', setLayerFillColor('states', lyrChoice));
});
*/











