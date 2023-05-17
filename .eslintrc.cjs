module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:jsx-a11y/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
	],
	plugins: ["react", "@typescript-eslint", "react-refresh"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
	root: true,
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"react-refresh/only-export-components": "warn",
		"react/prop-types": "off",
	},
}
