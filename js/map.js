mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvZzM3MWZpbmFsIiwiYSI6ImNqMGcwMHJ1MjAxejcycXFsbjh3ODV1anAifQ.elLqkIBh8HH_9SJX9wjBrw';

// initialize map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9?optimize=true',
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
        'url': 'mapbox://geog371final.9l3t21g4'
    });
    
    map.addSource('counties', {
        'type': 'vector',
        'url': 'mapbox://geog371final.9uzwwa8d'
    });
    
    // add state layer to map
    map.addLayer({
        'id': 'states-layer',
        'source': 'states',
        'source-layer': 'statesData-4nmjj3',
        'maxzoom': zoomThreshold,
        'type': 'fill',
        'paint': {
            'fill-color': '#4286f4',
            'fill-opacity': 0.5,
            'fill-outline-color': '#eee'
        }
    }, 'barrier_line-land-line');
    
    // add counties layer to map
    map.addLayer({
        'id': 'counties-layer',
        'source': 'counties',
        'source-layer': 'countiesData-8g2wfv',
        'minzoom': zoomThreshold,
        'type': 'fill',
        'paint': {
            'fill-color': '#f47d42',
            'fill-opacity': 0.5,
            'fill-outline-color': '#eee'
        }
    }, 'barrier_line-land-line')
});