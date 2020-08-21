import React, {useState} from 'react';

import * as R from "ramda";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Print from "@material-ui/icons/Print";
import Typography from "@material-ui/core/Typography";

import {
	DefaultComponentFactory,
	GridView,
	withGridViewActionExecutor,
	withGridViewConfigLoader,
	withGridViewDefaultActions,
	withGridViewPagination,
	withGridViewQueryLoader,
	withGridViewSelection,
	withGridViewSorting
} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";

export default {title: 'Examples/Grid View'};

/*
* Add custom toolbar action to the grid component
*/
export const CustomToolbarAction = () => {

	/**
	 * Custom action that prints "Hello World" message below the grid
	 */
	const withGridViewPrintAction = R.curry((WrappedGrid, props) => {
		const {id: gridId, defaultActions = []} = props;

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [msg, updateMsg] = useState();

		const onRefreshHandler = () => updateMsg("Hello World");

		const _defaultActions = [
			...defaultActions,
			<Tooltip title="Print" key={`${gridId}-print-action`} role="tooltip">
				<IconButton onClick={onRefreshHandler} role="button" aria-label="Refresh">
					<Print/>
				</IconButton>
			</Tooltip>,
		];

		return (
			<>
				<WrappedGrid {...props} defaultActions={_defaultActions}/>

				<Typography variant="h1">{msg}</Typography>
			</>
		);
	});

	/**
	 * Custom Grid View factory with the custom action
	 */
	const GridViewFactory = (props) => {

		const ComposedGridView = R.compose(
			withGridViewConfigLoader,
			withGridViewDefaultActions,
			withGridViewActionExecutor,
			withGridViewQueryLoader,
			withGridViewSorting,
			withGridViewSelection,
			withGridViewPagination,
			withGridViewPrintAction
		)(GridView);

		return (
			<ComposedGridView {...props}/>
		);
	};

	const DomainComponentFactory = R.cond([
		[R.propEq('type', 'grid'), GridViewFactory],
	]);

	/**
	 *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
	 */
	const ComponentFactory = (props) => DomainComponentFactory(props) || DefaultComponentFactory(props)

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page1" ComponentFactory={ComponentFactory}/>
	);
}