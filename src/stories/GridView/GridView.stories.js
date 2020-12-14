import React, {useState} from 'react';

import {useDispatch} from "react-redux";

import * as R from "ramda";

import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Print from "@material-ui/icons/Print";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import GetAppIcon from '@material-ui/icons/GetApp';
import TableCell from "@material-ui/core/TableCell";

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
	useDefaultColumnRenderer,
	grids
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
	 * Custom action that invokes download action on fullName column click instead of view action
	 */
	const withCustomColumnActionType = R.curry((WrappedGrid, props) => {

		const mappedColumnName = 'gender';

		const useColumnActionType = R.cond([[R.propEq('name', mappedColumnName), R.always('download')]]);

		const customActionRenderer = R.curry((column) => {

			return (value, record, column) => {
				const handleClick = (event) => {
					event.preventDefault();

					column.onClick && column.onClick(record);
				};

				return <Tooltip title={column.label} role="tooltip">
					<GetAppIcon cursor='pointer' color="inherit" onClick={handleClick}/>
				</Tooltip>;
			};
		});

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const useColumnRenderer = column => R.cond([[R.propEq('name', mappedColumnName), customActionRenderer]])(column) || useDefaultColumnRenderer(column);

		return <WrappedGrid {...props} useColumnActionType={useColumnActionType} useColumnRenderer={useColumnRenderer} />;
	});

	/**
	 * Custom Grid View factory with the custom column action
	 */
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

/*
* Add row double-click handler
*/

/**
 *  Custom action that implements customCellRenderer with onDoubleClick handler
 */
const findCustomAction = actionName => R.find(R.propEq("name", actionName));

const withUseCustomCellRenderer = R.curry((WrappedGrid, props) => {
	const {id, actions} = props;
	const dispatch = useDispatch();

	const action = findCustomAction('view')(actions);

	const useCustomCellRenderer = R.curry((classes, row, column) => {

		const value = row[column.name];

		return (
			<TableCell onDoubleClick={() => dispatch(grids.updateGridCurrentAction(id, {action, selected: row}))} key={`${row.id}-${column.name}`} className={classes.tableCell} scope="row" variant="body">
				{column.renderer ? column.renderer(value, row, column) : value}
			</TableCell>
		);
	});

	return <WrappedGrid {...props} useCellRenderer={useCustomCellRenderer}/>;
});

export const UsingDoubleClickHandler = () => {

	/**
	 * Custom Grid View factory with double click handler addition
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
			withUseCustomCellRenderer
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
