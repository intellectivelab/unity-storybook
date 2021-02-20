import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";

import * as R from "ramda";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/styles/withStyles";

import Print from "@material-ui/icons/Print";

import {
	DefaultActionFactory,
	DefaultActionMapper,
	DefaultFormSubmitHandlerMapper,
	DefaultViewForm,
	FactoryContextProvider,
	FormField,
	forms,
	GridView,
	parseFormData,
	resources,
	submitRequest,
	TwoColumnsLayout,
	withActionBackdrop,
	withActionView,
	withFormSubmitAction,
	withGridViewConfig,
	withGridViewDomainActions,
} from "@intellective/core";

export default {title: 'Examples/Components/GridView/Actions'};

const getLinkByRel = (_links, type, name) => _links && (_links[name] || _links[type] || {}).href;

const {isDocument} = resources;

const {clearFormState, updateFieldValue, updateFormState} = forms;

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
* Using custom grid bulk action with default view
*/
export const UsingBulkAction = () => {
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

	const settings = {
		variant: 'dialog',
		fullScreen: true,
		maxWidth: 'xl',
		innerMaxWidth: 'lg',
		margin: 'dense',
		Layout: TwoColumnsLayout
	};

	/**
	 * Action factory component with redefined ActionMapper and FormSubmitHandlerMapper components
	 */
	const ActionFactory =
		new DefaultActionFactory(settings, DomainActionMapper, DomainFormSubmitHandlerMapper);

	return (
		<FactoryContextProvider ActionFactory={ActionFactory}>
			<DefaultGridViewFactory/>
		</FactoryContextProvider>
	);
};

/*
* Using custom grid bulk action with custom view
*/
export const UsingActionViewForm = () => {
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
						Specified age
						range: {`${R.path(['age', 'value', 0], formData)} - ${R.path(['age', 'value', 1], formData)}`}
						<sup>1</sup>
					</Typography>
					<form id={formId} noValidate role="form" aria-label="Details View">
						<FieldComponent {...R.prop('age', formData)} formatValue={x => `${x} years`}
						                data={[{value: 0}, {value: 18}, {value: 25}, {value: 35}, {value: 45}, {value: 60}, {value: 99}]}
						                onChange={(value) => dispatch(updateFieldValue(formId, 'age', value))}/>
					</form>
					<Typography display='block' variant="body2" color='textSecondary' mt={3}>
						<p><sup>1</sup>A business must identify and understand its target audience if their marketing
							campaign is
							to be successful. It allows the business to craft their products or services to the wants
							and needs of customers, in order to maximise sales and therefore revenue.
							A successful marketing campaign connects with consumers on a personal dB level, which will
							help the business to develop long-term relationships with customers (Sherlock, 2014).
						</p>

						<p>Not all consumers are the same. Determining the target audience is key to reaching the loyal
							and high-profit customers, in order to ensure a return on investment (Cahill, 1997, p.
							10-11).
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
			marginTop: 16//theme.spacing(2)
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

	const settings = {
		variant: 'dialog',
		fullScreen: true,
		maxWidth: 'xl',
		innerMaxWidth: 'lg',
		margin: 'dense',
		Layout: TwoColumnsLayout
	};

	/**
	 * Action factory component with redefined ActionMapper and FormSubmitHandlerMapper components
	 */
	const ActionFactory = new DefaultActionFactory(settings, DomainActionMapper, DomainFormSubmitHandlerMapper);

	return (
		<FactoryContextProvider ActionFactory={ActionFactory}>
			<DefaultGridViewFactory/>
		</FactoryContextProvider>
	);
};

/*
* Using custom grid toolbar action
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

	return (
		<DefaultGridViewFactory Component={withGridViewPrintAction(GridView)}/>
	);
};