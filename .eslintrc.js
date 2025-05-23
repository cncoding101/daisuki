const path = require('path');

const noRestrictedImportsConfig = {
  paths: [
    {
      message: 'Please import allowed functions from `lodash/[fn]`',
      name: 'lodash',
    },
  ],
  patterns: [],
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:prettier/recommended'],
  overrides: [
    {
      files: '**/*.{ts,tsx,js,jsx}',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        project: path.join(__dirname, './tsconfig.eslint.json'),
      },
      plugins: ['import', 'prefer-arrow'],
      rules: {
        'import/order': [
          1,
          {
            groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
            pathGroups: [
              { pattern: 'components/**', group: 'internal' },
              { pattern: 'store/**', group: 'internal' },
              { pattern: 'services/**', group: 'internal' },
              { pattern: 'utils/**', group: 'internal', position: 'after' },
            ],
            pathGroupsExcludedImportTypes: ['internal'],
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            custom: {
              match: false,
              regex: 'Repository$',
            },
            format: null,
            selector: ['variable', 'typeAlias', 'class'],
          },
          {
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            selector: 'variable',
            trailingUnderscore: 'forbid',
          },
          {
            format: ['PascalCase'],
            selector: 'typeLike',
          },
          {
            filter: {
              match: false,
              regex: '^[a-z\\-]*$',
            }, // filter out kebab-case, i.e. allow kebab-case
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allowSingleOrDouble',
            selector: 'typeProperty',
          },
        ],
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        '@typescript-eslint/strict-boolean-expressions': [
          'error',
          {
            allowNullableObject: false,
            allowNumber: false,
            allowString: false,
          },
        ],
        'import/no-unused-modules': [
          'off', // Turn on for cleanup. Make sure to prepend `NODE_OPTIONS=--max-old-space-size=8192 ` to the `lint` script in the root `package.json`.
          {
            ignoreExports: [],
            unusedExports: true,
          },
        ],
        'no-duplicate-imports': 'off',
        'no-negated-condition': 'error',
        'no-param-reassign': [
          'error',
          {
            ignorePropertyModificationsForRegex: ['^draft', 'acc', 'req', 'request'],
            props: true,
          },
        ],
        'no-console': 'error',
        'no-restricted-imports': [
          'error',
          {
            ...noRestrictedImportsConfig,
            patterns: [...noRestrictedImportsConfig.patterns],
          },
        ],
        'prefer-arrow/prefer-arrow-functions': [
          'error',
          {
            disallowPrototype: true,
            singleReturnOnly: false,
          },
        ],
      },
    },
    {
      files: ['apps/backend/web/**/*.{ts,tsx,js,jsx}'],
      excludedFiles: ['apps/backend/web/load-env.js'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: path.join(__dirname, './apps/backend/web/tsconfig.json'),
      },
    },
    {
      files: ['apps/frontend/**/*.{ts,tsx,js,jsx}'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
      parserOptions: {
        project: path.join(__dirname, './apps/frontend/tsconfig.json'),
      },
      plugins: ['@typescript-eslint', 'react-refresh'],
      rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/button-has-type': 'off',
        'no-restricted-imports': [
          'error',
          {
            ...noRestrictedImportsConfig,
            paths: [...noRestrictedImportsConfig.paths],
            patterns: [...noRestrictedImportsConfig.patterns],
          },
        ],
      },
    },
    {
      files: ['apps/services/users/**/*.{ts,tsx,js,jsx}'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      parserOptions: {
        project: path.join(__dirname, './apps/services/users/tsconfig.json'),
      },
    },
    {
      files: [
        '**/jest.config.js',
        '**/vitest.config*.js',
        '**/vitest.workspace.js',
        '**/webpack.config.js',
        '**/webpack.config.node.js',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'node/no-extraneous-require': 'off',
        'react-hooks/exhaustive-deps': [
          'error',
          {
            // This is a regex!
            // https://github.com/facebook/react/blob/50263d3273b6fc983acc5b0fd52e670399b248b1/packages/eslint-plugin-react-hooks/src/ExhaustiveDeps.js#L41-L46
            additionalHooks:
              '^(useAsync|useAsyncRetry|useAsyncFn|useStable|useHotkeys|useAsyncEitherFn|useAsyncEither|useEffectWithAbort|useDisposableWithAsyncSetup|useDeepEqualMemo|useDisposableMemo|useSsrSafeMemo|useDrop)$',
          },
        ],
      },
    },
    {
      files: ['**/setupTests.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/scripts/*'],
      rules: {
        'node/no-process-exit': 'off',
      },
    },
    {
      files: ['*.spec.{ts,tsx}'],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'off',
        'no-restricted-globals': 'off',
      },
    },
    {
      files: ['vitest.{config,workspace}.js', 'vitest.config.{integration,unit}.js'],
      rules: {
        'filenames/match-exported': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
