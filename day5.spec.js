const { runOpCode } = require('./computer');
const { write: memWrite } = require('./computer/memory');
const io = require('./computer/io');
const { instructionPointerStart } = require('./computer/const');

const echo = [ 3,0,4,0, 99 ];
const sum = [ 1101,2,3,7, 4,7, 99 ];
const mult = [ 2,7,8,9, 4,9, 99, 4, 5 ];
const equalTo8pos = [ 3,9, 8,9,10,9, 4,9, 99, -1,8 ];
const lessThan8pos = [ 3,9, 7,9,10,9, 4,9, 99, -1,8 ];
const equalTo8im = [ 3,3, 1108,-1,8,3, 4,3, 99 ];
const lessThan8im = [ 3,3, 1107,-1,8,3, 4,3, 99 ];
const jumpIfFalse = [ 3,12, 6,12,15, 1,13,14,13, 4,13, 99, -1,0,1,9 ];
const jumpIfTrue = [ 3,3, 1105,-1,9, 1101,0,0,12, 4,12, 99, 1 ];
const compareTo8 = [ 3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31, 1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104, 999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99 ];

describe('day 5', () => {
  describe('echo(1)', () => {
    it('should output 1', () => {
      memWrite(echo);
      io.input = 1;
      runOpCode(instructionPointerStart);
      expect(io.output).toEqual(1);
    })
  });

  describe('add(2, 3)', () => {
    it('should return 5', () => {
      memWrite(sum);
      runOpCode(instructionPointerStart);
      expect(io.output).toEqual(5);
    })
  });

  describe('mult(4, 5)', () => {
    it('should return 20', () => {
      memWrite(mult);
      runOpCode(instructionPointerStart);
      expect(io.output).toEqual(20);
    })
  })

  describe('equalTo8pos', () => {
    describe('given input 8', () => {
      it('should output 1', () => {
        memWrite(equalTo8pos);
        io.input = 8;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(1);
      })
    });
    describe('given input 5', () => {
      it('should output 0', () => {
        memWrite(equalTo8pos);
        io.input = 5;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(0);
      })
    });
  });

  describe('equalTo8im', () => {
    describe('given input 8', () => {
      it('should output 1', () => {
        memWrite(equalTo8im);
        io.input = 8;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(1);
      })
    });
    describe('given input 5', () => {
      it('should output 0', () => {
        memWrite(equalTo8im);
        io.input = 5;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(0);
      })
    });
  });

  describe('lessThan8pos', () => {
    describe('given input 8', () => {
      it('should output 0', () => {
        memWrite(lessThan8pos);
        io.input = 8;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(0);
      })
    });
    describe('given input 5', () => {
      it('should output 1', () => {
        memWrite(lessThan8pos);
        io.input = 5;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(1);
      })
    });
  });

  describe('lessThan8im', () => {
    describe('given input 8', () => {
      it('should output 0', () => {
        memWrite(lessThan8im);
        io.input = 8;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(0);
      })
    });
    describe('given input 5', () => {
      it('should output 1', () => {
        memWrite(lessThan8im);
        io.input = 5;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(1);
      })
    });
  });

  describe('jumpIfFalse', () => {
    describe('given input 0', () => {
      it('should output 0', () => {
        memWrite(jumpIfFalse);
        io.input = 0;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(0);
      })
    });
    describe('given input 5', () => {
      it('should output 1', () => {
        memWrite(jumpIfFalse);
        io.input = 5;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(1);
      })
    });
  });

  describe('jumpIfTrue', () => {
    describe('given input 0', () => {
      it('should output 0', () => {
        memWrite(jumpIfTrue);
        io.input = 0;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(0);
      })
    });
    describe('given input 5', () => {
      it('should output 1', () => {
        memWrite(jumpIfTrue);
        io.input = 5;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(1);
      })
    });
  });

  describe('compareTo8', () => {
    describe('given input 8', () => {
      it('should output 1000', () => {
        memWrite(compareTo8);
        io.input = 8;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(1000);
      })
    });
    describe('given input 4', () => {
      it('should output 999', () => {
        memWrite(compareTo8);
        io.input = 4;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(999);
      })
    });
    describe('given input 10', () => {
      it('should output 1001', () => {
        memWrite(compareTo8);
        io.input = 10;
        runOpCode(instructionPointerStart);
        expect(io.output).toEqual(1001);
      })
    });
  });
});
