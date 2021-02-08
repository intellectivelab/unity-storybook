import React, {useEffect, useState} from 'react';

import * as R from "ramda";

import {useDispatch, useSelector} from "react-redux";

import Alert from "@material-ui/lab/Alert";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";

import {
	CreateCaseAttachmentsPage,
	CreateCasePreviewPage,
	CreateCaseWizardAction,
	CreateResourceViewTitle,
	DefaultActionFactory,
	DefaultActionMapper,
	DefaultCaseSubmitHandler,
	DefaultFormSubmitHandlerMapper,
	DefaultViewForm,
	FactoryContextProvider,
	forms,
	FormSubmitAction,
	GridView,
	OneColumnLayout,
	ResourceViewAction,
	ResourceWizard,
	useDefaultFormFieldValidator,
	withActionView,
	withDomainFormFieldValidation,
	withGridViewConfig,
	withGridViewDomainActions,
	withResourceDataLoader
} from "@intellective/core";

export default {title: 'Examples/Form/Validation'};

const DefaultGridViewFactory = (props) => {

	const {Component = GridView, ...otherProps} = props;

	const ComposedGridView = R.compose(withGridViewConfig, withGridViewDomainActions)(Component);

	const _links = {
		config: {
			href: "/api/config/components/casetasks"
		},
		query: {
			href: "/api/casetasks/query",
		},
		list: {
			href: "/api/casetasks/list",
		},
	};

	return (
		<ComposedGridView {...otherProps} _links={_links}/>
	);
};

const settings = {
	variant: 'dialog',
	fullScreen: true,
	maxWidth: 'xl',
	innerMaxWidth: 'lg',
	margin: 'dense',
	Layout: OneColumnLayout
};

/*
* Add custom form field validator
*/
export const UsingFieldValidation = () => {

	const useNoValidation = (inputRef, value, props) => ({error: false});

	const useAsyncTaskIdValidator = (inputRef, value, props) => {

		const [validationResult, updateValidationResult] = useState({error: false});

		useEffect(() => {
			updateValidationResult((state) => ({...state, validating: true}));

			setTimeout(() => {
				updateValidationResult({
					error: !R.equals(Number(value), 0),
					errorText: "TaskId should be equal to zero",
					validating: false
				});
			}, 100);

		}, [value]);

		return validationResult;
	};

	const validators = R.cond([
		[R.propEq("id", "task_id"), R.always(useAsyncTaskIdValidator)],
		[R.propEq("id", "case_status"), R.always(useNoValidation)],
		[R.T, R.always(useDefaultFormFieldValidator)],
	]);

	const DomainViewCaseAction = R.compose(withDomainFormFieldValidation(validators), ResourceViewAction);
	const DomainCreateCaseAction = R.compose(withDomainFormFieldValidation(validators), CreateCaseWizardAction);

	const DomainActionMapper = R.curry((settings = {}, action) => {
		const isViewAction = R.propEq('type', 'view');
		const isCreateAction = R.propEq('type', 'create');

		return R.cond([
			[isViewAction, R.always(DomainViewCaseAction(settings))],
			[isCreateAction, R.always(DomainCreateCaseAction(settings))],
			[R.T, (action) => DefaultActionMapper(settings, action)]
		])(action);
	});

	return (
		<FactoryContextProvider ActionFactory={new DefaultActionFactory(settings, DomainActionMapper)}>
			<DefaultGridViewFactory/>
		</FactoryContextProvider>
	);
};

/*
 * Custom Form Validation Status
*/
export const UsingFormValidationStatus = () => {

	const DomainFormValidationStatus = props => {
		const {formId} = props;

		const dispatch = useDispatch();

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const formSelector = useSelector(({forms}) => (forms[formId]));

		const formState = (formSelector && formSelector.data) || {};

		const taskIdValue = R.path(["task_id", "value"], formState);
		const taskIdInvalid = R.path(["task_id", "invalid"], formState);
		const taskIdErrorText = R.path(["task_id", "errorText"], formState);

		useEffect(() => {
			if (taskIdValue === undefined) {
				return;
			}

			if (taskIdValue === null) {
				dispatch(forms.updateFieldValidation(formId, "task_id", false));
			} else {
				dispatch(forms.updateFieldValidation(formId, "task_id", Number(taskIdValue) !== 0, "TaskId must be equal to 0"));
			}
		}, [taskIdValue]);

		// Optional
		if (Boolean(taskIdInvalid)) {
			return (
				<Alert severity="warning" role="alert">
					<Typography variant="h6">{taskIdErrorText}</Typography>
				</Alert>
			);
		}

		return null;
	}

	const withDomainFormValidationStatus = R.curry((WrappedForm, props) => {

		return (
			<>
				<DomainFormValidationStatus {...props}/>

				<WrappedForm {...props}/>
			</>
		);
	});

	const DomainCasePropertiesPage = {
		label: 'Fill in details',
		icon: CreateIcon,
		view: R.compose(withDomainFormValidationStatus, withResourceDataLoader)(DefaultViewForm),
		actions: [
			<FormSubmitAction key="create-case-submit-action" label="Create"/>
		]
	};

	const DomainCreateCaseAction = (props) => withActionView({
		...props,
		pages: [
			DomainCasePropertiesPage,
			CreateCasePreviewPage,
			CreateCaseAttachmentsPage
		],
		ViewForm: ResourceWizard,
		submitLabel: 'Create Case',
		title: <CreateResourceViewTitle resourceName="Case"/>
	}, () => null);

	const DomainActionMapper = R.curry((settings = {}, action) => {
		// Add custom actions creation logic here. For example,

		const isCreateAction = R.propEq('type', 'create');
		const isCaseResource = R.propEq('resourceName', "cases");
		const isCreateCaseAction = R.allPass([isCreateAction, isCaseResource]);

		return R.cond([
			[isCreateCaseAction, R.always(DomainCreateCaseAction(settings))],
			[R.T, (action) => DefaultActionMapper(settings, action)]
		])(action);
	});

	return (
		<FactoryContextProvider ActionFactory={new DefaultActionFactory(settings, DomainActionMapper)}>
			<DefaultGridViewFactory/>
		</FactoryContextProvider>
	);
};

/*
* Inject custom form submit handler logic
*/
export const UsingFormValidationOnSubmit = () => {

	const isCreateAction = R.propEq('type', 'create');
	const isCaseResource = R.propEq('resourceName', "cases");
	const isCreateCaseAction = R.allPass([isCreateAction, isCaseResource]);

	const DomainCreateCaseSubmitHandler = R.pipe(
		(request) => {
			const {data} = request;

			const taskId = R.path(["task_id", "value"], data);

			if (Number(taskId) !== 0) {
				return Promise.reject(new Error("TaskId should equal to zero"));
			}

			return new Promise((resolve, reject) => resolve(request));
		},
		R.andThen(DefaultCaseSubmitHandler)
	);

	function DomainActionFactory(config = settings) {
		DefaultActionFactory.call(this, config);

		this.getFormSubmitHandler = R.cond([
			[isCreateCaseAction, R.always(DomainCreateCaseSubmitHandler)],
			[R.T, DefaultFormSubmitHandlerMapper]
		]);
	}

	return (
		<FactoryContextProvider ActionFactory={new DomainActionFactory()}>
			<DefaultGridViewFactory/>
		</FactoryContextProvider>
	);
};