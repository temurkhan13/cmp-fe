module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      // PR 11 — guard against new bare <button> elements after the consolidation.
      // Use the shared <Button> component from src/components/common/Button.jsx.
      files: [
        'src/components/**/*.{js,jsx}',
        'src/modules/**/*.{js,jsx}',
        'src/layout/**/*.{js,jsx}',
      ],
      excludedFiles: ['src/components/common/Button.jsx'],
      rules: {
        'react/forbid-elements': [
          'error',
          {
            forbid: [
              {
                element: 'button',
                message:
                  'Use the shared <Button> from src/components/common/Button.jsx instead of native <button>. See cmp-fe/BUTTON_DISCOVERY.md.',
              },
            ],
          },
        ],
      },
    },
  ],
}
