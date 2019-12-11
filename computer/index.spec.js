const { parseCode } = require('.');
const { exit, write, read, evalAndWrite, add, multiply } = require('./ops');

const fnAdd = evalAndWrite(add).toString();
const fnMult = evalAndWrite(multiply()).toString();

describe('parseCode()', () => {
  describe('given invalid code', () => {
    it('should return []', () => {
      const code = 0;

      expect(parseCode(code)).toEqual([])
    })
  });

  describe('given code 99', () => {
    it('should return [exit]', () => {
      const code = 99;

      expect(parseCode(code)).toEqual([ exit, 0, 0, 0 ])
    })
  });

  describe('given code 3', () => {
    it('should return [write, 0, 0, 0]', () => {
      const code = 3;

      expect(parseCode(code)).toEqual([ write, 0, 0, 0 ])
    });
  });

  describe('given code 104', () => {
    it('should return [read, 1, 0, 0]', () => {
      const code = 104;

      expect(parseCode(code)).toEqual([ read, 1, 0, 0 ])
    })
  });

  describe('given codes 1, 101, 1101, 10101', () => {
    it('should return [add, 0, 0, 0]', () => {
      const code = 1;
      const [ fn, ...modes ] = parseCode(code);

      expect(fn.toString()).toEqual(fnAdd);
      expect(modes).toEqual([ 0, 0, 0 ]);
    });
    it('should return [add, 1, 0, 0]', () => {
      const code = 101;
      const [ fn, ...modes ] = parseCode(code);

      expect(fn.toString()).toEqual(fnAdd);
      expect(modes).toEqual([ 1, 0, 0 ]);
    });
    it('should return [add, 1, 1, 0]', () => {
      const code = 1101;
      const [ fn, ...modes ] = parseCode(code);

      expect(fn.toString()).toEqual(fnAdd);
      expect(modes).toEqual([ 1, 1, 0 ]);
    });
    it('should return [add, 1, 0, 1]', () => {
      const code = 10101;
      const [ fn, ...modes ] = parseCode(code);

      expect(fn.toString()).toEqual(fnAdd);
      expect(modes).toEqual([ 1, 0, 1 ]);
    })
  })
});
