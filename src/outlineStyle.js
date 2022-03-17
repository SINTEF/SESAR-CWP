export default {
  id: 'outline',
  type: 'line',
  // source:'sectorpolygon', //this is maine now but needs to be own layer
  layout: {},
  paint: {
    // 'line-color':'#fff',
    'line-width': ['get', 'width'],
    'line-color': ['get', 'color'],
    // 'line-dasharray':['get','dasharray']
  },
};
