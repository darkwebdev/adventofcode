const splitNumber = n => n ? [ ...splitNumber(Math.floor(n/10)), n % 10 ] : [];
module.exports.splitNumber = splitNumber;

const splitByNumber = (str, num) => str.length > num
  ? [str.slice(0, num), ...splitByNumber(str.slice(num), num)]
  : (str.length ? [str] : []);
module.exports.splitByNumber = splitByNumber;

module.exports.isAddr = addr => typeof addr === 'string' && addr[0] === '@';
module.exports.fromAddr = addr => parseInt(addr.slice(1));
module.exports.range = (startOrEnd, end) => [...Array(end || startOrEnd).keys()].slice(end ? startOrEnd : 0);
module.exports.colored = (char, color) => `\x1b[${color}m${char}\x1b[0m`;
module.exports.intersection = (arr1, arr2) => arr1.filter(x => arr2.includes(x));
