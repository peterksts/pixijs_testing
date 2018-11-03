export function arrayEquals(array1: Array<any>, array2: Array<any>): Promise<void> {
  return new Promise(((resolve1, reject1) => {
    if (!array1.length && !array2.length) {
      return resolve1();
    }

    if (array1.length !== array2.length) {
      return reject1();
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return reject1();
      }
    }

    return resolve1();
  }));
}
