import React, {useEffect} from 'react';

import * as R from "ramda";

import {useDispatch, useSelector} from "react-redux";
import {HashRouter as Router} from "react-router-dom";

import {
	Dashboard,
	DefaultFormFieldFactory,
	DefaultThemeProvider,
	FactoryContextProvider,
	forms,
	OneColumnLayout,
	useDefaultFormFieldConditions
} from "@intellective/core";

import {ApplicationFieldFactory, ViewApplicationAction} from "@intellective/forms";

export default {title: 'Examples/Components/Application Form/Field Conditions'};

const settings = {
	variant: 'dialog',
	fullScreen: true,
	margin: 'dense',
	maxWidth: 'xl',
	innerMaxWidth: 'lg',
};

const useConditionalDefaultValue = (field, useFieldCondition) => {
	const {id, formId} = field;

	const dispatch = useDispatch();

	const {shouldUpdate, value} = useFieldCondition(field);

	useEffect(() => {
		if (shouldUpdate) {
			if (value === undefined) {
				dispatch(forms.omitField(formId, id));
			} else {
				dispatch(forms.updateFieldValue(formId, id, value));
			}
		}
	}, [shouldUpdate, value]);

	return field;
};

const useWasteTypesCondition = (field) => {
	const {id, formId} = field;

	const formData = useSelector(R.pathOr({}, ["forms", formId, "data"]));

	const isWasteTransportationApplication = formData["EP_EnvIntTypeCode"]?.value === 'A-TR';

	if (id === "wasteTypes" && isWasteTransportationApplication) {
		const permitType = formData["Permit Type"]?.value;
		const wasteTypes = formData[id]?.value;
		if (permitType === "BiomedicalWasteTransporter") {
			if (wasteTypes !== "BiomedicalWaste") {
				return {shouldUpdate: true, value: "BiomedicalWaste"};
			}
		} else {
			if (wasteTypes === "BiomedicalWaste") {
				return {shouldUpdate: true};
			}
		}
	}
	return {shouldUpdate: false};
};

const useDomainFormFieldConditions = (field) => {

	const _field = useDefaultFormFieldConditions(field);

	return useConditionalDefaultValue(_field, useWasteTypesCondition);
};

const resourceData = {
	caseId: 1000,
	formConfigId: 1000,
	EP_Status: {
		value: "Draft"
	},
	_links: {
		self: {
			href: "/api/applications/1000"
		},
		view: {
			href: "/api/applications/1000/view"
		},
		create: {
			href: "/api/applications/attach?scope=ce_repository"
		}
	}
};

const DomainFormFieldFactory = (field) => ApplicationFieldFactory(field) || DefaultFormFieldFactory(field);

/*
* Add custom form field rendering conditions
*/
export const UsingDomainFieldConditions = () => {

	const ViewAction = ViewApplicationAction({...settings, Layout: OneColumnLayout});

	const action = {
		type: "view"
	};

	return (
		<DefaultThemeProvider>
			<FactoryContextProvider FormFieldFactory={DomainFormFieldFactory}>
				<Router>
					<Dashboard layout={false}>
						<ViewAction action={action}
						            formId="application_form"
						            resourceData={resourceData}
						            selected={resourceData}
						            useFieldConditions={useDomainFormFieldConditions}/>
					</Dashboard>
				</Router>
			</FactoryContextProvider>
		</DefaultThemeProvider>
	);
};