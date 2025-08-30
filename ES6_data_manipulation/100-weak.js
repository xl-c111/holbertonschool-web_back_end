export const weakMap = new WeakMap();

export function queryAPI(endpoint) {
  // weakMap.get(key) gets the previously count number
  // will return the value for the key
  let count = weakMap.get(endpoint) || 0;
  count += 1;

  // weakmap.set(key, value) saves the call count
  // key must be an obj
  weakMap.set(endpoint, count);

  if (count >= 5) {
    throw new Error('Endpoint load is high.');
  }
  return count;
}

// default export -> import without {}
// named export -> import with {}
