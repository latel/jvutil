export const compare = (v1: string, v2: string) => {
  let v1Apart = v1.split(".");
  let v2Apart = v2.split(".");
  const len = Math.max(v1Apart.length, v2Apart.length);

  while (v1Apart.length < len) {
    v1Apart.push("0");
  }
  while (v2Apart.length < len) {
    v2Apart.push("0");
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1Apart[i]);
    const num2 = parseInt(v2Apart[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
};

export const gt = (v1 = "", v2 = "") => [1].includes(compare(v1, v2));
export const gte = (v1 = "", v2 = "") => [1, 0].includes(compare(v1, v2));
export const lt = (v1 = "", v2 = "") => [-1].includes(compare(v1, v2));
export const lte = (v1 = "", v2 = "") => [-1, 0].includes(compare(v1, v2));
