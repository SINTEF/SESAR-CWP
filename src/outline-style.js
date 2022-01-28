export const outlineLayer = {
    id: 'outline',
    type: 'line',
    //source: 'sectorpolygon', //this is maine now but needs to be own layer
    //'source-layer': 'origin',
    source: 'origin',
    layout: {},
    paint: {
        'line-blur': 0,
        //'line-cap': 'round',
        //'line-join': 'round',
        'line-opacity': 1,
        'line-color': '#ffffff',
        'line-width': 3,
        //'visibility': 'visible'
    }
};