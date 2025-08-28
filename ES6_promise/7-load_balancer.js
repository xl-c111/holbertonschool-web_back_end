export default function loadBalancer(chinaDownload, USDownload) {
  if (!(chinaDownload instanceof Promise) || !(USDownload instanceof Promise)) {
    return Promise.reject(
      new Error('chinaDownload and USDownload must be promise'),
    );
  }
  // Promise.race([ ... ]) takes an array of promises
  // it settles as soon as the first promise settles, no matter resolve or reject
  return Promise.race([chinaDownload, USDownload]);
}
