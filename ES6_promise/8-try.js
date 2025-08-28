export default function divideFunction(numerator, denominator) {
  if (typeof numerator !== 'number' || typeof denominator !== 'number') {
    // sync error
    throw new TypeError('numerator and denominator must be numbers');
  }
  if (denominator === 0) {
    throw new Error('cannot divide by 0');
  }
  return numerator / denominator;
}
