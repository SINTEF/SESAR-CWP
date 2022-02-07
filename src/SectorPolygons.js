import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { sectorStore } from './state';
import { Source, Layer } from 'react-map-gl';
import { sectorLayer } from './sector-layer';
import { outlineLayer } from './outline-style';


export default observer(function SectorPolygon(props) {
    const edgeData = sectorStore.edges;
    const sectorData = sectorStore.areaOfIncludedAirspaces; //Both sectors and airspaces
    const sectors = sectorData.map(airspace => ({
        'type': 'Feature',
        'properties': {
            'color': "#fff",
            'width': 1,
            // 'dasharray':[2,1],
        },
        'geometry': {
            'type': 'Polygon',
            'coordinates': [airspace.airspaceArea.map(area => (
                [area.longitude, area.latitude])
            )]
        }
    }));
    const geoJson = {
        type: 'FeatureCollection',
        features:
            [...sectors,
            {
                'type': 'Feature',
                'properties': {
                    'color': "#f0f",
                    'width': 3,
                    // 'dasharray':[2,2],

                },
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [edgeData.map(edge => (
                        [edge.longitude, edge.latitude])
                    )]
                }
            },
            {
                'type': 'Feature',
                'properties': {
                    'color': "#fff"
                },
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [67.13734, 9.13745],
                            [66.96466, 9.8097],
                            [68.03252, 10.3252],
                            [69.06, 11.98],
                            [68.06, 10.98],
                            [67.06, 12.98],
                            [66.06, 9.98],
                            [67.13734, 9.13745],
                        ]]
                }
            }
            ]
    };
    return (
        <Source type="geojson" data={geoJson}>
            <Layer {...sectorLayer} />
            <Layer {...outlineLayer} />
        </Source>
    )
})