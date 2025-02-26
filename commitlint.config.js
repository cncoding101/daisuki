/** To be able to use GitHub merge queue, we should ignore the merge commits github makes */
const MERGE_COMMIT = /^\[[A-Z]{2,}-\d{3,}\]/;
const REVERT_COMMIT = /^Revert/;

module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (commit) => MERGE_COMMIT.test(commit) || REVERT_COMMIT.test(commit),
  ],
  rules: {
    'body-max-line-length': [2, 'always', 500],
    'subject-case': [0, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'chore',
        'style',
        'refactor',
        'ci',
        'test',
        'revert',
      ],
    ],
  },
};