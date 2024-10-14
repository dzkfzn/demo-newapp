module.exports = {
    parserOptions: {
        project: ['./tsconfig.json'],
    },
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'import/prefer-default-export': 'off',
        'no-param-reassign': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
    extends: [
        'next/core-web-vitals',
        'airbnb-base',
        'airbnb-typescript',
        'plugin:prettier/recommended',
    ],
};
