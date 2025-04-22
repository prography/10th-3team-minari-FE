export const objectKeysAsArray = <T extends object>(obj: T): Array<keyof T> => {
  return Array.from(Object.keys(obj) as Array<keyof T>);
};
