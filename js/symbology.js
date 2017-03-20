//global color settings
var sat = 1;
var dark = 1;

// adjust colorRamp
function adjustRamp(colorRamp) {
    var newRamp = [
        chroma(colorRamp[0]).darken(dark).saturate(sat).hex(),
        chroma(colorRamp[1]).darken(dark).saturate(sat).hex(),
        chroma(colorRamp[2]).darken(dark).saturate(sat).hex(),
        chroma(colorRamp[3]).darken(dark).saturate(sat).hex(),
        chroma(colorRamp[4]).darken(dark).saturate(sat).hex()
    ]
    return newRamp;
}

// Define Chroma Color Scales
// Dark Red - Light Yellow - Teal (Red to Teal)
var RtL = chroma.bezier(['darkred','deeppink','lightyellow']).scale().colors(5);
var LtT = chroma.bezier(['lightyellow', 'lightgreen', 'teal']).scale().colors(5);
var adjRtL = adjustRamp(RtL);
var adjLtT =  adjustRamp(LtT);

// Dark Red - BlanchedAlmond - Indigo (Crimson to Indigo)
var CtL = chroma.bezier(['darkred','deeppink','lightyellow']).scale().colors(5);
var LtI = chroma.bezier(['lightyellow','blueviolet','indigo']).scale().colors(5);
var adjCtL = adjustRamp(CtL);
var adjLtI =  adjustRamp(LtI);

// Layer Color Ramp Symbologies
var RedToTeal = {
    'fill-color': {
        'property': '',
        'type': 'exponential',
        'stops': [
            [-4, adjRtL[0]],
            [-3, adjRtL[1]],
            [-2, adjRtL[2]],
            [-1, adjRtL[3]],
            [0,  'lightyellow'],
            [1, adjLtT[1]],
            [2, adjLtT[2]],
            [3, adjLtT[3]],
            [4, adjLtT[4]]
        ]
    },
}

var CrimsonToIndigo = {
    'fill-color': {
        'property': '',
        'type': 'exponential',
        'stops': [
            [-4, adjCtL[0]],
            [-3, adjCtL[1]],
            [-2, adjCtL[2]],
            [-1, adjCtL[3]],
            [0,  'lightyellow'],
            [1, adjLtI[1]],
            [2, adjLtI[2]],
            [3, adjLtI[3]],
            [4, adjLtI[4]]
        ]
    },
}
