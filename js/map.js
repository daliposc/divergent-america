mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvZzM3MWZpbmFsIiwiYSI6ImNqMGcwMHJ1MjAxejcycXFsbjh3ODV1anAifQ.elLqkIBh8HH_9SJX9wjBrw';

// initialize map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/geog371final/cj0hn72n6004q2rlb184nvdqy?optimize=true',
    zoom: 3.5,
    center: [-98, 38],
    minZoom: 3,
    maxZoom: 10,
});

// global variables
var zoomThreshold = 4;
var countiesFeatures;
var countyWhitePovHistData = [["white","impov"]];
var countyRacePieChartData = [["Race","Population"],
                              ["White", 0],
                              ["Black", 0],
                              ["Latino", 0],
                              ["Asian", 0]];

// add navigation control
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

// check to see if rendered features are duplicated, only return unique features
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

map.on('load', function() {
    // get vector tileset sources
    map.addSource('states', {
        'type': 'vector',
        'url': 'mapbox://geog371final.5tkn5wya'
    });
    
    map.addSource('counties', {
        'type': 'vector',
        'url': 'mapbox://geog371final.atjzbk97'
    });
    
    // add state layer to map
    map.addLayer({
        'id': 'states-layer',
        'source': 'states',
        'source-layer': 'statesDataF-6rqrzf',
        'maxzoom': zoomThreshold,
        'type': 'fill',
        'paint': {
            'fill-color': '#4286f4',
            'fill-opacity': 0.6,
            'fill-outline-color': '#eee'
        }
    }, 'barrier_line-land-line');
    
    // add counties layer to map
    map.addLayer({
        'id': 'counties-layer',
        'source': 'counties',
        'source-layer': 'countiesDataF-8gyqxg',
        'minzoom': zoomThreshold,
        'type': 'fill',
        'paint': {
            'fill-color': '#f47d42',
            'fill-opacity': 0.6,
            'fill-outline-color': '#eee'
        }
    }, 'barrier_line-land-line');
    
    // get features from map
    map.on('moveend', function() {
        var features = map.queryRenderedFeatures({layers:['counties-layer']});

        if (features) {
            var uniqueFeatures = getUniqueFeatures(features, "GEOID");
            // Store the current features statesFeatures variable
            countiesFeatures = uniqueFeatures;
            
            countyWhitePovHistData = [["white", "impov"]];
            
            countyRacePieChartData = [["Race"  , "Population"],
                                      ["White" , 0],
                                      ["Black" , 0],
                                      ["Latino", 0],
                                      ["Asian" , 0]];
            
            for (var i=0; i < countiesFeatures.length; i++) {
                var pctWhite = countiesFeatures[i].properties.pctWhite;
                var pctAsian = countiesFeatures[i].properties.pctAsian;
                var pctLatino = countiesFeatures[i].properties.pctLatino;
                var pctBlack = countiesFeatures[i].properties.pctBlack;
                var pctPoverty = countiesFeatures[i].properties.pctPoverty;
                var popTotal = countiesFeatures[i].properties.popTotal;
                
                if(!isNaN((pctWhite/100)  * popTotal)) {
                    countyRacePieChartData[1][1] += ((pctWhite/100)  * popTotal);
                }
                if(!isNaN((pctBlack/100)  * popTotal)) {
                    countyRacePieChartData[2][1] += ((pctBlack/100)  * popTotal);
                }
                if(!isNaN((pctLatino/100)  * popTotal)) {
                    countyRacePieChartData[3][1] += ((pctLatino/100) * popTotal);
                }
                if(!isNaN((pctAsian/100)  * popTotal)) {
                    countyRacePieChartData[4][1] += ((pctAsian/100)  * popTotal);
                }
                
                countyWhitePovHistData.push([pctWhite, pctPoverty]);
            }
            
            //console.log(countyWhitePovHistData);
            console.table(countyRacePieChartData);
            console.log(countiesFeatures);
            
            drawHistogram(countyWhitePovHistData);
            drawPieChart(countyRacePieChartData);
        }
    });
});

// return layer color based on selection
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

// get layer color selection
var lyrSelect = document.getElementById('layerSelect');

// set layer color when there is a new selection
lyrSelect.addEventListener("click", function() {
   var lyrChoice = lyrSelect.value;
    console.log(lyrChoice);
    
    map.setPaintProperty('counties-layer', 'fill-color', setLayerFillColor('counties', lyrChoice));
    map.setPaintProperty('states-layer', 'fill-color', setLayerFillColor('states', lyrChoice));
});

// get unique features only
function getUniqueFeatures(array, comparatorProperty) {
    var existingFeatureKeys = {};
    // Because features come from tiled vector data, feature geometries may be split
    // or duplicated across tile boundaries and, as a result, features may appear
    // multiple times in query results.
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











