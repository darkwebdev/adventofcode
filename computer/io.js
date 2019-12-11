require('./log');

let input = [];
let output;

module.exports = {
  get input() {
    const value = input.shift();
    console.debug('[INPUT]', input);
    return value;
  },
  set input(value) {
    input.push(value);
    console.debug('[INPUT]', input);
  },

  get output() {
    return output;
  },
  set output(value) {
    output = value;
    console.debug('[OUTPUT]', output);
  }
};
