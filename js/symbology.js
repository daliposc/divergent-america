// darken colorRamp
function darkenRamp(colorRamp) {
    var darkRamp = [
        chroma(colorRamp[0]).darken(1).saturate(1).hex(),
        chroma(colorRamp[1]).darken(1).saturate(1).hex(),
        chroma(colorRamp[2]).darken(1).saturate(1).hex(),
        chroma(colorRamp[3]).darken(1).saturate(1).hex(),
        chroma(colorRamp[4]).darken(1).saturate(1).hex()
    ]
    return darkRamp;  
}

// Define Chroma Color Scales
// Dark Red - Light Yellow - Teal (Red | Teal)
var RtL = chroma.bezier(['darkred','deeppink','lightyellow']).scale().colors(5);
var LtT = chroma.bezier(['lightyellow', 'lightgreen', 'teal']).scale().colors(5);
var darkRtL = darkenRamp(RtL);
var darkLtT =  darkenRamp(LtT);

// Dark Red - BlanchedAlmond - Indigo (Crimson | Indigo)
var CtL = chroma.bezier(['darkred','deeppink','lightyellow']).scale().colors(5);
var LtI = chroma.bezier(['blanchedalmond','blueviolet','indigo']).scale().colors(5);


// Layer Color Ramp Symbologies
var RedToTeal = {
    'fill-opacity': 0.7,
    'fill-color': {
        'property': 'mIncSTDV',
        'type': 'exponential',
        'stops': [
            [-4, darkRtL[0]],
            [-3, darkRtL[1]],
            [-2, darkRtL[2]],
            [-1, darkRtL[3]],
            [0,  'lightyellow'],
            [1, darkLtT[1]],
            [2, darkLtT[2]],
            [3, darkLtT[3]],
            [4, darkLtT[4]]
        ]
    },
    //'fill-outline-color': '#ccccae',
}