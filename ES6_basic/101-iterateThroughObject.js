export default function iterateThroughObject(reportWithIterator) {
  // [...interable]: converts an interable into array
  return [...reportWithIterator].join(' | ');
}
