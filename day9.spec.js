const { runOpCode } = require('./computer');
const { write: memWrite } = require('./computer/memory');
const io = require('./computer/io');

const program = [109,1, 204,-1, 1001,100,1,100, 1008,100,16,101, 1006,101,0, 99];
const bigNumbers = [104,1125899906842624,99];
const int16 = [1102,34915192,34915192,7,4,7,99,0];

describe('day 9', () => {
  describe('computer', () => {
    it('should produce a copy of itself ', () => {
      io.reset();
      memWrite(program);

      runOpCode();

      expect(io.output).toEqual(program);
    });

    it('should handle big numbers', () => {
      io.reset();
      memWrite(bigNumbers);

      runOpCode();

      expect(io.output).toEqual([1125899906842624]);
    });

    it('should handle 16-bit numbers', () => {
      io.reset();
      memWrite(int16);

      runOpCode();

      expect(io.output).toEqual([1219070632396864]);
    })
  })
});
