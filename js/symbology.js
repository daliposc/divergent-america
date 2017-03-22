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

// Dark Red - Light Yellow - Teal (Red to Teal)
var RtL = adjustRamp(chroma.bezier(['darkred','deeppink','lightyellow']).scale().colors(5));
var LtT = adjustRamp(chroma.bezier(['lightyellow', 'lightgreen', 'teal']).scale().colors(5));

// Dark Red - BlanchedAlmond - Indigo (Crimson to Indigo)
var CtL = adjustRamp(chroma.bezier(['darkred','deeppink','lightyellow']).scale().colors(5));
var LtI = adjustRamp(chroma.bezier(['lightyellow','blueviolet','indigo']).scale().colors(5));

//Indigo - Light Yellow - OrangeRed (Indigo to Orange)
var ItL = adjustRamp(chroma.bezier(['indigo','violet','lightyellow']).scale().colors(5));
var LtO = adjustRamp(chroma.bezier(['lightyellow','darkorange','orangered']).scale().colors(5));

//DarkGrey - Light Yellow - DarkSalmon (Grey to Salmon)
var GtL = adjustRamp(chroma.bezier(['darkslategrey','lightslategrey','aliceblue']).scale().colors(5));
var LtS = adjustRamp(chroma.bezier(['lightyellow', 'darkorange', 'darksalmon']).scale().colors(5));

//DarkGrey - Light Yellow - Sienna (Grey to Sienna - LtSi)
var LtSi = adjustRamp(chroma.bezier(['lightyellow','darksalmon','sienna']).scale().colors(5));

//DarkGrey - Light Yellow - Dark Goldenrod (Grey to Goldenrod)
var LtG = adjustRamp(chroma.bezier(['lightyellow','goldenrod','darkgoldenrod']).scale().colors(5));

//DarkGrey - Light Yellow - Coral (Grey to Coral)
var LtC = adjustRamp(chroma.bezier(['lightyellow','lightcoral','coral']).scale().colors(5));

//Black - Whitesmoke - Gold (Black to Gold)
var BtW = adjustRamp(chroma.bezier(['black','slategrey', 'lightgrey']).scale().colors(5));
var WtG = adjustRamp(chroma.bezier(['whitesmoke','gold']).scale().colors(5));

// Define Color Ramp Symbologies
var RedToTeal = {
    'fill-color': {
        'property': '',
        'type': 'exponential',
        'stops': [
            [-4, RtL[0]],
            [-3, RtL[1]],
            [-2, RtL[2]],
            [-1, RtL[3]],
            [0,  'lightyellow'],
            [1, LtT[1]],
            [2, LtT[2]],
            [3, LtT[3]],
            [4, LtT[4]]
        ]
    }
};

var CrimsonToIndigo = {
    'fill-color': {
        'property': '',
        'type': 'exponential',
        'stops': [
            [-4, CtL[0]],
            [-3, CtL[1]],
            [-2, CtL[2]],
            [-1, CtL[3]],
            [0,  'lightyellow'],
            [1, LtI[1]],
            [2, LtI[2]],
            [3, LtI[3]],
            [4, LtI[4]]
        ]
    }
};
var IndigoToOrange = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, ItL[0]],
            [-3, ItL[1]],
            [-2, ItL[2]],
            [-1, ItL[3]],
            [0, 'lightyellow'],
            [1, LtO[1]],
            [2, LtO[2]],
            [3, LtO[3]],
            [4, LtO[4]]
        ]
    }
};
var GreyToSalmon = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, GtL[0]],
            [-3, GtL[1]],
            [-2, GtL[2]],
            [-1, GtL[3]],
            [0, 'lightyellow'],
            [.75, LtS[1]],
            [1.75, LtS[2]],
            [2.75, LtS[3]],
            [3.75, LtS[4]]
        ]
    }
};
var GreyToSienna = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, GtL[0]],
            [-3, GtL[1]],
            [-2, GtL[2]],
            [-1, GtL[3]],
            [0, 'lightyellow'],
            [1, LtSi[1]],
            [2, LtSi[2]],
            [3, LtSi[3]],
            [4, LtSi[4]]
        ]
    }
};
var GreyToGoldenrod = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, GtL[0]],
            [-3, GtL[1]],
            [-2, GtL[2]],
            [-1, GtL[3]],
            [0, 'lightyellow'],
            [1, LtG[1]],
            [2, LtG[2]],
            [3, LtG[3]],
            [4, LtG[4]]
        ]
    }
};
var GreyToCoral = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, GtL[0]],
            [-3, GtL[1]],
            [-2, GtL[2]],
            [-1, GtL[3]],
            [0, 'lightyellow'],
            [1, LtC[1]],
            [2, LtC[2]],
            [3, LtC[3]],
            [4, LtC[4]]
        ]
    }
};
var BlackToGold = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, BtW[0]],
            [-3, BtW[1]],
            [-2, BtW[2]],
            [-1, BtW[3]],
            [0, 'whitesmoke'],
            [1, WtG[1]],
            [2, WtG[2]],
            [3, WtG[3]],
            [4, WtG[4]]
        ]
    }
};