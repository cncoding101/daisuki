// jest.config.ts
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  roots: ['<rootDir>'],
  modulePaths: ['./'], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/load-env.js'],
};

export default jestConfig;
