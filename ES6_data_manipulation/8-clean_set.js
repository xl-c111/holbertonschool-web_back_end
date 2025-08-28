export default function cleanSet(set, startString) {
  if (!(set instanceof Set)) {
    throw new TypeError('set must be a Set');
  }
  // checks startString is not a string(e,g. [], {}, 123) or startString is empty
  // (!startString) only checks empty string and undefined-like cases
  if (typeof startString !== 'string' || startString.length === '') {
    return '';
  }

  const rest = [];
  for (const element of set) {
    if (typeof element === 'string' && element.startsWith(startString)) {
      rest.push(element.slice(startString.length));
    }
  }
  return rest.join('-');
}
