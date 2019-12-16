const { read: memRead, write: memWrite } = require('./memory');
const io = require('./io');
const { isAddr, fromAddr } = require('./utils');
const { adjustOffsetBy } = require('./rel-offset');
require('./log');

const paramValue = param => typeof param === 'string' ? memRead(fromAddr(param)) : param;

const evalAndWrite = fn => {
  const customFn = (...params) => {
    if (typeof params[2] !== 'string' || params[2][0] !== '@') {
      throw(Error(`Expected writing address but found ${params[2]}`));
    }
    const addrToWrite = fromAddr(params[2]);
    const paramValues = params.map(paramValue);
    console.debug(`[RUN] ${fn.name}() with ${params} (values: ${paramValues})`);
    const data = fn(...paramValues);

    memWrite(addrToWrite, data);
  };
  Object.defineProperty(customFn, 'name', {
    writable: true,
    value: fn.name
  });

  return customFn;
};

const add = (a, b) => a + b;

const multiply = (a, b) => a * b;

const read = (...params) => {
  io.output = paramValue(params[0]);
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
};

const halt = () => false;

const jumpIfTrue = (...params) => {
  const shouldJump = paramValue(params[0]) !== 0;
  const addr = paramValue(params[1]);

  return shouldJump ? `@${addr}` : void 0;
};

const jumpIfFalse = (...params) => {
  const shouldJump = paramValue(params[0]) === 0;
  const addr = paramValue(params[1]);

  return shouldJump ? `@${addr}` : void 0;
};

const lessThan = (...params) => {
  const value = paramValue(params[0]) < paramValue(params[1]) ? 1 : 0;
  memWrite(fromAddr(params[2]), value);
};

const equals = (...params) => {
  const value = paramValue(params[0]) === paramValue(params[1]) ? 1 : 0;
  memWrite(fromAddr(params[2]), value);
};

const relOffset = (...params) => {
  adjustOffsetBy(paramValue(params[0]));
};

module.exports = {
  1: [ evalAndWrite(add), 3 ],
  2: [ evalAndWrite(multiply), 3 ],
  3: [ write, 1 ],
  4: [ read, 1 ],
  5: [ jumpIfTrue, 2],
  6: [ jumpIfFalse, 2],
  7: [ lessThan, 3 ],
  8: [ equals, 3 ],
  9: [ relOffset, 1 ],
  99: [ halt, 0 ]
};
