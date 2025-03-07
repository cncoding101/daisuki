export const unreachable = (_: never): never => {
  throw new Error('unreachable');
};

export const unreachableButIgnore = (_: never): void => {
  /* ignore */
};

export const unreachableWithReturn = <T>(_: never, value: T): T => {
  return value;
};
