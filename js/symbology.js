//global color settings
var sat = 1;
var dark = 1;

// ust colorRamp
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

// Teal - Light Yellow - Dark Red (Inverted Red to Teal)
var RtL = adjustRamp(chroma.bezier(['teal','lightgreen','lightyellow']).scale().colors(5));
var LtT = adjustRamp(chroma.bezier(['lightyellow', 'deeppink', 'darkred']).scale().colors(5));

// Indigo - BlanchedAlmond - Dark Red (Inverted Crimson to Indigo)
var CtL = adjustRamp(chroma.bezier(['indigo','blueviolet','lightyellow']).scale().colors(5));
var LtI = adjustRamp(chroma.bezier(['lightyellow','deeppink','darkred']).scale().colors(5));

//OrangeRed - Light Yellow - Indigo (Inverted Indigo to Orange)
var ItL = adjustRamp(chroma.bezier(['orangered','darkorange','lightyellow']).scale().colors(5));
var LtO = adjustRamp(chroma.bezier(['lightyellow','violet','indigo']).scale().colors(5));

//DarkSalmon - Light Yellow - DarkGrey (Inverted Grey to Salmon)
var GtL = adjustRamp(chroma.bezier(['darksalmon','darkorange','lightyellow']).scale().colors(5));
var LtS = adjustRamp(chroma.bezier(['aliceblue', 'lightslategrey', 'darkslategrey']).scale().colors(5));

//Sienna - Light Yellow - DarkGrey (Inverted Grey to Sienna - LtSi)
var LtSi = adjustRamp(chroma.bezier(['sienna','darksalmon','lightyellow']).scale().colors(5));

//Dark Goldenrod - Light Yellow - DarkGrey (Inverted Grey to Goldenrod)
var LtG = adjustRamp(chroma.bezier(['darkgoldenrod','goldenrod','lightyellow']).scale().colors(5));

//Coral - Light Yellow - DarkGrey (Inverted Grey to Coral)
var LtC = adjustRamp(chroma.bezier(['coral','lightcoral','lightyellow']).scale().colors(5));

//Gold - Whitesmoke - Black (Inverted Black to Gold)
var BtW = adjustRamp(chroma.bezier(['gold','whitesmoke']).scale().colors(5));
var WtG = adjustRamp(chroma.bezier(['lightgrey', 'slategrey', 'black']).scale().colors(5));

// Define Color Ramp Symbologies
var RedToTeal = {
    'fill-color': {
        'property': '',
        'type': 'exponential',
        'stops': [
            [-4, LtT[4]],
            [-3, LtT[3]],
            [-2, LtT[2]],
            [-1, LtT[1]],
            [0,  'lightyellow'],
            [1, RtL[3]],
            [2, RtL[2]],
            [3, RtL[1]],
            [4, RtL[0]]
        ]
    }
};

var CrimsonToIndigo = {
    'fill-color': {
        'property': '',
        'type': 'exponential',
        'stops': [
            [-4, LtI[4]],
            [-3, LtI[3]],
            [-2, LtI[2]],
            [-1, LtI[1]],
            [0,  'lightyellow'],
            [1, CtL[3]],
            [2, CtL[2]],
            [3, CtL[1]],
            [4, CtL[0]]
        ]
    }
};
var IndigoToOrange = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, LtO[4]],
            [-3, LtO[3]],
            [-2, LtO[2]],
            [-1, LtO[1]],
            [0, 'lightyellow'],
            [1, ItL[3]],
            [2, ItL[2]],
            [3, ItL[1]],
            [4, ItL[0]]
        ]
    }
};
var GreyToSalmon = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, LtS[4]],
            [-3, LtS[3]],
            [-2, LtS[2]],
            [-1, LtS[1]],
            [0, 'lightyellow'],
            [.75, GtL[3]],
            [1.75, GtL[2]],
            [2.75, GtL[1]],
            [3.75, GtL[0]]
        ]
    }
};
var GreyToSienna = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, LtSi[4]],
            [-3, LtSi[3]],
            [-2, LtSi[2]],
            [-1, LtSi[1]],
            [0, 'lightyellow'],
            [1, GtL[3]],
            [2, GtL[2]],
            [3, GtL[1]],
            [4, GtL[0]]
        ]
    }
};
var GreyToGoldenrod = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, LtG[4]],
            [-3, LtG[3]],
            [-2, LtG[2]],
            [-1, LtG[1]],
            [0, 'lightyellow'],
            [1, GtL[3]],
            [2, GtL[2]],
            [3, GtL[1]],
            [4, GtL[0]]
        ]
    }
};
var GreyToCoral = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, LtC[4]],
            [-3, LtC[3]],
            [-2, LtC[2]],
            [-1, LtC[1]],
            [0, 'lightyellow'],
            [1, GtL[3]],
            [2, GtL[2]],
            [3, GtL[1]],
            [4, GtL[0]]
        ]
    }
};
var BlackToGold = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, WtG[4]],
            [-3, WtG[3]],
            [-2, WtG[2]],
            [-1, WtG[1]],
            [0, 'whitesmoke'],
            [1, BtW[3]],
            [2, BtW[2]],
            [3, BtW[1]],
            [4, BtW[0]]
        ]
    }
};
