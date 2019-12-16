const { fromAddr, isAddr } = require('./utils');
const operations = require('./ops');
const { read: memRead } = require('./memory');
const { modes, MaxParamsNumber } = require('./const');
const { drawMemAt } = require('./draw');
const { offset } = require('./rel-offset');
let counter = 0;

const parseCode = code => {
  // console.debug(`[CODE] ${code}`);
  const opCode = code % 100;
  const [ operation, paramsNum ] = operations[opCode] || [];

  if (!operation) {
    throw(`Unrecognized opCode: ${opCode}`);
  }

  const paramModes = [ ...String(code).padStart(5, '0') ]
    .slice(MaxParamsNumber-paramsNum, -2)
    .reverse()
    .map(Number);

  // console.debug(`[OPCODE] ${opCode} with ${paramModes}`);

  return [ operation, ...paramModes ];
};

const paramFromMode = (param, mode) => ({
  [modes.RELATIVE]: `@${param+offset()}`,
  [modes.IMMEDIATE]: param,
  [modes.POSITIONAL]: `@${param}`
}[mode]);

const runOpCode = (addr = 0) => {
  console.log('RUN #' + counter++)
  // console.debug(`\n[READ] @${addr}`);
  const memAtAddr = memRead(addr);

  if (memAtAddr === undefined) {
    throw(Error(`No code found at address [${addr}]\nMemory: ${memRead().slice(0, 50)}...`));
  }

  const [ operation, ...paramModes ] = parseCode(memAtAddr);

  const params = paramModes.map((mode, i) => {
    const paramOrAddr = memRead(addr + i + 1);

    return paramFromMode(paramOrAddr, mode);
  });

  drawMemAt(addr, operation, params);

  if (operation) {
    operation.name && console.debug(`[RUN] ${operation.name}() with ${params}`);
    const result = operation(...params);

    if (result !== false) {
      isAddr(result) && console.debug(`[JUMP] ${result}`);
      const nextAddr = isAddr(result) ? fromAddr(result) : addr + paramModes.length + 1;

      if (process.env.STEP) {
        process.stdout.write('Press enter for the next step...');
        process.stdin.once('data', runOpCode.bind(null, nextAddr));
      } else {
        runOpCode(nextAddr);
      }
    }
  }
};

module.exports = {
  parseCode,
  runOpCode
};
