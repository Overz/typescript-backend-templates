module.exports = {
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 72],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 72],
    'header-max-length': [2, 'always', 50],
    'scope-empty': [2, 'never'],
    'scope-min-length': [2, 'always', 2],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor', 'docs', 'chore']],
    'type-case': [2, 'always', 'lower-case'],
  },
};
