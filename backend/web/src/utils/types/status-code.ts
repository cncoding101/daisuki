type ExtractStatusCodes<T> = T extends { responses: infer R }
  ? keyof R extends string | number
    ? keyof R
    : never
  : never;

export { ExtractStatusCodes };
