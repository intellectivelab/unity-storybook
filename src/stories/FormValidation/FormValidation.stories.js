import React, {useEffect, useState} from 'react';

import * as R from "ramda";

import {useDispatch, useSelector} from "react-redux";

import Alert from "@material-ui/lab/Alert";
import CreateIcon from "@material-ui/icons/Create";
import Typography from "@material-ui/core/Typography";

import Page from "../../components/Page/Page";

import {
    CreateCaseAttachmentsPage,
    CreateCasePreviewPage,
    CreateCaseWithAttachments,
    CreateResourceViewTitle,
    DefaultActionFactory,
    DefaultActionMapper,
    DefaultCaseSubmitHandler,
    DefaultFormSubmitHandlerMapper,
    DefaultViewForm,
    forms,
    FormSubmitAction,
    ResourceViewAction,
    ResourceWizard,
    TwoColumnsLayout,
    useDefaultFormFieldValidation,
    withActionView,
    withResourceDataLoader
} from "@intellective/core";

export default {title: 'Examples/Form Validation'};

const defaultConfig = {
    variant: 'dialog',
    fullScreen: true,
    maxWidth: 'xl',
    innerMaxWidth: 'lg',
    margin: 'dense',
    Layout: TwoColumnsLayout
};


const CreateCaseViewForm = R.compose(withResourceDataLoader)(DefaultViewForm);


/*
* Add custom form field validator
*/
export const UsingFormFieldValidation = () => {

    const useNoValidation = () => ({error: false});

    const useAsyncTaskIdValidator = ({value}) => {

        const [validationResult, updateValidationResult] = useState({error: false});

        useEffect(() => {
            updateValidationResult((state) => ({...state, validating: true}));

            setTimeout(() => {
                updateValidationResult({
                    error: !R.equals(Number(value), 0),
                    errorText: "TaskId should be equal to zero",
                    validating: false
                });
            }, 2000);

        }, [value]);

        return validationResult;
    };

    const domainFieldValidators = R.cond([
        [R.propEq("id", "task_id"), useAsyncTaskIdValidator],
        [R.propEq("id", "case_status"), useNoValidation],
        [R.T, useDefaultFormFieldValidation],
    ]);

    const withCustomFieldValidation = R.curry((WrappedComponent, props) =>
        <WrappedComponent {...props} useFieldValidation={domainFieldValidators}/>
    );

    const DomainCreateCaseAction = R.compose(withCustomFieldValidation, CreateCaseWithAttachments);
    const DomainViewCaseAction = R.compose(withCustomFieldValidation, ResourceViewAction);


    function DomainActionFactory(config = defaultConfig) {
        DefaultActionFactory.call(this, config);

        const DomainActionMapper = R.curry((settings = {}, action) => {
            // Add custom actions creation logic here. For example,

            const isCreateAction = R.propEq('type', 'create');
            const isViewAction = R.propEq('type', 'view');
            const isCaseResource = R.propEq('resourceName', "cases");
            const isCreateCaseAction = R.allPass([isCreateAction, isCaseResource]);
            const isViewCaseAction = R.allPass([isViewAction, isCaseResource]);

            return R.cond([
                [isCreateCaseAction, R.always(DomainCreateCaseAction(settings))],
                [isViewAction, R.always(DomainViewCaseAction(settings))],
            ])(action);
        });

        this.createAction = R.curry((action, props) => {
            const {settings = {}, ...otherProps} = props;

            const {view: viewSettings = {}} = settings;

            const ActionComponent = DomainActionMapper({...defaultConfig, ...viewSettings}, action) ||
                DefaultActionMapper({...defaultConfig, ...viewSettings}, action);

            return <ActionComponent {...otherProps} {...action} action={action}/>;
        });
    }

    return (
        <Page href="/api/1.0.0/config/perspectives/search/dashboards/page12" ActionFactory={new DomainActionFactory()}/>
    );
};

/*
* Inject custom form submit handler logic
*/
export const UsingFormSubmitHandler = () => {

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

    function DomainActionFactory(config = defaultConfig) {
        DefaultActionFactory.call(this, config);

        const DomainFormSubmitHandlerMapper = R.cond([
            [isCreateCaseAction, R.always(DomainCreateCaseSubmitHandler)],
        ]);

        this.getFormSubmitHandler = (props) => DomainFormSubmitHandlerMapper(props) || DefaultFormSubmitHandlerMapper(props);
    }

    return (
        <Page href="/api/1.0.0/config/perspectives/search/dashboards/page12" ActionFactory={new DomainActionFactory()}/>
    );
};

/*
 * Custom Form Validation Status
*/
export const UsingFormValidation = () => {

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

    const DomainCreateCasePropertiesPage = {
        label: 'Fill in details',
        icon: CreateIcon,
        view: withDomainFormValidationStatus(CreateCaseViewForm),
        actions: [
            <FormSubmitAction key="create-case-submit-action" label="Create"/>
        ]
    };

    const DomainCreateCaseAction = (props) => withActionView({
        ...props,
        title: <CreateResourceViewTitle resourceName="Case"/>,
        ViewForm: ResourceWizard,
        pages: [DomainCreateCasePropertiesPage, CreateCasePreviewPage, CreateCaseAttachmentsPage],
        submitLabel: 'Create Case'
    }, () => null);

    function DomainActionFactory(config = defaultConfig) {
        DefaultActionFactory.call(this, config);

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

            const ActionComponent = DomainActionMapper({...defaultConfig, ...viewSettings}, action) || DefaultActionMapper({...defaultConfig, ...viewSettings}, action);

            return <ActionComponent {...otherProps} {...action} action={action}/>;
        });
    }

    return (
        <Page href="/api/1.0.0/config/perspectives/search/dashboards/page12" ActionFactory={new DomainActionFactory()}/>
    );
};
