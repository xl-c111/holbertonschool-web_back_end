export default function getFullResponseFromAPI(boolean) {
  return new Promise((resolve, reject) => {
    if (boolean === true) {
      resolve({ status: 200, body: 'Success' });
    } else {
      reject(Error('The fake API is not working currently'));
    }
  });
}
