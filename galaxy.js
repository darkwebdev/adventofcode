class Star {
  constructor(name, satellites=[]) {
    this.name = name;
    this.satellites = satellites;
  }
}

class Galaxy {
  constructor(map) {
    this.stars = [];
    this.populateFromMap(map);
  }

  existingOrNewSatellite(name) {
    const existingSat = this.stars.find(s => s.name === name);

    if (existingSat) {
      return existingSat
    } else {
      const newSat = new Star(name);
      this.stars.push(newSat);
      return newSat;
    }
  }

  addOrbit(centerName, satelliteName) {
    const existingStar = this.stars.find(s => s.name === centerName);
    const sat = this.existingOrNewSatellite(satelliteName);

    if (existingStar) {
      existingStar.satellites.push(sat)
    } else {
      const star = new Star(centerName, [sat]);
      this.stars.push(star);
    }
  }

  populateFromMap(orbitsMap) {
    orbitsMap.forEach(orbit => {
      const [center, satellite] = orbit.split(')');
      this.addOrbit(center, satellite);
    });
  }

  center() {
    const isSat = star => !this.stars.some(s => s.satellites.some(sat => sat === star));
    return this.stars.find(isSat);
  }
}

const totalOrbits = (center, parentOrbits=0) =>
  (parentOrbits ? 1 : 0) + center.satellites.reduce((acc, s) =>
    parentOrbits + acc + totalOrbits(s, parentOrbits+1), 0);

const starsTo = (center, star) => {
  if (center === star) return 0;
  if (!center.satellites || !center.satellites.length) return Infinity;

  const stars = center.satellites.map(sat => starsTo(sat, star));

  if (stars.some(s => s !== Infinity)) {
    // console.log('starsTo', center.name, star.name, stars);
    return 1 + stars.reduce((all, s) => all + (s === Infinity ? 0 : s), 0);
  }

  return Infinity;
};

const starsBetween = (center, star1, star2) => {
  const starsTo1 = starsTo(center, star1);
  const starsTo2 = starsTo(center, star2);

  if (starsTo1 + starsTo2 >= Infinity) return Infinity;

  const stars = starsTo1 + starsTo2;

  console.log('starsBetween', center.name, starsTo1, starsTo2, stars);

  return center.satellites.reduce((min, sat) => Math.min(min, starsBetween(sat, star1, star2)), stars)
};

module.exports = Galaxy;
module.exports.totalOrbits = totalOrbits;
module.exports.starsBetween = starsBetween;
