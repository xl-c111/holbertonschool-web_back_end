export default function createInt8TypedArray(length, position, value) {
  if (
    typeof length !== 'number'
    || typeof position !== 'number'
    || typeof value !== 'number'
  ) {
    throw new TypeError('length, position and value must be a number');
  }
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);

  // check buffer capacity
  // if (position < 0 || position >= view.byteLength)
  if (position + 1 > view.byteLength) {
    throw new RangeError('Position outside range');
  }
  // setInt8 only writes data into the buffer, not returns data
  view.setInt8(position, value);
  return view;
}
