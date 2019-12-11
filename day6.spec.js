const { map1, map2 } = require('./day6.maps');
const Galaxy = require('./galaxy');

describe('day6', () => {
  describe('map1', () => {
    it('should have 42 orbits', () => {
      const galaxy = new Galaxy(map1);
      expect(Galaxy.totalOrbits(galaxy.center())).toEqual(42);
    })
  });

  describe('map2', () => {
    it('should have 5 stars between YOU & SAN', () => {
      const galaxy = new Galaxy(map2);
      const star1 = galaxy.stars.find(s => s.name ==='YOU');
      const star2 = galaxy.stars.find(s => s.name ==='SAN');

      expect(Galaxy.starsBetween(galaxy.center(), star1, star2)-2).toEqual(4);
    })
  })
});
