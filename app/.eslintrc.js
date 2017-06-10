module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "linebreak-style": 0,
        "max-len": [2, 160, 2, {ignoreComments: true}],
        "indent": 0,
        "object-curly-spacing": 0,
        "no-return-assign": 0,
        "arrow-parens": 0,
        "eol-last": 0,
        "space-before-blocks": 0,
        "comma-dangle": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-indent": 0,
        "react/jsx-tag-spacing": 0,
        "react/jsx-indent-props": 0,
        "jsx-quotes": 0
    },
    "globals": {
        "window": true,
        "EventSource": true,
        "localStorage": true,
        "WebSocket": true
    }
};