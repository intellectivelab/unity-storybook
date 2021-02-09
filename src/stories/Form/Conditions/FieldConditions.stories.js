import React from 'react';

import * as R from "ramda";

import {useSelector} from "react-redux";

import {
	DefaultActionFactory,
	DefaultActionMapper,
	FactoryContextProvider,
	GridView,
	OneColumnLayout,
	ResourceViewAction,
	useDefaultFormFieldConditions,
	withGridViewConfig,
	withGridViewDomainActions
} from "@intellective/core";

export default {title: 'Examples/Form/Rendering'};

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
	margin: 'dense',
	maxWidth: 'xl',
	innerMaxWidth: 'lg',
	Layout: OneColumnLayout
};

const useDomainFormFieldConditions = (field) => {

	const {formId} = field;

	const formData = useSelector(R.pathOr({}, ["forms", formId, "data"]));

	const shouldCaseIdBeReadOnly = (field) => {
		const {id} = field;

		if (id !== "case_id") {
			return false;
		}

		const taskId = formData["task_id"]?.value;

		return Number(taskId) === 0;
	}

	const _field = useDefaultFormFieldConditions(field);

	return R.cond([
		[shouldCaseIdBeReadOnly, R.over(R.lensProp('readOnly'), R.always(true))],
	])(_field);
};

/*
* Add custom form field rendering conditions
*/
export const UsingFieldConditions = () => {

	const DomainActionMapper = R.curry((settings = {}, action) => {
		return R.cond([
			[R.propEq('type', 'view'), R.always(ResourceViewAction({
				...settings,
				useFieldConditions: useDomainFormFieldConditions
			}))],
			[R.T, (action) => DefaultActionMapper(settings, action)]
		])(action);
	});

	return (
		<FactoryContextProvider ActionFactory={new DefaultActionFactory(settings, DomainActionMapper)}>
			<DefaultGridViewFactory/>
		</FactoryContextProvider>
	);
};