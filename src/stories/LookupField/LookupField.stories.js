import React from 'react';

import * as R from "ramda";

import {DefaultFormFieldFactory, forms, LookupField} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";
import {useDispatch} from "react-redux";

export default {title: 'Examples/Lookup Field'};

const withSelectionHandler = R.curry((formId, fieldId, WrappedField, props) => {
	const dispatch = useDispatch();

	/**
	 * Takes a context of the selected entity from the lookup field and populate other field
	 * @type {any}
	 */
	const onLookupSelectHandler = R.curry((formId, fieldId, value) => {
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

	return <WrappedField {...props} onSelect={onLookupSelectHandler(formId, fieldId)}/>;
});

const UsersLookupFieldFactory = (props) => {
	const {formId} = props;

	const linkedFieldId = "assignee_address";

	return R.compose(withSelectionHandler(formId, linkedFieldId))(LookupField);
};

const DomainFieldMapper = R.cond([
	[R.propEq('lookupId', 'usersLookup'), UsersLookupFieldFactory],
]);

const DomainFormFieldFactory = (props) => DomainFieldMapper(props) || DefaultFormFieldFactory(props)

export const UsingLookupSelection = () => {
	return <AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page12"
	                FormFieldFactory={DomainFormFieldFactory}/>;
}

