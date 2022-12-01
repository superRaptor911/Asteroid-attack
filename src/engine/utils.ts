export const randRange = (a: number, b: number): number => {
  return a + Math.random() * (b - a);
};

export const float2Int = (a: number): number => {
  return a < 0 ? Math.ceil(a) : a | 0;
};

export const urlToParamsObject = (
  url: string,
): Record<string, string> | null => {
  if (url.indexOf('?') === -1) {
    return null;
  }
  const params: Record<string, string> = {};
  const urlParams = new URLSearchParams(url);
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};
