const { layers } = require('./day8.utils');

describe('day 8', () => {
  describe('layers', () => {
    it('should handle 1x1', () => {
      const width = 1;
      const height = 1;
      const image = '123';

      expect(layers(image, width, height)).toEqual([['1'], ['2'], ['3']]);
    });

    it('should handle 2x1', () => {
      const width = 2;
      const height = 1;
      const image = '12345';

      expect(layers(image, width, height)).toEqual([['12'],['34'],['5']]);
    });

    it('should handle 1x2', () => {
      const width = 1;
      const height = 2;
      const image = '12345';

      expect(layers(image, width, height)).toEqual([['1','2'],['3','4'],['5']]);
    });

    it('should handle 3x2', () => {
      const width = 3;
      const height = 2;
      const image = '123456789012';

      expect(layers(image, width, height)).toEqual([['123','456'], ['789','012']]);
    })
  });
});
