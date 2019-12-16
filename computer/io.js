require('./log');

let input = [];
let output = [];

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
  peek() {
    return input[0];
  },

  get output() {
    return output;
  },
  set output(value) {
    output.push(value);
    console.debug('[OUTPUT]', output);
  },

  reset() {
    input = []
    output = [];
    console.debug('[INPUT]', input);
    console.debug('[OUTPUT]', output);
  }
};
