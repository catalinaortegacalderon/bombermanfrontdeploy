module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "airbnb-base",
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": "latest",
        "requireConfigFile": false,
        "babelOptions": {
            "presets": ["@babel/preset-react"]
        }
    },
    "rules": {
        "import/no-extraneous-dependencies": "off"
    }
}
