import React, {useMemo} from 'react';

import {useDispatch} from "react-redux";

import * as R from "ramda";

import {Avatar, Box, TableCell, Typography} from "@material-ui/core";

import PageviewIcon from '@material-ui/icons/Pageview';

import {amber, purple} from '@material-ui/core/colors';

import {
	FactoryContextProvider,
	grids,
	GridView,
	useDefaultColumnRenderer,
	withGridViewConfig,
	withGridViewDomainActions
} from "@intellective/core";

export default {title: 'Examples/Components/GridView/Columns'};

const DefaultGridViewFactory = (props) => {

	const {Component = GridView, ...otherProps} = props;

	const ComposedGridView = R.compose(withGridViewConfig, withGridViewDomainActions)(Component);

	const _links = {
		config: {
			href: "/api/config/components/usersGrid"
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
		<FactoryContextProvider>
			<DefaultGridViewFactory useColumnRenderer={useColumnRenderer}/>
		</FactoryContextProvider>
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
		<FactoryContextProvider>
			<DefaultGridViewFactory useColumnRenderer={useDomainColumnRenderer}/>
		</FactoryContextProvider>
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


	const useCustomCellRenderer = R.curry((column, props) => {

		const {value, data} = props;

		const CellRenderer = useMemo(() => {
			const defaultColumnRenderer = useDefaultColumnRenderer(column);
			return column.renderer || defaultColumnRenderer;
		}, [column]);

		return (
			<span onDoubleClick={() => dispatch(grids.updateGridCurrentAction(id, {action, selected: data}))}>
				<CellRenderer column={column} data={data} value={value}/>
			</span>
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
		<FactoryContextProvider>
			<DefaultGridViewFactory Component={DomainGridView}/>
		</FactoryContextProvider>
	);
};
