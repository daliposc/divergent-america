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

// add navigation control
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

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
    }, 'barrier_line-land-line')
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

















