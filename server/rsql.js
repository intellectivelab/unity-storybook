const rsqlParser = require('node-rsql-parser');

const rsqlUnitToCondition = (unit) => {
	if (typeof unit === 'string') {
		return TestCondition(unit);
	}

	if (typeof unit === 'object') {
		return unit.and ? AndCondition(unit.and) : OrCondition(unit.or);
	}
};

const AndCondition = (units) => row => {
	const conditions = units.map(rsqlUnitToCondition);

	return conditions.reduce((acc, condition) => acc && condition(row), true);
};

const OrCondition = (units) => row => {
	const conditions = units.map(rsqlUnitToCondition);

	return conditions.reduce((acc, condition) => acc || condition(row), false);
};

const TestCondition = (unit) => {
	const createPredicate = (unit) => {
		const parseDateOrNumber = value => isNaN(value) ? Date.parse(value) : Number(value);

		if (unit.includes('!==')) {
			const [name, value] = unit.split('!==');

			return (row) => row[name] && !String(row[name]).includes(value.replace(/["']/g, ""));
		} else if (unit.includes('==')) {
			const [name, value] = unit.split('==');

			return (row) => row[name] && String(row[name]).includes(value.replace(/["']/g, ""));
		} else if (unit.includes('=CONTAINS=')) {
			const [name, value] = unit.split('=CONTAINS=');

			return (row) => row[name] && String(row[name]).includes(value.replace(/["']/g, ""));
		} else if (unit.includes('=in=')) {
			const [name, value] = unit.split('=in=');

			return (row) => value.substring(1, value.length - 1)
				.split('#')
				.reduce((acc, value) => acc || row[name] === value.replace(/["']/g, ""), false);
		} else if (unit.includes('>=')) {
			const [name, value] = unit.split('>=');

			return (row) => row[name] && parseDateOrNumber(row[name]) >= Number(value);
		} else if (unit.includes('<=')) {
			const [name, value] = unit.split('<=');

			return (row) => row[name] && parseDateOrNumber(row[name]) <= Number(value);
		} else if (unit.includes('>')) {
			const [name, value] = unit.split('>');

			return (row) => row[name] && parseDateOrNumber(row[name]) > Number(value);
		} else if (unit.includes('<')) {
			const [name, value] = unit.split('<');

			return (row) => row[name] && parseDateOrNumber(row[name]) < Number(value);
		}
		else if (unit.includes('=INFOLDER=')) {
			const [name, value] = unit.split('=INFOLDER=');
			return (row) => value.substring(1, value.length - 1)
				.split('#')
				.reduce((acc, value) => acc || row[name] === value.replace(/["']/g, ""), false);
		}
		else if (unit.includes('=INSUBFOLDER=')) {
			const [name, value] = unit.split('=INSUBFOLDER=');
			return (row) => value.substring(1, value.length - 1)
				.split('#')
				.reduce((acc, value) => acc || row[name].includes(value.replace(/["']/g, "")), false);
		}

	};

	return (row) => (
		createPredicate(unit)(row)
	);
};

const filteringLogic = data => query => {
	if (query === null || query === "" || query === "*" || !rsqlParser.valid(query)) {
		return data;
	}

	const units = rsqlParser.parsing(query);

	const condition = rsqlUnitToCondition(units);

	return data.filter(row => condition(row));
};

module.exports = {filteringLogic, TestCondition};