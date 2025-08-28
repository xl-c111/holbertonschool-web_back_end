export default function updateUniqueItems(map) {
  if (!(map instanceof Map)) {
    throw new TypeError('map must be a Map');
  }
  for (const [name, quantity] of map.entries()) {
    if (quantity === 1) {
      map.set(name, 100);
    }
  }
}
