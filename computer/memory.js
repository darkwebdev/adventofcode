require('./console');

let mem = [];

module.exports = {
  read(addr) {
    return addr === undefined ? mem : mem[addr];
  },
  write(addrOrValue, value) {
    if (value === undefined) {
      if (!Array.isArray(addrOrValue)) {
        throw(Error(`Array expected, but found ${addrOrValue}`));
      }
      mem = [...addrOrValue];
      console.debug(`[WRITE] ${addrOrValue} into MEM`);
    } else {
      mem[addrOrValue] = value;
      console.debug(`[WRITE] ${value} @${addrOrValue}`);
    }
  },
  size() {
    return mem.length;
  }
};
