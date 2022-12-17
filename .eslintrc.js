module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "react-native/react-native": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "indent": ["error", 2, {
      "ignoredNodes": ["TemplateLiteral"]
    }],
    "react/prop-types": 0,
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/sort-styles": [
      "error",
      "asc",
      {
        "ignoreClassNames": false,
        "ignoreStyleProperties": false
      }
    ]
  }
    
}
