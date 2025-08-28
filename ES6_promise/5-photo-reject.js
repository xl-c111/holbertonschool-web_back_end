export default function uploadPhoto(fileName) {
  if (typeof fileName !== 'string') {
    // function expects to return a promise whether resolved or rejected
    // throw new TypeError will throw synchronously, not return a promise
    // Promise.reject(reason) creates a rejected Promise with the given reason
    // returns a promise object that can be used with .then/.catch/await
    return Promise.reject(new TypeError('fileName must be a string'));
  }
  return Promise.reject(new Error(`${fileName} cannot be processed`));
}
