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

//Indigo - Light Yellow - OrangeRed (Indigo to Orange)
var ItL = chroma.bezier(['indigo','violet','gold']).scale().colors(5);
var LtO = chroma.bezier(['lightyellow','darkorange','orangered']).scale().colors(5);
var adjItL = adjustRamp(ItL);
var adjLtO = adjustRamp(LtO);

//DarkGrey - Light Yellow - DarkSalmon (Grey to Salmon)
var GtL = chroma.bezier(['darkslategrey','lightslategrey','aliceblue']).scale().colors(5);
var LtS = chroma.bezier(['lightyellow', 'darkorange', 'darksalmon']).scale().colors(5);
var adjGtL = adjustRamp(GtL);
var adjLtS = adjustRamp(LtS);

//DarkGrey - Light Yellow - Sienna (Grey to Sienna - LtSi)
var LtSi = chroma.bezier(['lightyellow','darksalmon','sienna']).scale().colors(5);
var adjLtSi = adjustRamp(LtSi);

//DarkGrey - Light Yellow - Dark Goldenrod (Grey to Goldenrod)
var LtG = chroma.bezier(['lightyellow','goldenrod','darkgoldenrod']).scale().colors(5);
var adjLtG = adjustRamp(LtG);

//DarkGrey - Light Yellow - Coral (Grey to Coral)
var LtC =chroma.bezier(['lightyellow','lightcoral','coral']).scale().colors(5);
var adjLtC = adjustRamp(LtC);

//Black - Whitesmoke - Gold (Black to Gold)
var BtW =chroma.bezier(['black','slategrey', 'lightgrey']).scale().colors(5);
var WtG =chroma.bezier(['whitesmoke','gold']).scale().colors(5);
var adjBtW = adjustRamp(BtW);
var adjWtG = adjustRamp(WtG);

// Define Color Ramp Symbologies
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
    }
};

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
    }
};
var IndigoToOrange = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, adjItL[0]],
            [-3, adjItL[1]],
            [-2, adjItL[2]],
            [-1, adjItL[3]],
            [0, 'lightyellow'],
            [1, adjLtO[1]],
            [2, adjLtO[2]],
            [3, adjLtO[3]],
            [4, adjLtO[4]]
        ]
    }
};
var GreyToSalmon = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, adjGtL[0]],
            [-3, adjGtL[1]],
            [-2, adjGtL[2]],
            [-1, adjGtL[3]],
            [0, 'lightyellow'],
            [1, adjLtS[1]],
            [2, adjLtS[2]],
            [3, adjLtS[3]],
            [4, adjLtS[4]]
        ]
    }
};
var GreyToSienna = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, adjGtL[0]],
            [-3, adjGtL[1]],
            [-2, adjGtL[2]],
            [-1, adjGtL[3]],
            [0, 'lightyellow'],
            [1, adjLtSi[1]],
            [2, adjLtSi[2]],
            [3, adjLtSi[3]],
            [4, adjLtSi[4]]
        ]
    }
};
var GreyToGoldenrod = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, adjGtL[0]],
            [-3, adjGtL[1]],
            [-2, adjGtL[2]],
            [-1, adjGtL[3]],
            [0, 'lightyellow'],
            [1, adjLtG[1]],
            [2, adjLtG[2]],
            [3, adjLtG[3]],
            [4, adjLtG[4]]
        ]
    }
};
var GreyToCoral = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, adjGtL[0]],
            [-3, adjGtL[1]],
            [-2, adjGtL[2]],
            [-1, adjGtL[3]],
            [0, 'lightyellow'],
            [1, adjLtC[1]],
            [2, adjLtC[2]],
            [3, adjLtC[3]],
            [4, adjLtC[4]]
        ]
    }
};
var BlackToGold = {
    'fill-color':{
        'property':'',
        'type':'exponential',
        'stops': [
            [-4, adjBtW[0]],
            [-3, adjBtW[1]],
            [-2, adjBtW[2]],
            [-1, adjBtW[3]],
            [0, 'whitesmoke'],
            [1, adjWtG[1]],
            [2, adjWtG[2]],
            [3, adjWtG[3]],
            [4, adjWtG[4]]
        ]
    }
};