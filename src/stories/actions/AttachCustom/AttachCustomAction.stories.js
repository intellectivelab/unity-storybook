import React, {useContext} from 'react';

import {useDispatch} from "react-redux";

import * as R from "ramda";

import {
    AttachDocumentAction,
	ActionModelCtxt,
    CurrentActionCtxt as CurrentAction,
	Dashboard,
    DefaultActionFactory,
    DefaultActionMapper,
    FactoryContextProvider,
	forms,
    GridView,
    resources as D,
    TwoColumnsLayout,
    withGridViewConfig,
    withGridViewDomainActions,
} from "@intellective/core";

export default {title: 'Examples/Actions/Attach With Default Fields'};

const GridViewFactory = (props) => {

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

const defaultSettings = {
	variant: 'dialog',
	fullScreen: true,
	maxWidth: 'xl',
	innerMaxWidth: 'lg',
	margin: 'dense',
	Layout: TwoColumnsLayout
};

const withDefaultValues = R.curry((WrappedAction, props) => {

	const {action, onDataLoad = R.identity, selected} = props;
	const {_links} = selected;

	const actionModel = useContext(ActionModelCtxt);
	const currentActionContext = useContext(CurrentAction); // current action is attach new document to the case

	const {getActionLink} = actionModel;

	const actionLink = R.defaultTo(action.href)(getActionLink(action, _links));

	const formId = actionLink || action.name;
  
	const dispatch = useDispatch();
  
	const onDataLoadHandler = (data) => {
		const updateFields = data.data;

		//set a default value (not from exisiting properites)
		if (updateFields.companyName) updateFields.companyName.value = "Intellective";
	
		//set a value from the case's existing properities.
		//this will use the case id as the name on the Attach Document page
		const parentAction = currentActionContext.parentAction; // view case action with the case data in selected property
		if (updateFields.fullName) updateFields.fullName.value = R.path(["selected", "id"], parentAction); //take value of id field as an example
	  
		//update the form with the default values
		dispatch(forms.updateFormState(formId, {data: updateFields}));
		return onDataLoad(data);
	};
  
	return <WrappedAction {...props} onDataLoad={onDataLoadHandler}/>;
 });


/*
* Using customized create action
*/
export const UsingDefaultFieldsInAttachDocumentAction = () => {

	/**
	 * Custom action mapper with added condition for Create case domain action
	 */
	const DomainActionMapper = R.curry((settings = {}, action) => {
		return R.cond([
			[D.isAttachNewDocumentAction, R.always(withDefaultValues(AttachDocumentAction(settings)))],
			[R.T, action => DefaultActionMapper(settings, action)],
		])(action);
	});

	/**
	 * Action factory component with redefined ActionMapper
	 */
	const ActionFactory = new DefaultActionFactory(defaultSettings, DomainActionMapper);

	return (
		<FactoryContextProvider ActionFactory={ActionFactory}>
            <Dashboard layout={false}>
			    <GridViewFactory/>
            </Dashboard>
		</FactoryContextProvider>
	);
};
