export default function updateUniqueItems(map) {
  // there is only 1 case that can't be processed, map is not a Map
  if (!(map instanceof Map)) {
    throw new TypeError('Cannot process');
  }
  for (const [name, quantity] of map.entries()) {
    if (quantity === 1) {
      map.set(name, 100);
    }
  }
  return map;
}
