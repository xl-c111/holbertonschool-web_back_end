export default function getResponseFromAPI() {
  return new Promise((boolean) => {
    const success = true;
    if (success) {
      resolve('Response received');
    } else {
      reject(new Error('API call failed'));
    }
  });
}
