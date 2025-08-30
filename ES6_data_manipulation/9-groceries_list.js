const grocerieslist = [
  'Apples',
  10,
  'Tomatoes',
  10,
  'Pasta',
  1,
  'Rice',
  1,
  'Banana',
  5
];

export default function groceriesList() {
  const map = new Map();
  for (let i = 0; i < grocerieslist.length; i += 2) {
    const name = grocerieslist[i];
    const quantity = grocerieslist[i + 1];
    map.set(name, quantity);
  }
  return map;
}
