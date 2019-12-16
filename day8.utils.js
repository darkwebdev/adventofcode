const { splitByNumber } = require('./computer/utils');

const isLayerFull = (layer=[], w, h) => layer.length === h && layer[h-1].length === w;

const layers = (img, w, h) =>
  splitByNumber(img, w).reduce((allLayers, num) => {
    const lastLayer = allLayers.length && allLayers[allLayers.length-1];

    if (!lastLayer || isLayerFull(lastLayer, w, h)){
      allLayers.push([num]);
    } else {
      lastLayer.push(num);
    }

    return allLayers;
  }, []);

module.exports.layers = layers;
