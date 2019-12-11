const { fromAddr, isAddr } = require('./utils');
const operations = require('./ops');
const { read: memRead } = require('./memory');
const { modes } = require('./const');
const { drawMemAt } = require('./log');

const parseCode = code => {
  console.debug(`[CODE] ${code}`);
  const opCode = code % 100;
  const operation = operations[opCode];

  if (!operation) {
    throw(`Unrecognized opCode: ${opCode}`);
  }

  const paramModes = [ ...String(code).padStart(5, '0') ]
    .slice(0, -2)
    .reverse()
    .map(Number);

  console.debug(`[OPCODE] ${opCode} with ${paramModes}`);

  return [ operation, ...paramModes ];
};

const runOpCode = addr => {
  console.debug(`\n[READ] @${addr}`);
  drawMemAt(addr);

  const memAtAddr = memRead(addr);

  if (memAtAddr === undefined) {
    throw(Error(`No code found at address [${addr}]\nMemory: ${memRead().slice(0, 50)}...`));
  }

  const [ operation, ...paramModes ] = parseCode(memAtAddr);

  const params = paramModes.map((mode, i) => {
    const paramOrAddr = memRead(addr + i + 1);

    return mode === modes.IMMEDIATE ? paramOrAddr : `@${paramOrAddr}`;
  });

  if (operation) {
    operation.name && console.debug(`[RUN] ${operation.name}() with ${params}`);
    const result = operation(...params);

    if (result) {
      isAddr(result) && console.debug(`[JUMP] ${result}`);
      const nextAddr = isAddr(result) ? fromAddr(result) : addr + result;

      runOpCode(nextAddr);
    }
  }
};

module.exports = {
  parseCode,
  runOpCode
};
