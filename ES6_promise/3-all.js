import { uploadPhoto, createUser } from './utils.js';

export default function handleProfileSignup() {
  // Promise.all() takes an array of promises as parameter.
  return (
    Promise.all([uploadPhoto(), createUser()])
      // if all resolve, return array of results;
      .then(([photo, user]) => {
        console.log(`${photo.body} ${user.firstName} ${user.lastName}`);
      })
      // if any reject, reject with error
      .catch(() => {
        console.log('Signup system offline');
      })
  );
}

// Promise.all([promise1, promise2, promise3])
// .then((values) => {// values is an array of results})
// .catch(error => {// first rejection error});
