// @ts-ignore
export const generateHash = (n) =>
  [...Array(n)].map((_) => (Math.random() * 10) | 0).join``;
