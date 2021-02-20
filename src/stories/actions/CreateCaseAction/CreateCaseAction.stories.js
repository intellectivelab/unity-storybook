import React from 'react';

import {useSelector} from "react-redux";

import * as R from "ramda";

import AttachFileIcon from "@material-ui/icons/AttachFile";

import {
	CreateCaseDetailsPage,
	CreateCasePreviewPage,
	CreateResourceViewTitle,
	CurrentActionCtxt as CurrentAction,
	DefaultActionFactory,
	DefaultActionMapper,
	FactoryContextProvider,
	GridView,
	parseFormData,
	resources as D,
	ResourceViewSkeleton,
	ResourceWizard,
	SearchTemplate,
	TabContainer,
	TwoColumnsLayout,
	useResourceViewLoader,
	withActionView,
	withGridViewConfig,
	withGridViewDomainActions,
	withResourceViewTabTemplates
} from "@intellective/core";

export default {title: 'Examples/Actions/Create Case'};

const CasesGridViewFactory = (props) => {

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

/*
* Using customized create action
*/
export const UsingCustomWizardPage = () => {
	/**
	 * Customized view for Attach documents step
	 */
	const CaseTabTemplates = withResourceViewTabTemplates(SearchTemplate);

	const CustomCaseAttachments = (props) => {
		const {formId, currentAction = {}, scrollableRef, onError, action} = props;

		const formState = useSelector(R.pathOr({}, ["forms", formId]));

		const {data, objLinks: _links} = formState;

		const payload = parseFormData(data);

		const {status, data: view = {}, error} = useResourceViewLoader(R.path(["_links", "view", "href"], action));

		if (status === "loading") {
			return (
				<div style={{marginTop: "24px"}}>
					<ResourceViewSkeleton/>
				</div>
			);
		}

		if (status === "failed" && error) {
			onError && onError(error);

			return (
				<div style={{marginTop: "24px"}}>
					<ResourceViewSkeleton/>
				</div>
			);
		}

		const tabRenderer = (tab) => <CaseTabTemplates formId={formId} tab={tab} scrollableRef={scrollableRef} onError={onError}/>;

		const {tabs = []} = view;

		const attachmentsTabs = tabs.filter(tab => tab.type === 'Attachments');

		return (
			<CurrentAction.Provider value={{...currentAction, selected: {...payload, _links}}}>
				{attachmentsTabs.length > 1
					? <TabContainer components={attachmentsTabs} renderer={tabRenderer} scrollableRef={scrollableRef}/>
					: tabRenderer(attachmentsTabs[0])}
			</CurrentAction.Provider>
		);
	};

	/**
	 * Customized page for Attach documents step
	 */
	const CustomCreateCaseAttachmentsPage = {
		label: 'Attach documents',
		icon: AttachFileIcon,
		view: CustomCaseAttachments,
		actions: [
			{type: 'back'},
			{type: 'complete', color: 'secondary', variant: 'contained'},
		]
	};

	/**
	 * Custom create case action with 3 steps:
	 * - CreateCaseDetailsPage (default behavior)
	 * - CreateCasePreviewPage (default behavior)
	 * - CustomCreateCaseAttachmentsPage (customized step)
	 */
	const CustomCreateCaseWizardAction = (props) => withActionView({
		...props,
		title: <CreateResourceViewTitle resourceName="Case"/>,
		refreshOnClose: true,
		pages: R.map(
			R.when(R.is(Function), R.call),
			[CreateCaseDetailsPage, CreateCasePreviewPage, CustomCreateCaseAttachmentsPage]
		),
		ViewForm: ResourceWizard
	}, () => null);

	/**
	 * Custom action mapper with added condition for Create case domain action
	 */
	const DomainActionMapper = R.curry((settings = {}, action) => {
		return R.cond([
			[D.isCreateCaseAction, R.always(CustomCreateCaseWizardAction(settings))],
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
	 * Action factory component with redefined ActionMapper
	 */
	const ActionFactory = new DefaultActionFactory(settings, DomainActionMapper);

	return (
		<FactoryContextProvider ActionFactory={ActionFactory}>
			<CasesGridViewFactory/>
		</FactoryContextProvider>
	);
};