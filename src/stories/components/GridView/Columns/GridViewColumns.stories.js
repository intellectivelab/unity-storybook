import React from 'react';

import {useDispatch} from "react-redux";

import * as R from "ramda";

import {Avatar, Box, Typography} from "@material-ui/core";

import PageviewIcon from '@material-ui/icons/Pageview';

import {amber, purple} from '@material-ui/core/colors';

import {grids, GridView, useDefaultColumnRenderer, withGridViewConfig, withGridViewDomainActions} from "@intellective/core";

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

	const CustomActionRenderer = (props) => {
		const {column, value, data} = props;

		const handleClick = (event) => {
			event.preventDefault();

			alert(value);
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
		[R.propEq('name', 'gender'), R.always(CustomActionRenderer)],
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

	const GenderColumnRenderer = props => {
		const {value} = props;

		if (R.isEmpty(value) || R.isNil(value)) {
			return null;
		}

		const color = R.cond([
			[R.equals("Male"), R.always(amber[500])],
			[R.equals("Female"), R.always(purple[500])],
		])(value);

		return <Avatar style={{color}}>{value.charAt(0)}</Avatar>;
	}

	const isGenderColumn = R.anyPass([R.propEq('name', 'gender')]);

	const useDomainColumnRenderer = R.cond([
		[isGenderColumn, R.always(GenderColumnRenderer)],
		[R.T, useDefaultColumnRenderer]
	]);

	return (
		<DefaultGridViewFactory useColumnRenderer={useDomainColumnRenderer}/>
	);
};

/**
 *  Adds a custom action that implements cellRenderer with onDoubleClick handler
 */
const withDoubleClickHandler = R.curry((WrappedComponent, props) => {
	const {data} = props;

	const action = {type: "view"};

	const dispatch = useDispatch();

	const onDoubleClickHandler = (e) => {
		e.preventDefault();

		dispatch(grids.updateGridCurrentAction("usersGrid", {action, selected: data}));
	};

	return (
		<span onDoubleClick={onDoubleClickHandler}>
			<WrappedComponent {...props}/>
		</span>
	);
});

/*
* Add custom row click handler
*/
export const UsingColumnDoubleClick = () => {

	const useDomainColumnRenderer = (props) => withDoubleClickHandler(useDefaultColumnRenderer(props));

	return (
		<DefaultGridViewFactory useColumnRenderer={useDomainColumnRenderer}/>
	);
};
