const splitNumber = n => n ? [ ...splitNumber(Math.floor(n/10)), n % 10 ] : [];
module.exports.splitNumber = splitNumber;

module.exports.isAddr = addr => typeof addr === 'string' && addr[0] === '@';
module.exports.fromAddr = addr => parseInt(addr.slice(1));
module.exports.range = (start, end) => [...Array(end).keys()].slice(start);
module.exports.colored = c => `\x1b[36m${c}\x1b[0m`;
