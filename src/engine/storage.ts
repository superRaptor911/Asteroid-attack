const storage = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setStorage = (key: string, value: any): void => {
  storage[key] = value;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStorage = (key: string): any | undefined => {
  return storage[key];
};
