import js from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwind from 'eslint-plugin-tailwindcss'
import neostandard from 'neostandard'
import ts from 'typescript-eslint'

export default [
  ...neostandard(),
  ...tailwind.configs['flat/recommended'],
  ...ts.configs.recommended,
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': 'error',
    },
  },
]
