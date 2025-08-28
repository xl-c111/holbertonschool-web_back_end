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

  if (position + 1 > view.byteLength) {
    throw new RangeError('Position outside range');
  }
  view.setInt8(position, value);
  return view;
}
