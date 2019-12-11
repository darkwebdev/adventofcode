const { read: memRead, write: memWrite } = require('./memory');
const io = require('./io');
const { isAddr, fromAddr } = require('./utils');
require('./console');

const paramValue = param => typeof param === 'string' ? memRead(fromAddr(param)) : param;

const evalAndWrite = fn => (...params) => {
  if (typeof params[2] !== 'string' || params[2][0] !== '@') {
    throw(Error(`Expected writing address but found ${params[2]}`));
  }
  const addrToWrite = fromAddr(params[2]);
  const paramValues = params.map(paramValue);
  console.debug(`[RUN] ${fn.name}() with ${params} (values: ${paramValues})`);
  const data = fn(...paramValues);

  memWrite(addrToWrite, data);

  return 4;
};

const add = (a, b) => a + b;

const multiply = (a, b) => a * b;

const read = (...params) => {
  io.output = paramValue(params[0]);
  return 2;
};

const write = (...params) => {
  if (!isAddr(params[0])) {
    throw(Error(`Address expected, but found ${params[0]}`));
  }

  const value = io.input;

  if (value === undefined) {
    throw(Error(`Expected a value to write`));
  }

  memWrite(fromAddr(params[0]), value);

  return 2;
};

const halt = () => 0;

const jumpIfTrue = (...params) => {
  const shouldJump = paramValue(params[0]) !== 0;
  const addr = paramValue(params[1]);

  return shouldJump ? `@${addr}` : 3;
};

const jumpIfFalse = (...params) => {
  const shouldJump = paramValue(params[0]) === 0;
  const addr = paramValue(params[1]);

  return shouldJump ? `@${addr}` : 3;
};

const lessThan = (...params) => {
  const value = paramValue(params[0]) < paramValue(params[1]) ? 1 : 0;
  memWrite(fromAddr(params[2]), value);

  return 4;
};

const equals = (...params) => {
  const value = paramValue(params[0]) === paramValue(params[1]) ? 1 : 0;
  memWrite(fromAddr(params[2]), value);

  return 4;
};

module.exports = {
  1: evalAndWrite(add),
  2: evalAndWrite(multiply),
  3: write,
  4: read,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equals,
  99: halt
};
