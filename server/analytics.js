const fns = require('date-fns');

const selectFacets = (data, facets) => {
	function addDateGap(date, gap) {
		const matches = gap.match('(^\\d+)(\\D+$)');
		if (!matches) {
			throw new Error(`Invalid range facet gap format: ${gap}`);
		}

		const [, gapSize, gapUnit] = matches;

		switch (gapUnit) {
			case 'y':
				return fns.addYears(date, gapSize);
			case 'm':
				return fns.addMonths(date, gapSize);
			case 'd':
				return fns.addDays(date, gapSize);
			case 'h':
				return fns.addHours(date, gapSize);
			case 'min':
				return fns.addMinutes(date, gapSize);
			case 'sec':
				return fns.addSeconds(date, gapSize);
			case 'ms':
				return fns.addMilliseconds(date, gapSize);
			default:
				throw new Error(`Invalid range facet gap unit: ${gapUnit}`);
		}
	}

	function groupByValue(data, facet) {
		const {field} = facet;

		return data.reduce((acc, x) => {
			if (acc[x[field]]) {
				acc[x[field]].push(x);
			} else {
				acc[x[field]] = [x]
			}

			return acc;
		}, {});
	}

	function groupByRange(data, facet) {
		const {start, end} = facet;

		return !isNaN(start) && !isNaN(end) ?
			groupByNumericRange(data, facet) : groupByDateRange(data, facet);
	}

	function groupByDateRange(data, facet) {
		const {field, start, end, gap} = facet;

		const startDate = Date.parse(start);
		const endDate = Date.parse(end);

		const ranges = [];
		let dt = new Date(startDate);
		while (dt < endDate) {
			ranges.push(new Date(dt));
			dt.setTime(addDateGap(dt, gap).getTime());
		}
		ranges.push(new Date(endDate));

		const groups = {};
		for (let i = 0; i < ranges.length - 1; i++) {
			let group = data.filter(d => Date.parse(d[field]) >= ranges[i] && Date.parse(d[field]) < ranges[i + 1]);
			if (group.length > 0) {
				groups[ranges[i].getTime()] = group;
			}
		}

		return groups;
	}

	function groupByNumericRange(data, facet) {
		const {field, start, end, gap} = facet;

		const ranges = [];
		let n = Number(start);
		while (n < Number(end)) {
			ranges.push(n);
			n += Number(gap);
		}
		ranges.push(Number(end));

		const groups = {};
		for (let i = 0; i < ranges.length - 1; i++) {
			let group = data.filter(d => Number(d[field]) >= ranges[i] && Number(d[field]) < ranges[i + 1]);
			if (group.length > 0) {
				groups[ranges[i]] = group;
			}
		}

		return groups;
	}

	function selectFacetItem(data, facet) {
		const {id, field, type, nested = []} = facet;
		const count = data.length;

		const facetItem = {id, field, type, count};

		if ('TERMS' === type) {
			const groups = groupByValue(data, facet);

			const {minCount, limit} = facet;

			// prepare buckets
			const buckets = Object.keys(groups).map(key => {
				const bucket = {value: key, displayValue: key, count: groups[key].length};

				bucket.nested = nested.map(facet => {
					return selectFacetItem(groups[key], facet);
				});

				return bucket;
			});

			facetItem.buckets = buckets
				.filter((x) => x.count >= minCount)
				.sort((a, b) => b.count - a.count)
				.slice(0, limit);

		} else if ('RANGE' === type) {
			const groups = groupByRange(data, facet);

			facetItem.buckets = Object.keys(groups).map(key => {
				const bucket = {value: key, displayValue: key, count: groups[key].length};

				bucket.nested = nested.map(facet => {
					return selectFacetItem(groups[key], facet);
				});

				return bucket;
			});

		} else if ('METRICS' === type) {
			const groups = groupByValue(data, facet);

			// calculate metrics
			let value;
			switch (facet.function) {
				case 'UNIQUE': {
					let values = Object.keys(groups);
					let unique = values.reduce((acc, value) => {
						acc.add(value);
						return acc;
					}, new Set());

					value = unique.size;
					break;
				}
				case 'COUNT':
					let values = Object.keys(groups);
					value = values.reduce((acc, value) => (acc + groups[value].length), 0);
					break;
				case 'MIN':
					value = Math.min.apply(Math, Object.keys(groups));
					break;
				case 'MAX':
					value = Math.max.apply(Math, Object.keys(groups));
					break;
				case 'AVG': {
					let values = Object.keys(groups);
					let sum = values.reduce((acc, value) => (acc + (value ? parseFloat(value) : 0)), 0);
					let count = values.length;

					value = sum / count;
					break;
				}
				default:
					value = 0;
			}
			facetItem.value = value;
		}

		return facetItem;
	}

	return facets.map(facet => selectFacetItem(data, facet));
};

module.exports = {selectFacets};