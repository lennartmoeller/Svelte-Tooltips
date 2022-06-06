module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		ecmaVersion: 2021, // latest version
		tsconfigRootDir: __dirname,
		extraFileExtensions: ['.svelte']
	},
	env: {
		es6: true,
		browser: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	settings: {
		'svelte3/typescript': require('typescript'),
		// ignore style tags in Svelte because of Tailwind CSS
		// See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
		'svelte3/ignore-styles': () => true
	},
	plugins: [
		'svelte3',
		'@typescript-eslint',
		'eslint-plugin-tsdoc'
	],
	ignorePatterns: [
		'.eslintrc.js',
		'webpack.config.js',
		'node_modules'
	],
	rules: {
		"tsdoc/syntax": "warn"
	}
}