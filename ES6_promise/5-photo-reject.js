export default function uploadPhoto(fileName) {
  if (typeof fileName !== 'string') {
    return Promise.reject(new TypeError('fileName must be a string'));
  }
  return Promise.reject(new Error(`${fileName} cannot be processed`));
}
