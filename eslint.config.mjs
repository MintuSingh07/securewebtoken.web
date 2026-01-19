import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
      // Import rules from previous config, assuming 'import' plugin is handled by next or manually added if needed.
      // 'eslint-plugin-import' is usually not included in 'next/core-web-vitals' directly but 'eslint-config-next' might include it.
      // The previous config explicitly had plugins: ['import'].
    },
  },
]

export default eslintConfig