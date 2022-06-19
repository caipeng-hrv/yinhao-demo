export async function retry(func: Function, times = 5) {
  return new Promise(async function (resolve, reject) {
    let i = 0;
    while (true) {
      try {
        resolve(await func());
      } catch (error) {
        if (i < 5) {
          i++;
          await sleep(1);
        } else {
          reject(error);
        }
      }
    }
  });
}

export async function sleep(secons: number) {
  return new Promise<void>(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, secons * 1000);
  });
}
