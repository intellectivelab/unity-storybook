import React, {useEffect, useState} from 'react';

import * as R from "ramda";

import {
	CreateCaseWithAttachments,
	DefaultActionFactory,
	DefaultActionMapper,
	DefaultComponentFactory,
	DefaultCreateCaseSubmitHandler,
	DefaultFormSubmitHandlerMapper,
	GridView,
	withFormFieldValidators,
	withGridViewActionExecutor,
	withGridViewConfigLoader,
	withGridViewDefaultActions,
	withGridViewModelBulkActions,
	withGridViewPagination,
	withGridViewQueryLoader,
	withGridViewSelection,
	withGridViewSorting
} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";

export default {title: 'Examples/Form Validation'};

const GridViewFactory = (props) => {

	const ComposedGridView = R.compose(
		withGridViewConfigLoader,
		withGridViewDefaultActions,
		withGridViewModelBulkActions,
		withGridViewActionExecutor,
		withGridViewQueryLoader,
		withGridViewSorting,
		withGridViewSelection,
		withGridViewPagination,
	)(GridView);

	return (
		<ComposedGridView {...props}/>
	);
};

const DomainComponentMapper = R.cond([
	[R.propEq('type', 'grid'), GridViewFactory],
]);

/**
 *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
 */
const DomainComponentFactory = (props) => DomainComponentMapper(props) || DefaultComponentFactory(props)

/*
* Add custom form field validator
*/
export const CustomFormFieldValidation = () => {

	const useNoValidation = () => ({error: false});

	const useAsyncTaskIdValidator = (inputRef, value, field) => {

		const [validationResult, updateValidationResult] = useState({error: false});

		useEffect(() => {
			updateValidationResult((state) => ({...state, validating: true}));

			setTimeout(() => {
				updateValidationResult({error: !R.equals(Number(value), 0), errorText: "TaskId should be equal to zero", validating: false});
			}, 2000);

		}, [value]);

		return validationResult;
	};

	const domainFieldValidators = R.cond([
		[R.propEq("id", "task_id"), R.always(useAsyncTaskIdValidator)],
		[R.propEq("id", "case_status"), R.always(useNoValidation)],
	]);

	const withCustomFieldValidation = withFormFieldValidators(domainFieldValidators);

	const DomainCreateCaseAction = R.compose(withCustomFieldValidation, CreateCaseWithAttachments);

	function DomainActionFactory(defaultSettings = {}) {
		DefaultActionFactory.call(this, defaultSettings);

		const DomainActionMapper = R.curry((settings = {}, action) => {
			// Add custom actions creation logic here. For example,

			const isCreateAction = R.propEq('type', 'create');
			const isCaseResource = R.propEq('resourceName', "cases");
			const isCreateCaseAction = R.allPass([isCreateAction, isCaseResource]);

			return R.cond([
				[isCreateCaseAction, R.always(DomainCreateCaseAction(settings))],
			])(action);
		});

		this.createAction = R.curry((action, props) => {
			const {settings = {}, ...otherProps} = props;

			const {view: viewSettings = {}} = settings;

			const ActionComponent = DomainActionMapper({...defaultSettings, ...viewSettings}, action) || DefaultActionMapper({...defaultSettings, ...viewSettings}, action);

			return <ActionComponent {...otherProps} {...action} action={action}/>;
		});
	}

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page12"
		         ActionFactory={DomainActionFactory}
		         ComponentFactory={DomainComponentFactory}
		/>
	);
};

/*
* Inject custom form submit handler logic
*/
export const CustomFormSubmitHandler = () => {

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
		R.andThen(DefaultCreateCaseSubmitHandler)
	);

	function DomainActionFactory(defaultSettings = {}) {
		DefaultActionFactory.call(this, defaultSettings);

		const DomainFormSubmitHandlerMapper = R.cond([
			[isCreateCaseAction, R.always(DomainCreateCaseSubmitHandler)],
		]);

		this.getFormSubmitHandler = (props) => DomainFormSubmitHandlerMapper(props) || DefaultFormSubmitHandlerMapper(props);
	}

	return (
		<AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page12"
		         ActionFactory={DomainActionFactory}
		         ComponentFactory={DomainComponentFactory}
		/>
	);
};