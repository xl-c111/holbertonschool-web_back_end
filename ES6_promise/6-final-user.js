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
  return Promise.allSettled(promises);
}
