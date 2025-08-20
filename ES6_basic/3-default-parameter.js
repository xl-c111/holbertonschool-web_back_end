export default function getSumOfHoods(
  initialNumber = 34,
  expansion1989 = 0,
  expansion2019 = 0
) {
  if (expansion1989 === 0) {
    expansion1989 = 89;
  }

  if (expansion2019 === 0) {
    expansion2019 = 19;
  }
  return initialNumber + expansion1989 + expansion2019;
}
