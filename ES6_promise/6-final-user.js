import signUpUser from './4-user-promise';
import uploadPhoto from './5-photo-reject';

export default function handleProfileSignup(firstName, lastName, fileName) {
  if (
    typeof firstName !== 'string'
    || typeof lastName !== 'string'
    || typeof fileName !== 'string'
  ) {
    return Promise.reject(
      new TypeError('firstName, lastName, fileName should be string'),
    );
  }

  const promises = [signUpUser(firstName, lastName), uploadPhoto(fileName)];
  // allSettled returns an array of results with either { status, value } or { status, reason }
  // .map() iterates over each result in the array and transform it into a new object
  return Promise.allSettled(promises).then((results) => results.map((result) => {
    if (result.status === 'fulfilled') {
      return { status: result.status, value: result.value };
    }
    // reason is an Error object, .toString() ensures that the rejection reason is stored as a string
    return { status: result.status, value: result.reason.toString() };
  }));
}

/* Logic
1, wait for all promises are settled, whether resolved or reject
2, transform each result into a uniform object {status, value}
   - if fullfilled, keep the value
   - if rejected, convert reason into a string
 */
