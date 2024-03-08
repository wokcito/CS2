module.exports = {
	extends: ['standard'],
	overrides: [
		{
			extends: 'standard',
			files: ['*.?(m)js'],
			rules: {
				indent: ['warn', 'tab'],
				'no-tabs': 'off',
				quotes: ['warn', 'single']
			}
		},
		{
			extends: 'standard-with-typescript',
			files: ['*.?(m)ts'],
			rules: {
				'@typescript-eslint/indent': ['warn', 'tab'],
				'no-tabs': 'off',
				quotes: ['warn', 'single']
			},
			overrides: [
				{
					extends: [require.resolve('@vercel/style-guide/eslint/vitest')],
					files: ['*test.ts']
				}
			]
		}
	]
}
