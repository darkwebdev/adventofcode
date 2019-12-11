const { map3: map } = require('./day6.maps');
const Galaxy = require('./galaxy');

const galaxy = new Galaxy(map);

console.log(galaxy.stars);

const totalOrbits = Galaxy.totalOrbits(galaxy.center())
console.log('totalOrbits', totalOrbits);

const you = galaxy.stars.find(s => s.name ==='YOU');
const santa = galaxy.stars.find(s => s.name ==='SAN');

const orbitsBetween = Galaxy.starsBetween(galaxy.center(), you, santa)-2;

console.log('Orbits between', orbitsBetween);
