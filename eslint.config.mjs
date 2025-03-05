import eslint from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import globals from 'globals'
import tslint from 'typescript-eslint'
import custom from './.eslint/custom-rules.mjs'

export default tslint.config(
    eslint.configs.recommended,
    tslint.configs.strictTypeChecked,
    tslint.configs.stylisticTypeChecked,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'],
        settings: {
            react: {
                version: 'detect',
            },
        },
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-native': reactNative,
            custom,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,

            // ----- REACT BEST PRACTICES -----
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/no-danger': 'error',
            'react/jsx-uses-vars': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/jsx-no-useless-fragment': 'error',
            'react/jsx-boolean-value': ['error', 'always'],
            'react/jsx-curly-brace-presence': ['error', 'never'],
            'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],

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
            '@typescript-eslint/unbound-method': 'off',
            '@typescript-eslint/no-base-to-string': 'off',
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/method-signature-style': ['error', 'property'],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            // ----- TYPESCRIPT OVERKILL RULES -----
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-enum-comparison': 'off',
            '@typescript-eslint/no-redundant-type-constituents': 'off',

            // ----- REACT NATIVE BEST PRACTICES -----
            'react-native/no-unused-styles': 'error', // Detect unused styles in React Native components
            'react-native/split-platform-components': 'error', // Use platform-specific files (e.g. Button.ios.js)
            'react-native/no-inline-styles': 'error', // Discourage inline styles in React Native
            'react-native/no-color-literals': 'error', // Discourage color literals in styles
            'react-native/no-raw-text': 'off', // Warn if raw text is outside <Text> in React Native
            'react-native/no-single-element-style-arrays': 'error', // Detect single element style arrays in React Native

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
