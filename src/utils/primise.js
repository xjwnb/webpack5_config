export function createPromise(num) {
  return new Promise((resolve, reject) => {
    console.log(num);
    resolve(num);
  });
}
