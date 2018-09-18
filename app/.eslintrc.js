module.exports = {
    "extends": "airbnb",
    "rules": {
        "linebreak-style": 0,
        "max-len": [2, 160, 2, {ignoreComments: true}],
        "indent": 0,
        "object-curly-spacing": 0,
        "object-curly-newline": 0,
        "arrow-parens": 0,
        "react/jsx-indent": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-tag-spacing": 0,
        "react/jsx-indent-props": 0,
        "react/prop-types": 0,
        "comma-dangle": 0,
        "no-confusing-arrow": 0,
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 0,
        "import/named": 0,
    },
    "globals": {
        "window": true,
        "EventSource": true,
        "localStorage": true,
        "WebSocket": true,
        "fetch": true
    }
};