import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Source } from 'react-map-gl';

import fixLayer from './fixLayer';
import fixNameLayer from './fixNameLayer';
import { fixStore } from './state';

export default observer((/* properties */) => {
    const fixData = fixStore.fixes;
    // eslint-disable-next-line no-underscore-dangle
    const data = [...fixData.values()].map((fix) => ({
        type: 'Feature', geometry: { type: 'Point', coordinates: [fix.longitude, fix.latitude] }, properties: { title: fix.pointId },
    }));
    const fixJson = {
        type: 'FeatureCollection',
        features: [
            ...data,
            { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 37.8] } },
        ],
    };
    return (
        <Source id="fixSources" type="geojson" data={fixJson}>
            <Layer id={fixLayer.id} type={fixLayer.type} paint={fixLayer.paint} />
            <Layer id={fixNameLayer.id} type={fixNameLayer.type} layout={fixNameLayer.layout} paint={fixNameLayer.paint} />
        </Source>
    );
});
