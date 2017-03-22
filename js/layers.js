var Layers = {
    'meanIncome': {
        'name': 'Mean Income per Household (USD)',
        'propertyName': 'mIncSTDV',
        'valueName': 'meanIncome',
        'colorRamp': RedToTeal["fill-color"],
        'category': 'se',
        'legendLabels': {
            'county': [30086, 51085, 60577, 66368, 152424],
            'state':  [30463, 64276, 72901, 80616, 107594]   
        },
        'legendRamp': {}
    },
    
    'pctDegree': {
        'name': '% of Population w/ College Degrees',
        'colorRamp': CrimsonToIndigo["fill-color"],
        'propertyName': 'pctDeSTDV',
        'valueName': 'pctDegree',
        'category': 'se',
        'legendLabels': {
            'county': [1.9, 14.2, 20.41, 24.2, 78.8],
            'state': [19, 26, 29.53, 32, 55]
        },
        'legendRamp': {}
    },
    
    'pctPoverty': {
        'name': '% in Poverty',
        'colorRamp': IndigoToOrange["fill-color"],
        'propertyName': 'pctPovSTDV',
        'valueName': 'pctPoverty',
        'category': 'se',
        'legendLabels': {
            'county' : [0, 8.3, 12.34, 15.3, 45.5],
            'state': [5.6, 8.2, 11.25, 13.15, 41.8]
        },
        'legendRamp': {}
    },
    
    'pctUninsur': {
        'name': '% without Health Insurance',
        'colorRamp': IndigoToOrange["fill-color"],
        'propertyName': 'pctUniSTDV',
        'valueName': 'pctUninsur',
        'category': 'se',
        'legendLabels': {
            'county': [0, 1.6, 12.2, 18.6, 25],
            'state': [13.4, 34.15, 39.29, 48, 54.9]
        },
        'legendRamp': {}
    },
    
     'pctWhite': {
        'name': '% White',
        'colorRamp': GreyToSalmon["fill-color"],
        'propertyName': 'pctWhSTDV',
        'valueName': 'pctWhite',
        'category': 'dem',
        'legendLabels': {
            'county' : [4.7, 77.1, 83.52, 95.5, 100],
            'state' : [25.4, 69, 76.55, 85.85, 95]
        },
        'legendRamp': {}
    },
    
    'pctBlack': {
        'name': '% Black',
        'colorRamp': GreyToSienna["fill-color"],
        'propertyName': 'pctBlSTDV',
        'valueName': 'pctBlack',
        'category': 'dem',
        'legendLabels': {
            'county' : [0, 0.6, 9, 10.3, 85.9],
            'state' : [0.5, 3.25, 11.11, 15.55, 48.4]
        },
        'legendRamp': {}
    },
    
    'pctAsian': {
        'name': '% Asian',
        'colorRamp': GreyToGoldenrod["fill-color"],
        'propertyName': 'pctAsiSTDV',
        'valueName': 'pctAsian',
        'category': 'dem',
        'legendLabels': {
            'county': [0, 0.2, 1.2, 1.28, 42.6],
            'state' : [0.3, 1.4, 3.87, 4.2, 37.7]
        }, 
        'legendRamp': {}
    },

    'pctLatino': {
        'name': '% Latino',
        'colorRamp': GreyToCoral["fill-color"],
        'propertyName': 'pctLatSTDV',
        'valueName': 'pctLatino',
        'category': 'dem',
        'legendLabels': {
            'county' :[0, 1.9, 8.83, 9, 98.7],
            'state' : [1.4, 4.7, 12.88, 13.5, 99]
        },
        'legendRamp': {}
    },
    
    'popTotal': {
        'name': 'Total Population',
        'colorRamp': BlackToGold["fill-color"],
        'propertyName': 'popTotSTDV',
        'valueName': 'popTotal',
        'category': 'dem',
        'legendLabels': {
            'county': [85, 11027, 100737, 67582, 10038400],
            'state' : [579679, 1703398, 6155730, 68455200, 384215000]
        },            
        'legendRamp': {}
    }
}

// Fill legendRamps based off colorRamp values
function colorRamp_To_legendRamp (lyrID) {
    var keys = ['a','b','c','d','e','f','g','h','i'];
    var legendRamp = {'a': '', 'b': '', 'c': '', 'd': '', 'e': '', 
                      'f': '', 'g': '', 'h': '', 'i': ''}

    for (var i = 0; i < keys.length; i++) {
        legendRamp[keys[i]] = Layers[lyrID].colorRamp.stops[i][1];
    }
    
    return legendRamp;
}

var layerIds = ['meanIncome', 'pctDegree', 'pctPoverty', 'pctUninsur', 'pctWhite',
              'pctBlack', 'pctAsian', 'pctLatino', 'popTotal']

for (var i = 0; i < layerIds.length; i++) {
    Layers[layerIds[i]].legendRamp = colorRamp_To_legendRamp(layerIds[i]);
}




