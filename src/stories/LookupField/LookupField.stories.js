import React, {useMemo} from 'react';

import * as R from "ramda";

import {
	CreateCaseAttachmentsPage,
	CreateCasePreviewPage,
	DefaultActionFactory,
	DefaultActionMapper,
	DefaultComponentFactory,
	defaultGridViewSettings,
	DefaultViewForm,
	FormField,
	forms,
	GridView,
	LookupField,
	ResourceCreateViewTitle,
	ResourceCreateWizard,
	useDefaultFormFieldMapper,
	withActionView,
	withGridViewActionExecutor,
	withGridViewConfigLoader,
	withGridViewDefaultActions,
	withGridViewModelBulkActions,
	withGridViewPagination,
	withGridViewQueryLoader,
	withGridViewSelection,
	withGridViewSettings,
	withGridViewSorting,
	withResourceDataLoader
} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";
import {useDispatch} from "react-redux";
import CreateIcon from "@material-ui/icons/Create";

export default {title: 'Examples/Lookup Field'};

/**
 * Takes a context of the selected entity from the lookup field and populate other field
 * @type {any}
 */
const onLookupSelectHandler = R.curry((formId, fieldId, dispatch, value) => {
	const nameMapper = value => {
		const nameExtractor = value => value && value.name || value && value.value || value;
		return value && Array.isArray(value) ? value.map(v => nameExtractor(v)) : nameExtractor(value);
	};

	const address = R.compose(
		R.join(','),
		R.map(nameMapper),
		R.values,
		R.pick(['country', 'state', 'city', 'zipCode'])
	)(value || {});

	dispatch(forms.updateFieldValue(formId, fieldId, address));
});

/**
 * HOC of the ViewForm component to extend the lookup field with withSelectionHandler HOC.
 * @type {any}
 */
const withCustomFormField = R.curry((WrappedForm, props) => {
	const {formId} = props;
	const {FieldComponent = FormField, ...otherProps} = props;

	const dispatch = useDispatch();

	const withSelectionHandler = R.curry((formId, fieldId, WrappedField, props) => {
		return <WrappedField {...props} onSelect={onLookupSelectHandler(formId, fieldId, dispatch)}/>;
	});


	const withCustomFieldMapper = R.curry((WrappedField, props) => {
		const {lookupId} = props;
		const linkedFieldId = "assignee_address";

		const UsersLookupField = useMemo(() => R.compose(withSelectionHandler(formId, linkedFieldId))(LookupField), []);

		const domainFormFieldMapper = R.cond([
			[() => "usersLookup" === lookupId, R.always(UsersLookupField)],
			[R.T, useDefaultFormFieldMapper]
		]);
		return <WrappedField {...props} fieldMapper={domainFormFieldMapper}/>
	});

	const _FieldComponent = withCustomFieldMapper(FieldComponent);

	return <WrappedForm FieldComponent={_FieldComponent} {...otherProps} />
});

/*Extend the default view form component with the custom form field mapper.*/
const CustomForm = R.compose(withResourceDataLoader, withCustomFormField)(DefaultViewForm);

const GridViewFactory = (props) => {

	const {Component = GridView} = props;

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
	)(Component);

	return (
		<ComposedGridView {...props}/>
	);
};

const DomainComponentMapper = R.cond([
	[R.propEq('type', 'grid'), GridViewFactory],
]);

const DomainComponentFactory = (props) => DomainComponentMapper(props) || DefaultComponentFactory(props)

/*
 * Custom Lookup Field Component Example
*/
export const CustomLookupFieldComponent = () => {

	const DomainCreateCasePropertiesPage = {
		label: 'Fill in details',
		icon: CreateIcon,
		view: CustomForm,
		onSuccess: () => "Case successfully created"
	};

	const DomainCreateCaseAction = (props) => withActionView({
		...props,
		title: <ResourceCreateViewTitle resourceName="Case"/>,
		ViewForm: ResourceCreateWizard,
		pages: [DomainCreateCasePropertiesPage, CreateCasePreviewPage, CreateCaseAttachmentsPage],
		submitLabel: 'Create Case'
	}, () => null);

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
}

