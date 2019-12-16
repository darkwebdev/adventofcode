const { runOpCode } = require('./computer');
const { write: memWrite } = require('./computer/memory');
const io = require('./computer/io');

const program = require('./day9.input');

io.input = 2;
memWrite(program);

runOpCode();

console.log(io.output);
