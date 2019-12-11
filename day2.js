const instructionPointerStart = 0;
const instructionsNumber = 4;

const originalInts =
  // [1,9,10,3, 2,3,11,0, 99, 30,40,50];
  [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,1,19,5,23,1,23,9,27,2,27,6,31,1,31,6,35,2,35,9,39,1,6,39,43,2,10,43,47,1,47,9,51,1,51,6,55,1,55,6,59,2,59,10,63,1,6,63,67,2,6,67,71,1,71,5,75,2,13,75,79,1,10,79,83,1,5,83,87,2,87,10,91,1,5,91,95,2,95,6,99,1,99,6,103,2,103,6,107,2,107,9,111,1,111,5,115,1,115,6,119,2,6,119,123,1,5,123,127,1,127,13,131,1,2,131,135,1,135,10,0,99,2,14,0,0];
// mem[1] = 12;
// mem[2] = 2;
let ints;

const inst = fn =>
  (param1addrPos, param2addrPos, resultAddrPos) => {
    const param1addr = ints[param1addrPos];
    const param2addr = ints[param2addrPos];
    const resultAddr = ints[resultAddrPos];

    ints[resultAddr] = fn(ints[param1addr], ints[param2addr]);

    return true;
  };

let instructions = [];
instructions[1] = inst((a, b) => a + b);
instructions[2] = inst((a, b) => a * b);
instructions[99] = () => false;

const executeOpcode = i => {
  const opcode = ints[i];
  const runOpcode = instructions[opcode];
  if (runOpcode) {
    const result = runOpcode(i + 1, i + 2, i + 3);

    if (result) {
      executeOpcode(i+ instructionsNumber);
    }
  }
};

for (let noun=0; noun<100; noun++)
  for (let verb=0; verb<100; verb++) {
    ints = [...originalInts];
    ints[1] = noun;
    ints[2] = verb;
    executeOpcode(instructionPointerStart);
    if (ints[instructionPointerStart] === 19690720)
      console.log(100 * noun + verb);
  }

