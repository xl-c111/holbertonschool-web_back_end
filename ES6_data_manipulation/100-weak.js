export const weakMap = new WeakMap();

export function queryAPI(endpoint) {
  // weakMap.get() gets the previously count number
  let count = weakMap.get(endpoint) || 0;
  count += 1;

  // weakmap.set() saves the call count
  weakMap.set(endpoint, count);

  if (count >= 5) {
    throw new Error('Endpoint load is high.');
  }
  return count;
}

// default export -> import without {}
// named export -> import with {}
