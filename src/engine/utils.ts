export const randRange = (a: number, b: number): number => {
  return a + Math.random() * (b - a);
};

export const float2Int = (a: number): number => {
  return a < 0 ? Math.ceil(a) : a | 0;
};
