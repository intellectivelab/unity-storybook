import React, {useContext} from 'react';

import {useSelector, useDispatch} from "react-redux";

import * as R from "ramda";

import AttachFileIcon from "@material-ui/icons/AttachFile";

import {
    AttachDocumentAction,
    CreateCaseDetailsPage,
    CreateCasePreviewPage,
    CreateResourceViewTitle,
    CurrentActionCtxt as CurrentAction,
	Dashboard,
	DomainActionModelCtxt,
    DefaultActionFactory,
    DefaultActionMapper,
    FactoryContextProvider,
	forms,
    GridView,
    parseFormData,
    resources as D,
    ResourceViewSkeleton,
    ResourceWizard,
    SearchTemplate,
    TabList,
    TwoColumnsLayout,
    useResourceViewLoader,
    withActionView,
    withGridViewConfig,
    withGridViewDomainActions,
    withResourceViewTabTemplates
} from "@intellective/core";

export default {title: 'Examples/Actions/Attach Custom'};

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
 
	const {name: formId, onDataLoad = R.identity} = props;
  
	const dispatch = useDispatch();
  
	const currentActionContext = useContext(CurrentAction); // current action is attach new document to the case
	console.log("currentActionContext, ",currentActionContext);
	const parentAction = currentActionContext.parentAction; // view case action with the case data in selected property
	const value = R.path(["selected", "id"], parentAction); //take value of id field as an example

	const fieldId = "fullName";
  
	const onDataLoadHandler = (data) => {
	   value && dispatch(forms.updateFieldState(formId, fieldId, {value, invalid: false, errorText: undefined}));
	   return onDataLoad(data);
	};
  
	return <WrappedAction {...props} onDataLoad={onDataLoadHandler}/>;
 });


/*
* Using customized create action
*/
export const UsingAttachDocumentAction = () => {
	/**
	 * Customized View for Attachments step
	 */
	const CaseAttachmentsTemplates = withResourceViewTabTemplates(SearchTemplate);

	const CaseAttachmentsView = (props) => {
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

		const tabRenderer = (tab) => <CaseAttachmentsTemplates formId={formId} tab={tab} scrollableRef={scrollableRef} onError={onError}/>;

		const {tabs = []} = view;

		const attachmentsTabs = tabs.filter(tab => tab.type === 'Attachments');

		return (
			<CurrentAction.Provider value={{...currentAction, selected: {...payload, _links}}}>
				{attachmentsTabs.length > 1
					? <TabList components={attachmentsTabs} renderer={tabRenderer} scrollableRef={scrollableRef}/>
					: tabRenderer(attachmentsTabs[0])}
			</CurrentAction.Provider>
		);
	};

	/**
	 * Customized page for Attach documents step
	 */
	const CreateCaseAttachmentsPage = {
		label: 'Attachments',
		icon: AttachFileIcon,
		view: CaseAttachmentsView,
		actions: [
			{type: 'back'},
			{type: 'complete', color: 'secondary', variant: 'contained'},
		]
	};

	/**
	 * Custom create case action with 3 steps:
	 * - CreateCaseDetailsPage (default behavior)
	 * - CreateCasePreviewPage (default behavior)
	 * - CreateCaseAttachmentsPage (custom view)
	 */
	const DomainCreateCaseAction = (props) => withActionView({
		...props,
		title: <CreateResourceViewTitle resourceName="Case"/>,
		refreshOnClose: true,
		pages: R.map(R.when(R.is(Function), R.call), [CreateCaseDetailsPage, CreateCasePreviewPage, CreateCaseAttachmentsPage]),
		ViewForm: ResourceWizard
	}, () => null);


	/**
	 * Uses predefined case subfolder context. Here it is hardcoded, but can be fetched in the real world scenario
	 * @param props
	 */
	const useCaseFolderCtxt = (props) => {
		// fetch context of the case from the server for example by using /1.0.0/cases/{caseType}/{caseId}/folders API
		// here it's hardcoded
		const dummyName = "Sub Folder 1", dummyPath = ["subfolder1"];
		const dummyFolderCtxDto = {
			CaseSubFolderPath: "/subfolder1",
			CaseSubFolderFullPath: "/ICM/cases/case/subfolder1",
			CaseSubFolderId: "123"
		};

		return {name: dummyName, value: dummyFolderCtxDto, path: dummyPath};
	};

	/**
	 * Custom action mapper with added condition for Create case domain action
	 */
	const DomainActionMapper = R.curry((settings = {}, action) => {
		return R.cond([
			[D.isCreateCaseAction, R.always(DomainCreateCaseAction(settings))],
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
