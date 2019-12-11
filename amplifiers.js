const { runOpCode } = require('./computer');
const { write: memWrite } = require('./computer/memory');
const io = require('./computer/io');
const { drawAmp } = require('./computer/log');
const { instructionPointerStart } = require('./computer/const');

module.exports = ({ phases, program }) => phases.reduce((output, phase, i) => {
  io.input = phase;
  io.input = output;
  drawAmp(i, output);
  memWrite(program);

  try {
    runOpCode(instructionPointerStart);
  } catch(e) {
    console.error(e);
    process.exit(0);
  }

  return io.output;
}, 0);
