import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import * as R from "ramda";

import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import TableCell from "@material-ui/core/TableCell";
import Toolbar from "@material-ui/core/Toolbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/styles/withStyles";

import GetAppIcon from '@material-ui/icons/GetApp';
import Print from "@material-ui/icons/Print";

import {
	DefaultComponentFactory,
	DefaultFormSubmitHandlerMapper,
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
	grids,
	FormField,
	DefaultActionFactory,
	DefaultActionMapper,
	withActionView,
	withActionBackdrop,
	withFormSubmitAction,
	DefaultViewForm,
} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";
import {isDocument} from "@intellective/core/build/factories/resources";
import {getLinkByRel, parseFormData, submitRequest} from "@intellective/core/build/actions";
import {defaultConfig as actionFactoryConfig} from "@intellective/core/build/factories/DefaultActionFactory";
import {
	clearFormState,
	updateFieldValue,
	updateFormState
} from "@intellective/core/build/store/actions/forms";

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
	const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props);

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page1"
		         ComponentFactory={DomainComponentFactory}/>
	);
};

/**
 * Example of form cleanup when component is unmounted
 * Note: it gives error when placed inside UsingToolbarBulkActionWithConfiguredView
 */
const withFormCleanup = R.curry((WrappedComponent, props) => {
	const {formId} = props;
	const dispatch = useDispatch();
	const cleanup = () => dispatch(clearFormState(formId));

	useEffect(() => {
		return cleanup;
	}, []);

	return <WrappedComponent {...props}/>;
});

/*
* Add toolbar bulk action with configured view to the grid component
*/
export const UsingToolbarBulkActionWithConfiguredView = () => {
	/**
	 * Condition to detect Verify action
	 */
	const isVerifyAction = R.allPass([R.propEq('type', 'custom.verify'), isDocument]);

	/**
	 * Form submit handler for Verify action. It sends form data along with selected records ids
	 */
	const VerifyFormSubmitHandler = (props) => {
		const {actionLink, data, fields = {}, selected} = props;

		const parsedFormData = parseFormData(data, fields);

		const payload = {ids: selected.map(s => s.id), formData: parsedFormData};

		return actionLink && submitRequest(actionLink, payload, 'POST');
	};

	/**
	 * Customized form submit handler mapper with Verify action condition added
	 */
	const DomainFormSubmitHandlerMapper = R.cond([
		[isVerifyAction, R.always(VerifyFormSubmitHandler)],
		[R.T, DefaultFormSubmitHandlerMapper]
	]);

	/**
	 * Headless handler for Verify action. It is executed if 'view' link hasn't been returned for some reason
	 */
	const VerifyHeadlessBulkAction = (props) => {
		const {action, selected, onSuccess, onError} = props;

		useEffect(() => {
			const ids = Array.isArray(selected) ? selected.map(s => s.id) : [selected.id];

			const payload = {ids, formData: {}};

			action.href && submitRequest(action.href, payload, 'POST').then(onSuccess).catch(onError);
		}, []);

		return null;
	};

	/**
	 * Verify action definition
	 */
	const VerifyAction = (props) => withActionView({
		...props,
		title: "Verify",
		submitLabel: "Verify",
		ViewForm: R.compose(withFormCleanup, withFormSubmitAction)(DefaultViewForm),
		viewLinkFn: ({_links: actionLinks}, objLinks) => getLinkByRel(objLinks, 'view') || getLinkByRel(actionLinks, 'view'),
	}, withActionBackdrop(VerifyHeadlessBulkAction));

	/**
	 * Custom action mapper with added condition for Verify domain action
	 */
	const DomainActionMapper = R.curry((settings = {}, action) => {
		return R.cond([
			[isVerifyAction, R.always(VerifyAction(settings))],
			[R.T, action => DefaultActionMapper(settings, action)],
		])(action);
	});

	/**
	 * Action factory component with redefined ActionMapper and FormSubmitHandlerMapper components
	 */
	const ActionFactory =
		new DefaultActionFactory(actionFactoryConfig, DomainActionMapper, DomainFormSubmitHandlerMapper);

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page14"
				 ActionFactory={ActionFactory}/>
	);
};

/*
* Add custom toolbar bulk action with custom view to the grid component
*/
export const UsingToolbarBulkActionWithCustomView = () => {
	/**
	 * Condition to detect Verify action
	 */
	const isVerifyAction = R.allPass([R.propEq('type', 'custom.verify'), isDocument]);

	/**
	 * Form submit handler for Verify action. It sends form data along with selected records ids
	 */
	const VerifyFormSubmitHandler = (props) => {
		const {actionLink, data, fields = {}, selected} = props;

		const formData = parseFormData(data, fields);

		const payload = {ids: selected.map(s => s.id), formData};

		return actionLink && submitRequest(actionLink, payload, 'POST');
	};

	/**
	 * Customized form submit handler mapper with Verify action condition added
	 */
	const DomainFormSubmitHandlerMapper = R.cond([
		[isVerifyAction, R.always(VerifyFormSubmitHandler)],
		[R.T, DefaultFormSubmitHandlerMapper]
	]);

	/**
	 * Custom view form for Verify action
	 */
	const VerifyViewForm = (props) => {
		const {classes, formId, actions, loading, FieldComponent = FormField} = props;

		const dispatch = useDispatch();
		const formData = useSelector(R.path(["forms", formId, 'data']));

		useEffect(() => {
			const data = {age: {type: 'range', name: 'range', label: 'Age', value: [18, 60]}};
			dispatch(updateFormState(formId, {data, objLinks: {}}));
		}, []);

		return (<>
			<div className={classes.root}>

				{actions && actions.length > 0 &&
				<Toolbar role="toolbar">
					{loading && <div style={{width: '100%'}}><LinearProgress color="primary"/></div>}
					{!loading && <div style={{flex: '1 1'}}/>}
					{!loading && actions}
				</Toolbar>}

				<div className={classes.content}>
					<Typography display='block' variant="subtitle2" color='textPrimary'>
						Specified age range: {`${R.path(['age', 'value', 0], formData)} - ${R.path(['age', 'value', 1], formData)}`} <sup>1</sup>
					</Typography>
					<form id={formId} noValidate role="form" aria-label="Details View">
						<FieldComponent {...R.prop('age', formData)} formatValue={x => `${x} years`}
										data={[{value: 0}, {value: 18}, {value: 25}, {value: 35}, {value: 45}, {value: 60}, {value: 99}]}
										onChange={(value) => dispatch(updateFieldValue(formId, 'age', value))}/>
					</form>
					<Typography display='block' variant="body2" color='textSecondary' mt={3}>
						<p><sup>1</sup>A business must identify and understand its target audience if their marketing campaign is
							to be successful. It allows the business to craft their products or services to the wants
							and needs of customers, in order to maximise sales and therefore revenue.
							A successful marketing campaign connects with consumers on a personal dB level, which will
							help the business to develop long-term relationships with customers (Sherlock, 2014).
						</p>

						<p>Not all consumers are the same. Determining the target audience is key to reaching the loyal
							and high-profit customers, in order to ensure a return on investment (Cahill, 1997, p. 10-11).
						</p>

						<p>To determine the target audience, the business must first identify what problem their
							product or service solves, or what need or want it fulfills (Sherlock, 2014).
							The problem must be one that consumers are aware of and thus will be interested in solving.
						</p>
					</Typography>
				</div>
			</div>
		</>)
	};

	/**
	 * Styles for VerifyViewForm
	 */
	const styles = (theme) => ({
		root: {
			width: '100%',
		},
		content: {
			marginTop: theme.spacing(2)
		},
	});

	/**
	 * Verify action definition
	 */
	const VerifyAction = (props) => withActionView({
		...props,
		title: "Verify",
		submitLabel: "Verify",
		ViewForm: R.compose(withFormSubmitAction, withStyles(styles))(VerifyViewForm),
	}, () => null);

	/**
	 * Custom action mapper with added condition for Verify domain action
	 */
	const DomainActionMapper = R.curry((settings = {}, action) => {
		return R.cond([
			[isVerifyAction, R.always(VerifyAction(settings))],
			[R.T, action => DefaultActionMapper(settings, action)],
		])(action);
	});

	/**
	 * Action factory component with redefined ActionMapper and FormSubmitHandlerMapper components
	 */
	const ActionFactory =
		new DefaultActionFactory(actionFactoryConfig, DomainActionMapper, DomainFormSubmitHandlerMapper);

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page14"
				 ActionFactory={ActionFactory}/>
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
	const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props);

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page12"
		         ComponentFactory={DomainComponentFactory}/>
	);
};

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
	const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props);

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
	const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props);

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page1"
				 ComponentFactory={DomainComponentFactory}/>
	);
};
