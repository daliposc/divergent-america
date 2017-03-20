// initialize global variables
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvZzM3MWZpbmFsIiwiYSI6ImNqMGcwMHJ1MjAxejcycXFsbjh3ODV1anAifQ.elLqkIBh8HH_9SJX9wjBrw';
var zoomThreshold = 4;
var selectedLayer;

// initialize map object
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/geog371final/cj0i5q36i00592rlb3bbv8s23?optimize=true',
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
    
    // On map moveend
    map.on('moveend', function() {
        // Get rendered feature from the map
        var features = map.queryRenderedFeatures({layers:['states-layer','counties-layer']});

        if (features) {
            // unique feture for counties based on GEOID
            var renderedFeatures = getUniqueFeatures(features, "GEOID10");
            
            // initialize data arrays for charts
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

// Set layer style options
var lyrStyleOptions = {
    'mInc': {
        'name': 'Mean Income',
        'colorRamp': RedToTeal["fill-color"],
        'propertyName': 'mIncSTDV',
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

// Update Legend
function fillLegend(lyr) {    
    // title
    document.getElementById('leg-title').innerHTML = lyr.name;
    
    // legend gradient
    var cssBkgrnd =  "linear-gradient(to right,";
    var concatCSS = cssBkgrnd.concat(
        lyr['legendRamp'].a, ",",
        lyr['legendRamp'].b, ",",
        lyr['legendRamp'].c, ",",
        lyr['legendRamp'].d, ",",
        lyr['legendRamp'].e, ",",
        lyr['legendRamp'].f, ",",
        lyr['legendRamp'].g, ",",
        lyr['legendRamp'].h, ",",
        lyr['legendRamp'].i, ")"
    );
    console.log(concatCSS);
    document.getElementById('leg-gradient').style.background = concatCSS;
}

// Colors and displays the selected layer
function setSelectedLayer(lyrId) {
    selectedLayer = lyrId;
    
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











