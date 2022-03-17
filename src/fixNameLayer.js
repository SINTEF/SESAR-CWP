// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-tabs */
export default {
  id: 'fixName',
  type: 'symbol',
  source: 'fixSources',
  layout: {
    'text-field': ['get', 'title'],
    'text-allow-overlap': true,
    'text-font': [
      'Open Sans Bold',
    ],
    'text-size': 8,
    'text-offset': [0, 0.8],
    'text-anchor': 'top',
  },
  paint: {
    'text-color': '#fff',
  },
};
