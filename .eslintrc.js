module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["**/*.md", "**/*.scss"],

  rules: {
    "no-console": "warn",
    "no-undef": "off",
  },
};
