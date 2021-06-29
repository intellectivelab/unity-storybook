const R = require("ramda");

const unityApiMocks = require("@intellective/unity-api-mocks");

const domainConfig = require("./config");

const config = R.mergeDeepRight(unityApiMocks.defaultConfig, domainConfig);

const formsApi = require("./api/formsApi");
const usersApi = require("./api/usersApi");

const setupFolders = unityApiMocks.utils.folders;

module.exports = function (app) {

	const usersViewLinkTransformer = (user) => ({
		...user,
		_links: {...user._links, view: {href: "/api/config/components/usersView0"}}
	});

	const folderEntries = setupFolders();

	unityApiMocks.configApi(app, config);
	unityApiMocks.usersApi(app, config, undefined, usersViewLinkTransformer);
	unityApiMocks.contentApi(app, config);
	unityApiMocks.casesApi(app, config);
	unityApiMocks.foldersApi(app, config, folderEntries);
	unityApiMocks.selectorsApi(app, config);
	formsApi(app);
	usersApi(app);
};
