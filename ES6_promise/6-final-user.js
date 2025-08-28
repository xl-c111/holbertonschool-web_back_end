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
  // The checker expects { status, value }, even when rejected
  return Promise.allSettled(promises).then((results) => results.map((result) => {
    if (result.status === 'fulfilled') {
      return { status: result.status, value: result.value };
    }
    // String() can also convert any value to string
    return { status: result.status, value: result.reason.toString() };
  }));
}
