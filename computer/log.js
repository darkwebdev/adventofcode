const { colored, range } = require('./utils');
const { read: memRead, size: memSize } = require('./memory');
const operations = require('./ops');

const MaxAddrs = 20;

module.exports.drawMemAt = addr => {
  const minAddr = Math.max(addr-(Math.floor(MaxAddrs/2)), 0);
  const maxAddr = Math.min(addr+(Math.ceil(MaxAddrs/2)), memSize());
  const operation = operations[memRead(addr) % 100] || 'Error';

  const [ memParts, indexes, pointer, ops ] = range(minAddr, maxAddr)
    .reduce(([ memParts, indexes, pointer, ops ], i) => {
    const isCurrent = i === addr;
      const curPointer = isCurrent ? '↑' : ' ';
      const curOperation = isCurrent ? operation : ' ';
      const [ memPart, index, pointerChar ] = [ memRead(i), i, curPointer, curOperation ].map(str => {
        const paddedStr = String(str).padStart(6, ' ');
        return isCurrent ? colored(paddedStr) : paddedStr;
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
   ${ops.join('')}
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
