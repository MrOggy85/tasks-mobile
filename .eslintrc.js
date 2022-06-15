module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:react/all',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'prettier/prettier': 0,

    // React
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.tsx'],
      },
    ],
    'react/jsx-max-depth': 0,
    'react/jsx-no-literals': 0,
    'react/jsx-sort-props': [
      2,
      {
        noSortAlphabetically: true,
      },
    ],
    'react/jsx-no-bind': 0,
    'react/forbid-component-props': [
      2,
      {
        forbid: [],
      },
    ],
    'react/no-multi-comp': 0,
    'react/require-default-props': 0,

    // React Native
    'react-native/sort-styles': 0,
    'react-native/no-color-literals': 0,

    '@typescript-eslint/explicit-function-return-type': 0,
  },
};
