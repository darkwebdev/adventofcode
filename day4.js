const maxNum = 767346;
const minNum = 231832;

const range = (start, end) => [...Array(end+1).keys()].slice(start).map(String);

const filters = {
  onlyDoubles: n => n.match(/(\d)\1/),
  removeTriplesOrMore: n => n.replace(/(\d)(\1){2,4}/g, ''),
  neverDecreasing: n => [...n].reduce((prev, cur) => prev === false || cur < prev ? false : cur, 0)
};

console.log('starting...');

const onlyDoubles = range(minNum, maxNum)
  .filter(filters.neverDecreasing)
  .map(filters.removeTriplesOrMore)
  .filter(filters.onlyDoubles);

console.log(onlyDoubles.length);
