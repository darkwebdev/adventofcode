const { splitByNumber } = require('./utils');
describe('splitByNumber', () => {
  it('should', () => {
    expect(splitByNumber('', 0)).toEqual([]);
  })
  it('should', () => {
    expect(splitByNumber('abc', 1)).toEqual(['a','b','c']);
  })
  it('should', () => {
    expect(splitByNumber('abcde', 2)).toEqual(['ab','cd','e']);
  })
});
