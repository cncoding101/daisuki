"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jestConfig = {
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
exports.default = jestConfig;
//# sourceMappingURL=jest.config.js.map