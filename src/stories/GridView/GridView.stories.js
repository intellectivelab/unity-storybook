import React, {useState} from 'react';

import * as R from "ramda";

import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Print from "@material-ui/icons/Print";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import GetAppIcon from '@material-ui/icons/GetApp';

import {
	DefaultComponentFactory,
	defaultGridViewSettings,
	GridView,
	withGridViewActionExecutor,
	withGridViewConfigLoader,
	withGridViewDefaultActions,
	withGridViewModelBulkActions,
	withGridViewPagination,
	withGridViewDataLoader,
	withGridViewSelection,
	withGridViewSettings,
	withGridViewSorting,
	withGridViewRowActions,
	useDefaultColumnRenderer
} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";

export default {title: 'Examples/Grid View'};

/*
* Add custom toolbar action to the grid component
*/
export const UsingToolbarAction = () => {

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
			withGridViewSettings(defaultGridViewSettings),
			withGridViewDefaultActions,
			withGridViewModelBulkActions,
			withGridViewActionExecutor,
			withGridViewDataLoader,
			withGridViewSorting,
			withGridViewSelection,
			withGridViewPagination,
			withGridViewPrintAction
		)(GridView);

		return (
			<ComposedGridView {...props}/>
		);
	};

	const DomainComponentMapping = R.cond([
		[R.propEq('type', 'grid'), GridViewFactory],
	]);

	/**
	 *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
	 */
	const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props)

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page1"
		         ComponentFactory={DomainComponentFactory}/>
	);
};

/*
* Add custom column renderer
*/
export const UsingColumnRendering = () => {

	const mapValue = R.cond([
		[R.is(Array), R.map(R.when(R.is(Object), R.prop('value')))],
		[R.is(Object), R.prop('value')],
		[R.T, R.identity]
	]);

	const renderStatus = R.curry((column, value) => {
		const {name} = column;

		if (value === undefined || value === null || value === '') {
			return null;
		}

		const isCaseStatus = "case_status" === name;

		const severity = R.cond([
			[R.equals("Open"), R.always("info")],
			[R.equals("Error"), R.always("error")],
			[R.equals("Close"), R.always("success")],
			[R.T, R.always("warning")],
		])(value);

		const icon = isCaseStatus ? {icon: false} : {};

		return <Alert variant={isCaseStatus ? "filled" : "outlined"} severity={severity} {...icon}>{value}</Alert>;
	});

	const domainStatusColumnRenderer = (value, row, column) => R.compose(renderStatus(column), mapValue)(value);

	const withDomainColumnRendering = R.curry((WrappedGrid, props) => {
		const {columns = []} = props;

		const isCaseStatusColumn = R.anyPass([R.propEq('name', 'case_status'), R.propEq('name', 'task_status')]);

		const customStatusColumn = R.when(isCaseStatusColumn, column => ({
			...column,
			renderer: domainStatusColumnRenderer
		}));

		const _columns = R.map(customStatusColumn, columns);

		return <WrappedGrid {...props} columns={_columns}/>;
	});

	/**
	 * Custom Grid View factory with the custom column renderer addition
	 */
	const GridViewFactory = (props) => {
		const ComposedGridView = R.compose(
			withGridViewConfigLoader,
			withGridViewSettings(defaultGridViewSettings),
			withGridViewDefaultActions,
			withGridViewModelBulkActions,
			withGridViewActionExecutor,
			withGridViewDataLoader,
			withGridViewSorting,
			withGridViewSelection,
			withGridViewPagination,
			withDomainColumnRendering
		)(GridView);

		return (
			<ComposedGridView {...props}/>
		);
	};

	const DomainComponentMapping = R.cond([
		[R.propEq('type', 'grid'), GridViewFactory],
	]);

	/**
	 *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
	 */
	const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props)

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page12"
		         ComponentFactory={DomainComponentFactory}/>
	);
}

/*
* Add custom column action
*/
export const UsingCustomColumnAction = () => {

	/**
	 * Custom action that invokes download action on customActionType column click
	 */
		const withCustomConfig = R.curry((WrappedGrid, props) => {

			const customActionRenderer= (value, record, column) => {
				const handleClick = (event) => {
					event.preventDefault();

					column.onClick && column.onClick(record);
				};

				return	<Tooltip title={column.label} role="tooltip">
					<GetAppIcon cursor='pointer' color="inherit" onClick={handleClick}/>
				</Tooltip>;
			};

		const {columns=[]} = props;

		const customColumn = {
			actionType: "download",
			dataType: "customActionType",
			label: "Custom Action Type",
			name: "customActionType",
			renderer: customActionRenderer,
			sortable: false,
			tooltip: "Custom Action Type",
			width: 100
		}
		return <WrappedGrid {...props} columns={[...columns, customColumn]} default={[...props.default, 'customActionType']}/>
	});

	/**
	 * Custom Grid View factory with the custom column action
	 */
	const GridViewFactory = (props) => {
		const ComposedGridView = R.compose(
			withGridViewConfigLoader,
			withCustomConfig,
			withGridViewSettings(defaultGridViewSettings),
			withGridViewDefaultActions,
			withGridViewModelBulkActions,
			withGridViewRowActions,
			withGridViewActionExecutor,
			withGridViewDataLoader,
			withGridViewSorting,
			withGridViewSelection,
			withGridViewPagination
		)(GridView);

		return (
			<ComposedGridView {...props}/>
		);
	};

	const DomainComponentMapping = R.cond([
		[R.propEq('type', 'grid'), GridViewFactory],
	]);

	/**
	 *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
	 */
	const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props)

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page1"
				 ComponentFactory={DomainComponentFactory}/>
	);
}

export const UsingCustomColumnActionV2 = () => {

	const withCustomColumnActionType = R.curry((WrappedGrid, props) => {

		const useColumnActionType = R.cond([[R.propEq('name', 'fullName'), R.always('download')]]);

		const customActionRenderer = R.curry((column) => {

			return (value, record, column) => {
				const handleClick = (event) => {
					event.preventDefault();

					column.onClick && column.onClick(record);
				};

				return	<Tooltip title={column.label} role="tooltip">
					<GetAppIcon cursor='pointer' color="inherit" onClick={handleClick}/>
				</Tooltip>;
			};
		});

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const useColumnRenderer = column => R.cond([[R.propEq('name', 'fullName'), customActionRenderer]])(column) || useDefaultColumnRenderer(column);

		return <WrappedGrid {...props} useColumnActionType={useColumnActionType} useColumnRenderer={useColumnRenderer} />;
	});

	const GridViewFactory = (props) => {
		const ComposedGridView = R.compose(
			withCustomColumnActionType,
			withGridViewConfigLoader,
			withGridViewSettings(defaultGridViewSettings),
			withGridViewDefaultActions,
			withGridViewModelBulkActions,
			withGridViewRowActions,
			withGridViewActionExecutor,
			withGridViewDataLoader,
			withGridViewSorting,
			withGridViewSelection,
			withGridViewPagination,
		)(GridView);

		return (
			<ComposedGridView {...props}/>
		);
	};

	const DomainComponentMapping = R.cond([
		[R.propEq('type', 'grid'), GridViewFactory],
	]);

	/**
	 *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
	 */
	const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props)

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page1"
				 ComponentFactory={DomainComponentFactory}/>
	);
};

