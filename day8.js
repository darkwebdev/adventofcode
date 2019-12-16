const input = require('./day8.input');
const { layers } = require('./day8.utils');

const ls = layers(input, 25, 6);

const digitsInStr = (str, digit) => [...str].reduce((zs, char) => char === String(digit) ? zs + 1 : zs, 0);
const zerosInStr = str => digitsInStr(str, 0);
const onesInStr = str => digitsInStr(str, 1);
const twossInStr = str => digitsInStr(str, 2);

const zerosInLayer = layer => layer.reduce((zs, num) => zs + zerosInStr(num), 0);
const [fewestZsLayer, _] = ls.reduce(([fewestL, fewestZs], layer) => {
  const zsInLayer = zerosInLayer(layer);
  return fewestZs < zsInLayer ? [fewestL, fewestZs] : [layer, zsInLayer];
}, [null, Infinity]);

const ones = fewestZsLayer.reduce((sum, num) => sum + onesInStr(num), 0);
const twos = fewestZsLayer.reduce((sum, num) => sum + twossInStr(num), 0);

console.log(ones*twos);
