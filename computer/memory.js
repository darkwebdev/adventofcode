require('./log');

let mem = [];
let changed;

module.exports = {
  read(addr) {
    const value = addr === undefined ? mem : mem[addr];
    return value === undefined ? 0 : value;
  },
  write(addrOrValue, value) {
    if (value === undefined) {
      if (!Array.isArray(addrOrValue)) {
        throw(Error(`Array expected, but found ${addrOrValue}`));
      }
      changed = undefined;
      mem = [...addrOrValue];
      console.debug(`[MEM] ${addrOrValue}`);
    } else {
      changed = addrOrValue;
      mem[addrOrValue] = value;
      console.debug(`[WRITE] ${value} @${addrOrValue}`);
    }
  },
  changed() {
    return changed;
  },
  size() {
    return mem.length;
  }
};
