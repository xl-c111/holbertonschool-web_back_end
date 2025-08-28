export default function cleanSet(set, startString) {
  if (!(set instanceof Set)) {
    throw new TypeError('set must be a Set');
  }
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
