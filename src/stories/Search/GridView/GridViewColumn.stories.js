import React from 'react';

import {useDispatch} from "react-redux";

import * as R from "ramda";

import {Avatar, Box, TableCell, Typography} from "@material-ui/core";

import PageviewIcon from '@material-ui/icons/Pageview';

import {amber, purple} from '@material-ui/core/colors';

import {grids, GridView, useDefaultColumnRenderer, withGridViewConfig, withGridViewDomainActions} from "@intellective/core";

export default {title: 'Examples/Search/Grid'};

const DefaultGridViewFactory = (props) => {

	const {Component = GridView, ...otherProps} = props;

	const ComposedGridView = R.compose(withGridViewConfig, withGridViewDomainActions)(Component);

	const _links = {
		config: {
			href: "/api/config/components/users"
		},
		query: {
			href: "/api/users/query",
		},
		list: {
			href: "/api/users/list",
		},
	};

	return (
		<ComposedGridView {...otherProps} _links={_links}/>
	);
};

/*
* Add custom column action
*/
export const UsingColumnAction = () => {

	const useCustomActionRenderer = (column) => (value, row) => {
		const handleClick = (event) => {
			event.preventDefault();

			alert("Gender Lookup");
		};

		return (
			<Box display="flex" flexWrap="noWrap" alignItems="center" justifyContent="center">
				<Box>
					<Typography variant="subtitle2">
						{column.label}
					</Typography>
				</Box>
				<Box mx={2}>
					<PageviewIcon cursor='pointer' color="inherit" onClick={handleClick}/>
				</Box>
			</Box>
		);
	};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const useColumnRenderer = R.cond([
		[R.propEq('name', 'gender'), useCustomActionRenderer],
		[R.T, useDefaultColumnRenderer]
	]);

	return (
		<DefaultGridViewFactory useColumnRenderer={useColumnRenderer}/>
	);
};

/*
* Add custom column renderer
*/
export const UsingColumnRenderer = () => {

	const mapValue = R.cond([
		[R.is(Array), R.map(R.when(R.is(Object), R.prop('value')))],
		[R.is(Object), R.prop('value')],
		[R.T, R.identity]
	]);

	const renderGender = R.curry((column, value) => {
		if (R.isEmpty(value) || R.isNil(value)) {
			return null;
		}

		const color = R.cond([
			[R.equals("Male"), R.always(amber[500])],
			[R.equals("Female"), R.always(purple[500])],
		])(value);

		return <Avatar style={{color}}>{value.charAt(0)}</Avatar>;
	});

	const useGenderColumnRenderer = (column) => (value, row) => R.compose(renderGender(column), mapValue)(value);

	const isGenderColumn = R.anyPass([R.propEq('name', 'gender')]);

	const useDomainColumnRenderer = R.cond([
		[isGenderColumn, useGenderColumnRenderer],
		[R.T, useDefaultColumnRenderer]
	]);

	return (
		<DefaultGridViewFactory useColumnRenderer={useDomainColumnRenderer}/>
	);
};

/**
 *  Adds a custom action that implements cellRenderer with onDoubleClick handler
 */
const withCustomCellHandler = R.curry((WrappedGrid, props) => {
	const findAction = actionName => R.find(R.propEq("name", actionName));

	const {id, actions} = props;

	const dispatch = useDispatch();

	const action = findAction('view')(actions);

	const useCustomCellRenderer = R.curry((classes, row, column) => {

		const value = row[column.name];

		return (
			<TableCell key={`${row.id}-${column.name}`}
			           className={classes.tableCell}
			           scope="row"
			           variant="body"
			           onDoubleClick={() => dispatch(grids.updateGridCurrentAction(id, {action, selected: row}))}
			>
				{column.renderer ? column.renderer(value, row, column) : value}
			</TableCell>
		);
	});

	return (
		<WrappedGrid {...props} useCellRenderer={useCustomCellRenderer}/>
	);
});

/*
* Add custom row click handler
*/
export const UsingColumnDoubleClick = () => {

	const DomainGridView = withCustomCellHandler(GridView);

	return (
		<DefaultGridViewFactory Component={DomainGridView}/>
	);
};
