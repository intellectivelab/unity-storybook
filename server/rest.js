const R = require("ramda");
const fs = require('fs');

const rsql = require("./rsql");
const analytics = require("./analytics");
const _export = require("./export");

const filteringLogic = rsql.filteringLogic;
const TestCondition = rsql.TestCondition;
const selectFacets = analytics.selectFacets;
const getTestFile = _export.getTestFile;
const shortHash = _export.shortHash;

const {v4: uuidv4} = require('uuid');

const idLens = R.lensProp("id");
const resourceNameLens = R.lensProp("resourceName");
const eventIdLens = R.lensProp("eventId");

const labelLens = R.lensProp("label");
const pathLens = R.lensProp("path");
const parentIdLens = R.lensProp("parentId");

const titleLens = R.lensProp("title");
const workitemNameLens = R.lensProp("workitemName");
const ucmLockedStatusLens = R.lensProp("ucmLockedStatus");

const crypto = require('crypto');
const algorithm = 'des-ecb';
const key = Buffer.from("d0e276d0144890d3", "hex");

const NO_DELAY = false; // set to true to speed up mock response time;
const respTime = (maxTimeMs = 1000) => NO_DELAY ? 1 : Math.random() * maxTimeMs;

const userWithLinks = (user) => {
	const _links = {
		"self": {
			href: "/api/data/details/users/" + user.id
		},
		"download": {
			"href": "/api/data/download/" + user.id
		},
		"view_content": {
			"href": "/api/data/view/" + user.id
		},
		"view": {
			href: "/api/config/components/usersView" + (user.age % 2)
		},
		"contents": {
			href: "/api/data/contents/" + user.id
		},
		"attachments": {
			href: `/api/users/${user.gender}/users`
		}
	};

	if (user.age % 2 === 1) {
		_links["checkin"] = {"href": "/api/data/checkin/" + user.id};
		_links["cancelCheckOut"] = {"href": "/api/data/" + user.id + "/reservation/cancel"};
	} else {
		_links["checkout"] = {"href": "/api/data/checkout/" + user.id};
	}

	const toSelector = (name, value) => ({name: name, value: value});

	const mimeType = [
		'application/xml',
		'application/text',
		'application/octet-stream',
		'application/x-compress',
		'application/pdf',
		'application/msword',
		'application/vnd.ms-excel',
		'application/vnd.ms-powerpoint',
		'audio/xxx',
		'image/tiff'
	];

	return {
		...user,
		country: toSelector(user.countryName, user.countryCode),
		state: Array.isArray(user.state) ? user.state.map(item => toSelector(item, item)) : toSelector(user.state, user.state),
		retire: user.age > 60,
		mimeType: mimeType[Math.floor(Math.random() * mimeType.length)],
		_links
	};
};

const taskWithLinks = (task) => {
	const _links = {
		self: {
			href: "/api/data/details/casetasks/" + task.id
		},
		view: {
			href: "/api/config/components/casetasksView" + (task.task_id ? task.task_id % 2 : 0)
		},
		copy_link: {
			href: "/api/gateway/link/generate/details/casetasks/" + task.id
		},
		copy: {
			href: "/api/casetasks"
		},
		reassign: {
			href: "/api/data/casetasks/" + task.id + "/reassign"
		},
		comment: {
			href: "/api/data/details/history"
		},
		history: {
			href: "/api/history/" + task.id + "/query"
		},
		comments: {
			href: "/api/comments/" + task.id + "/query"
		},
		attachments: {
			href: "/api/users/Male/users"
		},
		attach: {
			href: "/api/casetasks/attach"
		}
	};
	// emulate actions allocation
	if (task.task_id % 2) {
		_links.lock = {
			href: "/api/data/casetasks/" + task.id + "/lock"
		};
	} else {
		_links.unlock = {
			href: "/api/data/casetasks/" + task.id + "/unlock"
		};
	}

	return {...task, _links};
};

const historyWithLinks = (item) => {
	const _links = {
		self: {
			href: "/api/data/details/history/" + item.eventId
		},
	};
	if (item["eventType"] === "USER_COMMENT") {
		_links['view'] = {href: "/api/config/components/commentEditView0"};
		_links['delete'] = {..._links['self']};
	}

	return {id: item["eventId"], ...item, _links};
};

const getContent = (userId, index) => {
	const file = getTestFile(userId, index);

	return {
		mimeType: file.contentType,
		contentSize: file.contentSize,
		fileName: file.fileName,
		contentIndex: index,
		_links: {
			"download": {href: "/api/data/content/download/" + userId + "/" + index},
			"view_content": {href: "/api/data/content/view/" + userId + "/" + index},
		}
	};
};

const contentWithLinks = (userId) => {
	let contents = [];

	const num = shortHash(userId, 3);

	if (num > 0) contents.push(getContent(userId, 0));
	if (num > 1) contents.push(getContent(userId, 1));
	if (num > 2) contents.push(getContent(userId, 2));

	const _links = {
		"self": {
			href: "/api/data/details/users/" + userId
		}
	};

	return {
		data: contents,
		_links
	};
};
const idMapper = item => ({...R.over(idLens, () => uuidv4(), item), ...item});
const labelMapper = item => ({...R.over(labelLens, () => item.name, item), ...item});

const safeParentPath = R.ifElse(R.endsWith('/'), R.identity, path => R.concat(path, '/'));
const pathMapper = R.curry((path, item) => ({...R.over(pathLens, () => R.concat(safeParentPath(path), item.name), item), ...item}));
const parentIdMapper = R.curry((parentId, item) => ({...R.over(parentIdLens, () => parentId, item), ...item}));

const treeReducer = (parentPath, parentId) => (acc, _item) => {
	const item = R.compose(idMapper, labelMapper, pathMapper(parentPath), parentIdMapper(parentId))(_item);
	const {id, path, children = []} = item;
	const traversed = children.reduce(treeReducer(path, id), {});
	return {...acc, [id]: item, ...traversed};
};

const foldersRaw = fs.readFileSync(__dirname + '/data/folders.json');
const folders = JSON.parse(foldersRaw).reduce(treeReducer("/"), {});
const folderEntries = Object.values(folders);

const usersRaw = fs.readFileSync(__dirname + '/data/users.json');
const users = JSON.parse(usersRaw)
	.map(user => R.over(idLens, () => uuidv4(), user))
	.map(user => R.over(titleLens, () => user.fullName, user))
	.map(user => R.over(resourceNameLens, () => 'documents', user))
	.map(user => R.over(pathLens, () => R.view(pathLens, folderEntries[Math.floor(Math.random() * folderEntries.length)]), user))
	.map(user => userWithLinks(user));
const userResourceRecords = users.map(({_links = {}, ...otherProps}) => {
	const {self, view} = _links;
	return {
		...otherProps,
		resourceName: 'resources',
		resourceType: 'documents',
		_links: {self, view},
	};
});

const caseTasksRaw = fs.readFileSync(__dirname + '/data/casetasks.json');
const caseTasks = JSON.parse(caseTasksRaw)
	.map(caseTask => R.over(idLens, () => uuidv4(), caseTask))
	.map(caseTask => R.over(workitemNameLens, () => caseTask.task_name, caseTask))
	.map(caseTask => R.over(resourceNameLens, () => 'workitems', caseTask))
	.map(caseTask => R.over(ucmLockedStatusLens, () => Math.floor(Math.random() * 3), caseTask))
	.map(task => taskWithLinks(task));
const caseTasksResourceRecords = caseTasks.map(({_links, ...otherProps}) => {
	const {self, view} = _links;
	return {
		...otherProps,
		resourceName: 'resources',
		resourceType: 'workitems',
		_links: {self, view},
	};
});

const historyRaw = fs.readFileSync(__dirname + '/data/history.json');
const history = JSON.parse(historyRaw).map(item => R.over(eventIdLens, () => uuidv4(), item)).map(item => historyWithLinks(item));
const comments = history.filter(item => item.eventType === "USER_COMMENT");
const countryStateCity = require('./data/countryStateCity');

const perspectives = require('./config/perspectives');
const components = require('./config/components');
const actions = require('./config/actions');
const dashboardActions = require('./config/dashboardActions');
const selectors = require('./config/selectors');

const modelData = require('./data/models');

const perspectiveMap = perspectives.reduce((map, p) => {
	map[p.id] = p;

	map[p.id].dashboardsMap = p.dashboards.reduce((acc, d) => {
		acc[d.id] = d;

		return acc;
	}, {});

	return map;
}, {});

const actionsMap = Object.values(actions).reduce((acc, actions) => {
	actions.forEach(action => {
		acc[action.name] = action;
	});

	return acc;
}, {});

const countries = countryStateCity.map((country) => ({name: country.name, value: country.iso2}));

const states = countryStateCity.reduce((acc, country) => (
	country.states
		? Object.entries(country.states)
			.reduce((acc, [state]) => ([...acc, {name: state, value: state}]), acc)
		: ([...acc, {name: country.capital, value: country.capital}])), []);

const statesByCountry = countryStateCity.reduce((acc, country) => (
	Object.assign(acc, {
		[country.iso2]: country.states ? Object.keys(country.states).map(key => ({
				name: key,
				value: key
			}))
			: []
	})
), {});

const filterUsers = filteringLogic(users);
const filterCaseTasks = filteringLogic(caseTasks);
const filterHistory = filteringLogic(history);
const filterComments = filteringLogic(comments);

const filterUserResourceRecords = filteringLogic(userResourceRecords);
const filterCaseTasksResourceRecords = filteringLogic(caseTasksResourceRecords);

const withCasetaskRecordLinks = record => {
	const _links = {...record._links};
	_links['dispatch'] = {
		href: "/api/data/casetasks/" + record.id + "/dispatch"
	};
	_links['dispatch.Approve'] = {
		href: "/api/data/casetasks/" + record.id + "/dispatch/approve"
	};
	if (record.task_id % 2) {
		_links['dispatch.Reject'] = {
			href: "/api/data/casetasks/" + record.id + "/dispatch/reject"
		};
	} else {
		_links['dispatch.Close'] = {
			href: "/api/data/casetasks/" + record.id + "/dispatch/close"
		};
	}
	// Return actual attachments query link for given Case;
	_links["attachments.2"] = { // 2 = Documents;
		href: "/api/users/" + (record.task_id % 2 === 0 ? "male" : "female") + "/users/"
	};

	return {...record, _links};
};

// add dynamic action links
const withRecordLinks = (typeName, record) => {
	switch (typeName) {
		case "casetasks":
			return withCasetaskRecordLinks(record);
		default:
			return record;
	}
};

function suTokenCheck(req) {
	const su_token = req.query['su_token'];
	const numMs = new Date().getTime();

	if (!su_token) {
		// throw new Error("su_token is not provided: " + su_token);
		return;
	}

	if (R.is(String, su_token) && (R.isNil(su_token) || R.isEmpty(su_token))) {
		throw new Error("su_token is invalid: " + su_token);
	}

	const suNum = parseInt(('' + su_token).trim(), 10);

	if (suNum > numMs || suNum < numMs - 3 * 60000) {
		throw new Error("su_token is expired: " + su_token);
	}
}

const getSortedData = (dataToSort, sort) => {
	const sortFunc = data => sortBy => (data.sort((a, b) => {
		let i = 0, result = 0;

		while (i < sortBy.length && result === 0) {
			result = sortBy[i].direction * (a[sortBy[i].prop] < b[sortBy[i].prop] ? -1 : (a[sortBy[i].prop] > b[sortBy[i].prop] ? 1 : 0));
			i++;
		}
		return result;
	}));

	const sorters = sort && sort.length > 0 ? sort.split(',') : [];
	const sortBy = sorters.map(s => s.split('_')).map(s => ({prop: s[0], direction: s[1].toLowerCase() === 'asc' ? 1 : -1}));

	return sort ? sortFunc(dataToSort)(sortBy) : dataToSort;
};


const filterFolders = (folderEntries, lazy, rootPath, filterPath) => {

	const root = folderEntries.length > 0 && folderEntries[0];

	const withChildren = (item) => {
		return folderEntries.filter(folder => item.id === folder.parentId).map(item => (
			{...item, children: lazy ? [] : withChildren(item)}
		));
	};

	if (!lazy) {
		return {...root, children: withChildren(root)};
	}

	if (rootPath === filterPath) {
		return {...root, children: withChildren(root)};
	}

	const parentItem = folderEntries.find(item => item.path === filterPath);
	return parentItem && {...parentItem, children: withChildren(parentItem)};
};

const updateData = R.curry((id, updater, data) => {
	const condition = TestCondition('id==' + id);
	const filteredData = data.filter(row => condition(row));
	filteredData.forEach(item => updater(item));
});

const deleteData = (data = [], predicate) => {
	const index = data.findIndex(predicate);
	index >= 0 && data.splice(index, 1);
};

module.exports = function (app) {
	app.get('/api/:typeName', function (req, res) {
		const model = req.params.typeName ? modelData[req.params.typeName] : [];
		setTimeout(() => {
			res.send(model);
		}, respTime());
	});

	app.post('/api/:typeName', (req, res) => {
		const record = {id: uuidv4(), ...req.body};

		const recordWithLinks = R.cond([
			[R.equals("users"), R.always(userWithLinks)],
			[R.equals("casetasks"), R.always(taskWithLinks)],
			[R.equals("history"), R.always(historyWithLinks)],
			[R.T, (record) => record],
		])(req.params.typeName)(record);

		const {_links, ...fields} = recordWithLinks;

		setTimeout(() => {
			res.send({fields, _links});
		}, respTime());
	});

	app.post('/api/users/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const users = filterUsers(query);

		const sortedUsers = getSortedData(users, sort);

		setTimeout(() => {
			res.send({
				total: users.length,
				data: sortedUsers.slice(offset, offset + limit)
			});
		}, respTime());
	});

	const getUsersByGender = (res, gender, offset, limit, query, sort) => {
		const usersQuery = query ? `gender==${gender}, ${query}` : `gender==${gender}`;
		console.log('usersQuery', usersQuery, ", offset=", offset, ", limit=", limit);
		const users = filterUsers(usersQuery);

		const sortedUsers = getSortedData(users, sort);
		console.log('usersQuery, sortedUsers.length=', sortedUsers.length);

		const data = sortedUsers.slice(offset, offset + limit);
		const eol = offset + limit >= users.length;
		console.log('usersQuery, data.length=', data.length, ", eol=", eol);
		setTimeout(() => {
			res.send({
				total: users.length,
				data,
				eol
			});
		}, respTime());
	};

	app.post('/api/users/:gender/users', (req, res) => {
		const gender = req.params.gender;
		const {offset = 0, limit = 20, query, sort} = req.body;

		getUsersByGender(res, gender, parseInt(offset), parseInt(limit), query, sort);
	});

	// Used in loading existing documents for Attach Repository Document action;
	app.get('/api/users/:gender/users', (req, res) => {
		const gender = req.params.gender;
		const {offset = 0, limit = 20, query, sort} = req.query;

		getUsersByGender(res, gender, parseInt(offset), parseInt(limit), query, sort);
	});

	app.post('/api/resources/users/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const resources = filterUserResourceRecords(query);

		const sortedResources = getSortedData(resources, sort);

		setTimeout(() => {
			res.send({
				total: resources.length,
				data: sortedResources.slice(offset, offset + limit)
			});
		}, respTime());
	});

	app.post('/api/selectors/:selectorId/items', (req, res) => {
		const {offset, limit, search, queryContext = {}} = req.body;

		const selectorId = req.params.selectorId;

		switch (selectorId) {
			case 'country' :
				res.send({
					total: countries.length,
					data: countries
						.filter(country => country.name.includes(search))
						.slice(offset, offset + limit)
				});

				break;
			case 'state' : {
				const country = queryContext.country || queryContext.countryCode;
				const _statesByCountry = country ? statesByCountry[country]
					.filter(state => state.name.includes(search))
					.slice(offset, offset + limit) : states;
				res.send({
					total: _statesByCountry.length,
					data: _statesByCountry
				});

				break;
			}
			default:
				res.send({
					total: 0,
					data: []
				});
		}
	});

	app.post('/api/users/list', (req, res) => {
		const {typedIds = []} = req.body;

		const ids = typedIds.map(({id}) => id);

		setTimeout(() => res.send(users.filter(user => ids.includes(user.id))), respTime());
	});

	app.post('/api/casetasks/list', (req, res) => {
		const {typedIds = []} = req.body;

		const ids = typedIds.map(({id}) => id);

		setTimeout(() => {
			res.send(caseTasks
				.filter(task => ids.includes(task.id))
				.map(withCasetaskRecordLinks));
		}, respTime());
	});

	app.get('/api/config/perspectives', function (req, res) {
		res.send(perspectives);
	});

	app.get('/api/config/perspectives/:pname', function (req, res) {
		res.send(perspectiveMap[req.params.pname]);
	});

	app.get('/api/config/perspectives/:pname/dashboards', function (req, res) {
		res.send(perspectiveMap[req.params.pname].dashboards);
	});

	app.get('/api/config/perspectives/:pname/dashboards/:dName', function (req, res) {
		res.send(perspectiveMap[req.params.pname].dashboardsMap[req.params.dName]);
	});

	app.get('/api/config/perspectives/:pname/dashboards/:dName/actions', function (req, res) {
		const perspective = dashboardActions.filter(p => p.id === req.params.pname)[0];
		const dashboard = perspective && perspective.dashboards.filter(d => d.id === req.params.dName)[0];
		const actions = dashboard && dashboard.actions;

		setTimeout(() => {
			res.send(actions || []);
		}, respTime());
	});

	app.get('/api/config/components/:cName', function (req, res) {
		setTimeout(() => {
			res.send(components[req.params.cName]);
		}, respTime());
	});

	app.get('/api/config/grids/:gName/actions', function (req, res) {
		res.send(actions[req.params.gName]);
	});

	app.get('/api/config/components/:cName/tabs/:tabId/actions', function (req, res) {
		setTimeout(() => {
			const id = req.params.cName + req.params.tabId;
			res.send(actions[id]);
		}, respTime());
	});

	app.get('/api/config/actions', function (req, res) {
		res.send(Object.values(actionsMap));
	});

	app.get('/api/config/actions/:aName', function (req, res) {
		res.send(actionsMap[req.params.aName]);
	});

	app.post('/api/users/facets/select', function (req, res) {
		let {query, facets = []} = req.body;

		let users = filterUsers(query);

		setTimeout(() => {
			res.send({
				facetItems: selectFacets(users, facets)
			});
		}, respTime());
	});

	app.post('/api/casetasks/facets/select', function (req, res) {
		let {query, facets = []} = req.body;

		let caseTasks = filterCaseTasks(query);

		setTimeout(() => {
			res.send({
				facetItems: selectFacets(caseTasks, facets)
			});
		}, respTime());
	});

	app.post('/api/casetasks/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const caseTasks = filterCaseTasks(query);

		const sortedData = getSortedData(caseTasks, sort);

		res.send({
			total: caseTasks.length,
			data: sortedData.slice(offset, offset + limit)
		});
	});

	app.post('/api/resources/casetasks/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const resources = filterCaseTasksResourceRecords(query);

		const sortedResources = getSortedData(resources, sort);

		setTimeout(() => {
			res.send({
				total: resources.length,
				data: sortedResources.slice(offset, offset + limit)
			});
		}, respTime());
	});

	app.get('/api/data/details/:typeName/:dataId', function (req, res) {

		const condition = TestCondition('id==' + req.params.dataId);
		const filteredData = (
			R.cond([
				[R.equals("users"), R.always(users)],
				[R.equals("history"), R.always(history)],
				[R.equals("comments"), R.always(comments)],
				[R.equals("casetasks"), R.always(caseTasks)],
				[R.T, []],
			])(req.params.typeName)
		).filter(row => condition(row));

		if (filteredData.length > 0) {
			const {_links, ...fields} = withRecordLinks(req.params.typeName, filteredData[0]);

			setTimeout(() => {
				res.send({fields, _links});
			}, respTime());
		} else {
			res.status(404).send('Sorry cant find ' + req.params.dataId);
		}
	});

	app.put('/api/data/details/:typeName/:dataId', function (req, res) {
		setTimeout(() => {
			if (req.body.fullName === 'error500') {
				res.status(500).send('Server error ');
			} else if (req.body.fullName === 'error400') {
				res.status(400).send('Bad request ');
			} else {
				res.send({result: "success"});
			}
		}, respTime());
	});

	// POST is executed when Details form having file fields is saved;
	app.post('/api/data/details/:typeName/:dataId', function (req, res) {
		setTimeout(() => {
			if (req.body.fullName === 'error500') {
				res.status(500).send('Server error ');
			} else if (req.body.fullName === 'error400') {
				res.status(400).send('Bad request ');
			} else {
				res.send({result: "success"});
			}
		}, respTime());
	});

	app.delete('/api/data/details/:typeName/:dataId', function (req, res) {
		setTimeout(() => {
			if (req.body.fullName === 'error500') {
				res.status(500).send('Server error ');
			} else if (req.body.fullName === 'error400') {
				res.status(400).send('Bad request ');
			} else {
				res.send({result: "Successfully deleted"});
			}
		}, respTime());
	});

	app.post('/api/data/:typeName/:dataId', function (req, res) {
		setTimeout(() => {
			if (req.body.fullName === 'error500') {
				res.status(500).send('Server error ');
			} else if (req.body.fullName === 'error400') {
				res.status(400).send('Bad request ');
			} else {
				res.send({result: "success"});
			}
		}, respTime());
	});

	app.get('/api/config/components/:view/header', function (req, res) {
		const view = components[req.params.view];
		const fieldsetLink = view.tabs[0]._links.fieldset.href;
		const fieldsetName = fieldsetLink.substring(fieldsetLink.lastIndexOf('/') + 1, fieldsetLink.length);

		res.send((components[fieldsetName] && components[fieldsetName].header) || []);
	});

	app.get('/api/config/components/:id/templates', function (req, res) {
		setTimeout(() => {
			res.send(components[req.params.id]);
		}, respTime());
	});

	app.post('/api/data/casetasks/:id/reassign', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/:id/lock', function (req, res) {
		setTimeout(() => {
			res.send({result: "success"});
		}, respTime(1500));

	});

	app.post('/api/data/casetasks/:id/unlock', function (req, res) {
		setTimeout(() => {
			res.send({result: "success"});
		}, respTime(2000));
	});

	app.post('/api/data/casetasks/:id/dispatch/approve', function (req, res) {
		updateData(req.params.id, item => item['task_status'] = 'Approved', caseTasks);
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/:id/dispatch/reject', function (req, res) {
		updateData(req.params.id, item => item['task_status'] = 'Rejected', caseTasks);
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/:id/dispatch/close', function (req, res) {
		deleteData(caseTasks, TestCondition('id==' + req.params.id));
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/reassign', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/lock', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/unlock', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/dispatch/approve', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/dispatch/reject', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/casetasks/dispatch/close', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/:id/checkin', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/:id/checkout', function (req, res) {
		res.send({result: "success"});
	});

	app.post('/api/data/:id/reservation/cancel', function (req, res) {
		res.send({result: "success"});
	});

	app.get('/api/data/export', function (req, res) {
		const file = `${__dirname}/export/export.csv`;
		res.download(file);
	});

	app.get('/api/data/download/:Id', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.Id, 0);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'attachment; filename=' + testFile.fileName);
		fs.createReadStream(__dirname + '/data/documents/' + testFile.fileName).pipe(res);
		// res.send(fs.readFileSync(__dirname + '/data/documents/'+testFile.fileName));
	});

	app.get('/api/data/view/:Id', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.Id, 0);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'inline; filename=' + testFile.fileName);
		fs.createReadStream(__dirname + '/data/documents/' + testFile.fileName).pipe(res);
		// res.send(fs.readFileSync(__dirname + '/data/documents/' + testFile.fileName));
	});

	app.get('/api/data/contents/:Id', function (req, res) {
		setTimeout(() => {
			res.send(contentWithLinks(req.params.Id));
		}, respTime());
	});

	app.get('/api/data/content/download/:Id/:i', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.Id, req.params.i);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'attachment; filename=' + testFile.fileName);
		fs.createReadStream(__dirname + '/data/documents/' + testFile.fileName).pipe(res);
		// res.send(fs.readFileSync(__dirname + '/data/documents/'+testFile.fileName));
	});

	app.get('/api/data/content/view/:Id/:i', function (req, res) {
		suTokenCheck(req);

		const testFile = getTestFile(req.params.Id, req.params.i);

		res.setHeader('Content-Type', testFile.contentType);
		res.setHeader('Content-Disposition', 'inline; filename=' + testFile.fileName);
		fs.createReadStream(__dirname + '/data/documents/' + testFile.fileName).pipe(res);
		// res.send(fs.readFileSync(__dirname + '/data/documents/' + testFile.fileName));
	});

	app.get('/public/api/oauth/su_token', function (req, res) {
		const numMs = '' + new Date().getTime();
		console.log("su_token issued: " + numMs);

		res.send(numMs);
	});

	app.post('/api/history/:id/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const history = filterHistory(query);

		const sortedData = getSortedData(history, sort);

		res.send({
			total: history.length,
			data: sortedData.slice(offset, offset + limit)
		});
	});

	app.post('/api/comments/:id/query', (req, res) => {
		const {offset, limit, query, sort} = req.body;

		const history = filterComments(query);

		const sortedData = getSortedData(history, sort);

		res.send({
			total: history.length,
			data: sortedData.slice(offset, offset + limit)
		});
	});

	app.post('/api/data/details/history', function (req, res) {
		res.send({result: "success"});
	});

	app.get('/api/folders/browse', (req, res) => {

		const {scope, root: path, offset, limit, query, sort, lazy = true} = req.query;

		const result = filterFolders(folderEntries, lazy, "/", path);

		setTimeout(() => {

			res.send(result ? {
				...result,
				total: result.children.length,
				children: result.children.slice(offset, offset + limit)
			} : {});

		}, respTime());
	});

	app.post('/api/casetasks/attach', (req, res) => {
		if (req.is('application/json')) {
			const {docId} = req.body;
			console.log("Attach: docId=", docId);
		} else { // multipart with file;
			const {title} = req.body;
			console.log("Attach: title=", title);
		}
		setTimeout(() => {
			res.send({});
		}, respTime());
	});

	app.post('/api/gateway/link/generate/:resourceName/:resourceType/:resourceId', (req, res) => {

		let inputData = req.params.resourceName + '/' + req.params.resourceType
			+ '/' + req.params.resourceId;
		if (req.body.users && req.body.users.length > 0) {
			inputData += '&users=' + req.body.users;
		}
		console.log("makeLink inputData: ", inputData);

		if (Math.random() > 0.8) {
			res.status(500).send("Unexpected error has occurred.");
			return;
		}

		const cipher = crypto.createCipheriv(algorithm, key, null);
		let encrypted = cipher.update(inputData, 'utf8', 'hex');
		encrypted += cipher.final('hex');

		res.send({
			content: "http://localhost:3000/api/shared/open?hash=" + encrypted
		});
	});

	app.get('/api/shared/open', (req, res) => {
		console.log("open link");

		const decipher = crypto.createDecipheriv(algorithm, key, null);
		let decrypted = decipher.update(req.query.hash, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		console.log("Decrypted link: ", decrypted);

		const context = {
			resourceName: "cases",
			resourceLink: "./api/data/" + decrypted
		};
		const base64Context = Buffer.from(JSON.stringify(context)).toString("base64");

		res.redirect('/?p=resourceView&context=' + base64Context);
	});

	app.get('/api/selectors/:cName', function (req, res) {
		setTimeout(() => {
			res.send(selectors.find(selector => selector.name === req.params.cName));
		}, 1000);
	});

	app.post('/api/validate/zipCode', (req, res) => {
		const {value = ''} = req.body;

		const error = value !== null && value.startsWith('0');
		const errorMsg = error ? 'The specified ZIP code does not exist' : undefined;

		setTimeout(() => {
			res.send({error, errorMsg});
		}, 1000);
	});

};