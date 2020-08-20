module.exports = {
	"stories": [
		"../docs/**/*.stories.mdx",
		"../src/stories/**/*.stories.mdx",
		"../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
	],
	"addons": [
		'@storybook/addon-docs',
		'@storybook/addon-storysource',
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/preset-create-react-app"
	]
}