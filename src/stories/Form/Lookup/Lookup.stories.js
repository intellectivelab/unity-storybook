import React from 'react';

import * as R from "ramda";

import {useDispatch} from "react-redux";

import {DefaultFormFieldRenderer, forms, LookupField, withFormLookupContext, withLookupConfigLoader} from "@intellective/core";

export default {title: 'Examples/Form/Lookup'};

const withSelectionHandler = R.curry((WrappedField, props) => {
	const {formId} = props;

	const dispatch = useDispatch();

	/**
	 * Takes a context of the selected entity from the lookup field and populate other field
	 * @type {any}
	 */
	const onLookupSelectHandler = (value) => {
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

		dispatch(forms.updateFieldValue(formId, "address", address));
	};

	return (
		<>
			<WrappedField {...props} onSelect={onLookupSelectHandler}/>

			<DefaultFormFieldRenderer formId={formId} field={{id: "address", type: "string"}}/>
		</>
	);
});

export const UsingLookupSelection = () => {
	const DomainLookupField = R.compose(withLookupConfigLoader, withFormLookupContext, withSelectionHandler)(LookupField);

	const formId = "default";

	const lookupLink = "/api/config/components/usersLookup";
	const lookupDataLink = "/api/config/components/usersLookup/data?id={id}";

	return (
		<DomainLookupField id="users"
		                   label="User"
		                   formId={formId}
		                   lookupLink={lookupLink}
		                   lookupDataLink={lookupDataLink}/>
	);
}

