export default {
    'src/**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
    'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['prettier --check'],
    'src/**/*.{ts,tsx}': [() => 'tsc --project tsconfig.json'],
}
