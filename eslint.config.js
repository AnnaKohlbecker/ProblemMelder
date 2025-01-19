/* eslint-disable */

const eslint = require('@eslint/js')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const reactNative = require('eslint-plugin-react-native')
const tslint = require('typescript-eslint')
const custom = require('./.eslint/custom-rules.js')

module.exports = tslint.config(
    eslint.configs.recommended,
    ...tslint.configs.strict,
    ...tslint.configs.stylistic,
    {
        ...react.configs.flat.recommended,
        ...react.configs.flat['jsx-runtime'],
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    reactNative.flat,
    {
        files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        ignores: ['src/**/*.d.ts', '**/*.config.js'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            custom,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,

            // ----- REACT BEST PRACTICES -----
            'react/jsx-uses-vars': 'error',
            'react/react-in-jsx-scope': 'off', // Not required in React 17+
            'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }], // Ensure JSX is in .tsx files
            'react/prop-types': 'off', // Disable prop-types for TypeScript
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',

            // ----- GENERAL BEST PRACTICES -----
            yoda: 'error',
            'no-var': 'error',
            'no-empty': 'error',
            'no-alert': 'error',
            'no-console': 'error',
            'no-debugger': 'error',
            'dot-notation': 'error',
            'default-case': 'error',
            'prefer-const': 'error',
            'no-extra-semi': 'error',
            'require-await': 'error',
            'no-self-assign': 'error',
            'no-else-return': 'error',
            'no-unreachable': 'error',
            'no-self-compare': 'error',
            'no-await-in-loop': 'error',
            'no-empty-pattern': 'error',
            'block-scoped-var': 'error',
            'no-empty-function': 'error',
            'default-case-last': 'error',
            'no-unsafe-negation': 'error',
            'no-unreachable-loop': 'error',
            'no-use-before-define': 'error',
            'no-duplicate-imports': 'error',
            'no-constructor-return': 'error',
            'require-atomic-updates': 'error',
            'no-unexpected-multiline': 'error',
            'no-template-curly-in-string': 'error',
            'no-unmodified-loop-condition': 'error',
            'no-new-native-nonconstructor': 'error',
            'no-constant-binary-expression': 'error',

            // ----- STYLING BEST PRACTICES -----
            eqeqeq: 'error',
            camelcase: 'error',
            semi: ['error', 'never'],
            quotes: ['error', 'single'],

            // ----- TYPESCRIPT BEST PRACTICES -----
            '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable forcing explicit return types
            '@typescript-eslint/no-explicit-any': 'warn', // Warn about the use of 'any'
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'], // Enforce usage of type over interface

            // ----- REACT NATIVE BEST PRACTICES -----
            'react-native/no-unused-styles': 'error', // Detect unused styles in React Native components
            'react-native/split-platform-components': 'warn', // Use platform-specific files (e.g. Button.ios.js)
            'react-native/no-inline-styles': 'warn', // Discourage inline styles in React Native
            'react-native/no-color-literals': 'warn', // Discourage color literals in styles
            'react-native/no-raw-text': 'off', // Warn if raw text is outside <Text> in React Native

            // ----- CUSTOM RULES -----
            'custom/no-direct-font-size': 'error',

            // ----- IMPORT BEST PRACTICES -----
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: 'react-native-paper',
                            importNames: ['TextInput', 'Switch'],
                            message: 'Please use our self written wrapper instead.',
                        },
                        {
                            name: 'react-native',
                            importNames: ['TouchableOpacity', 'Text', 'ActivityIndicator'],
                            message: 'Please use equivalent from `react-native-paper` instead.',
                        },
                        {
                            name: 'date-fns',
                            message:
                                'Please import specific date-fns modules directly (e.g., "date-fns/startOfDay" instead of "date-fns").',
                        },
                    ],
                },
            ],
        },
    },
)
