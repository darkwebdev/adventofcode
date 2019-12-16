let relativeBaseOffset = 0;

module.exports = {
  offset() {
    return relativeBaseOffset;
  },
  adjustOffsetBy(value) {
    console.debug('[OFFSET]', relativeBaseOffset + value);
    relativeBaseOffset += value;
  }
};
