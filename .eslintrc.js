module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['airbnb', 'airbnb/hooks'],
  plugins: ['react'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off', // Not required in React 17 with JSX Transformation
    'react/jsx-one-expression-per-line': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
