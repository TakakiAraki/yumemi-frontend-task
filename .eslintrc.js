module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:storybook/recommended",
  ],
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
  ignorePatterns: ["**/*.md", "**/*.scss", "**/*.mdx", "**/*.svg", "**.d.ts"],
  rules: {
    "no-console": "warn",
    "no-undef": "off",
    "no-unused-vars": "off",
  },
};
