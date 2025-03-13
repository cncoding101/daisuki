export const unreachable = (): never => {
  throw new Error('unreachable');
};

export const unreachableButIgnore = (): void => {
  /* ignore */
};

export const unreachableWithReturn = <T>(_: never, value: T): T => {
  return value;
};
