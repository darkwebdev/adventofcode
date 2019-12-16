const { isAddr, fromAddr, colored, range } = require('./utils');
const { read: memRead, size: memSize, changed: memChanged } = require('./memory');
const { colors } = require('./const');
const { peek } = require('./io');
const { offset } = require('./rel-offset');

const MaxAddrs = 30;
const withParams = (fnName, params) => ({
  write: `write:${peek()}->${params[0]}`,
  read: `read<-${params[0]}`,
  add: `${params[0]}+${params[1]}->${params[2]}`,
  equals: `${params[0]}==${params[1]}->${params[2]}`,
  relOffset: `offset=${offset()+(isAddr(params[0]) ? fromAddr(params[0]) : params[0])}`
}[fnName] || `${fnName}(${params})`);

module.exports.drawMemAt = (addr, op, params) => {
  const minAddr = Math.max(addr-(Math.floor(MaxAddrs/2)), 0);
  const maxAddr = Math.min(addr+(Math.ceil(MaxAddrs/2)), memSize());
  const opName = op.name || (typeof op === 'function' ? op().name : 'Error');
  const changedAddr = memChanged();
  const isParam = i => range(params.length).some(n => i === addr + n + 1);
  const isParamAddr = i => params.some(p => isAddr(p) && fromAddr(p) === i);

  const [ memParts, indexes, pointer, ops ] = range(minAddr, maxAddr)
    .reduce(([ memParts, indexes, pointer, ops ], i) => {
      const isCurrent = i === addr;
      const hasChanged = changedAddr === i;
      const color = (hasChanged && colors.SUCCESS) || (isParam(i) && colors.WARNING)
        || (isParamAddr(i) && colors.DANGER) || (isCurrent && colors.HIGHLIGHT);
      const curPointer = isCurrent ? '↑' : ' ';
      const curOperation = isCurrent ? withParams(opName, params) : ' ';
      const [ memPart, index, pointerChar, operation ] = [ memRead(i), i, curPointer, curOperation ].map(str => {
        const paddedStr = String(str).padStart(6, ' ');
        return color ? colored(paddedStr, color) : paddedStr;
      });

    return [
      [ ...memParts, memPart ],
      [ ...indexes, index ],
      [ ...pointer, pointerChar ],
      [ ...ops, operation ]
    ];
  }, [[], [], [], []]);

  console.log(`
   #  ${indexes.join('')}
   <-[${memParts.join('')}]->
      ${pointer.join('')}
   fn:${ops.join('')}
   `);
};

module.exports.drawAmp = (i, output) => {
  const ampChar = String.fromCharCode('A'.charCodeAt(0) + i);
  const message = `    ${output}
  ↓
O-------O
| Amp ${ampChar} |
O-------O
  ↓`;

  console.log(message);
};
