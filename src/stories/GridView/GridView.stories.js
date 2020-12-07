import React, {useState, useMemo} from 'react';

import {useDispatch} from "react-redux";

import * as R from "ramda";

import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Print from "@material-ui/icons/Print";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

import {
	DefaultComponentFactory,
	defaultGridViewSettings,
	GridView,
	withGridViewActionExecutor,
	withGridViewConfigLoader,
	withGridViewDefaultActions,
	withGridViewModelBulkActions,
	withGridViewPagination,
	withGridViewQueryLoader,
	withGridViewSelection,
	withGridViewSettings,
	withGridViewSorting,
	Checkbox,
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
			withGridViewQueryLoader,
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
* Add row double-click handler
*/
export const UsingDoubleClickHandler = () => {

	const UPDATE_GRID_CURRENT_ACTION = "UPDATE_GRID_CURRENT_ACTION";

	const updateGridCurrentAction = (id, currentAction) => ({
		type: UPDATE_GRID_CURRENT_ACTION,
		id, currentAction
	});

	const useCellRenderer = R.curry((classes, row, column) => {
		if (React.isValidElement(column)) {
			return (
				<TableCell key={`${row.id}-${column.props.name}`} className={classes.tableCell} scope="row" variant="body">
					{React.cloneElement(column, {row})}
				</TableCell>
			);
		}

		const value = row[column.name];

		const numeric = R.anyPass([
			R.propEq('dataType', 'int'),
			R.propEq('dataType', 'long'),
			R.propEq('dataType', 'number'),
			R.propEq('dataType', 'float')
		])(column);

		return (
			<TableCell key={`${row.id}-${column.name}`} className={classes.tableCell} scope="row" variant="body" align={numeric ? 'right' : 'left'}>
				{column.renderer ? column.renderer(value, row, column) : value}
			</TableCell>
		);
	});

	const CustomTableRowRenderer = (props) => {
		const {classes, columns, data, checked, disabled, enableSelection, onRowSelect, onRowDoubleClickAction} = props;

		const cellRenderer = useCellRenderer(classes, data);

		return (
			<TableRow aria-checked={checked} role="row" hover selected={checked} tabIndex={-1} onDoubleClick={() => onRowDoubleClickAction?.(data)}>
				{enableSelection &&
				<TableCell className={classes.tableCell} padding="checkbox">
					<Checkbox checked={checked}
							  disabled={disabled}
							  inputProps={{'aria-label': ' checkbox-' + data.id}}
							  onChange={() => onRowSelect && onRowSelect(data)}/>
				</TableCell>}

				{useMemo(() => R.addIndex(R.map)(cellRenderer, columns), [data, columns])}
			</TableRow>
		);
	};

	const TableRowContainer = (props) => {
		const {classes, idx, columns, data, checked, disabled, enableSelection, selected, onRowSelect, onRowDoubleClickAction, TableRowRenderer = CustomTableRowRenderer} = props;

		return useMemo(() => (
			<TableRowRenderer idx={idx}
							  classes={classes}
							  columns={columns}
							  data={data}
							  checked={checked}
							  disabled={disabled}
							  enableSelection={enableSelection}
							  onRowSelect={onRowSelect}
							  onRowDoubleClickAction={onRowDoubleClickAction}
			/>
		), [idx, columns, checked, disabled, data, enableSelection, selected, onRowDoubleClickAction]);
	};

	const CustomTableBodyRenderer = (props) => {
		const {
			id: tableId,
			records = [],
			classes,
			columns,
			selected,
			enableSelection,
			onCheckPreselected,
			onRowSelect,
			TableRowRenderer,
			onRowDoubleClickAction
		} = props;

		const dispatch = useDispatch();

		return (
			<TableBody>
				{R.addIndex(R.map)((record, idx) => {
					const disabled = onCheckPreselected && onCheckPreselected(record.id);
					const checked = disabled || (selected && selected.some(s => s.id === record.id));

					return (
						<TableRowContainer key={`${record.id}-${idx}`}
										   idx={idx}
										   tableId={tableId}
										   classes={classes}
										   columns={columns}
										   checked={checked}
										   disabled={disabled}
										   data={record}
										   enableSelection={enableSelection}
										   selected={selected}
										   onRowSelect={onRowSelect}
										   TableRowRenderer={TableRowRenderer}
										   onRowDoubleClickAction={onRowDoubleClickAction && R.compose(dispatch, onRowDoubleClickAction)}
						/>
					);
				}, records)}
			</TableBody>
		);
	};

	/**
	 * Custom withRowDoubleClickHandler which takes actionName as an argument and searches for it in array with existing actions
	 */
	const withRowDoubleClickHandler = R.curry((actionName, WrappedGrid, props) => {
		const {id, actions} = props;
		const action = R.find(R.propEq("name", actionName), actions);

		return <WrappedGrid {...props} TableBodyRenderer={CustomTableBodyRenderer}
					 onRowDoubleClickAction={action ? selected => updateGridCurrentAction(id, {action, selected}) : undefined}/>;
	});

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
			withGridViewQueryLoader,
			withGridViewSorting,
			withGridViewSelection,
			withGridViewPagination,
			withRowDoubleClickHandler("view")
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