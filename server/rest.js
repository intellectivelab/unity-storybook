const R = require("ramda");

const unityApiMocks = require("@intellective/unity-api-mocks");

const domainConfig = require("./config");

const config = R.mergeDeepRight(unityApiMocks.defaultConfig, domainConfig);

const usersApi = require("./api/usersApi");

module.exports = function (app) {

	const usersViewLinkTransformer = (user) => ({
		...user,
		_links: {...user._links, view: {href: "/api/config/components/usersView0"}}
	});

	unityApiMocks.configApi(app, config);
	unityApiMocks.usersApi(app, config, undefined, usersViewLinkTransformer);
	unityApiMocks.contentApi(app, config);
	unityApiMocks.casesApi(app, config);
	unityApiMocks.foldersApi(app, config);
	unityApiMocks.selectorsApi(app, config);
	usersApi(app);
};
