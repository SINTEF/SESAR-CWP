import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { sectorStore } from './state';
import { Source, Layer } from 'react-map-gl';
import { sectorLayer } from './sector-layer';
import { outlineLayer } from './outline-style';
import { features } from 'process';
// import {range} from 'd3-array';

// function setPolygonData(featureCollection) {
//     const { features } = featureCollection;
//     // const scale = scaleQuantile().domain(features.map(accessor)).range(range(9));
//     return {
//         type: 'FeatureCollection',
//         features:
//             features.map(edge => {
//                 const coordinate = [edge.longitude, edge.latitude]
//                 return coordinate;
//             })



//for length, but right now 
// features.map(sector => {
//     type = 'feature';
//     geometry = 'Polygon'
//     const properties = {
//     ...f.properties,
//     value,
//     //percentile:scale(value);
//     };
//     return {...f, properties};
// })
//     }]
// }
// }

export default observer(function SectorPolygon(props) {
    const edgeData = sectorStore.edges;
    const geoJson = {
        type: 'FeatureCollection',
        features:
            [{
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [edgeData.map(edge => (
                        [edge.longitude, edge.latitude])
                    )]
                }
            }]
    };
    return (
        <Source type="geojson" data={geoJson}>
            <Layer {...sectorLayer} />
            <Layer {...outlineLayer} />
        </Source>
    )
})