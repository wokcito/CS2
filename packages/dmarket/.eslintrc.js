module.exports = {
	root: true,
	extends: [require.resolve('@cs2/eslint-config-custom')],
	overrides: [
		{
			extends: ['plugin:@typescript-eslint/recommended-type-checked'],
			files: ['*.?(m)ts'],
			plugins: ['@typescript-eslint'],
			parser: '@typescript-eslint/parser',
			parserOptions: { project: true }
		}
	]
}
