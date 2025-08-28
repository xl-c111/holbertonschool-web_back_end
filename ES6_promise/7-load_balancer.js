export default function loadBalancer(chinaDownload, USDownload) {
  if (!(chinaDownload instanceof Promise) || !(USDownload instanceof Promise)) {
    return Promise.reject(
      new Error('chinaDownload and USDownload must be promise'),
    );
  }
  return Promise.race([chinaDownload, USDownload]);
}
