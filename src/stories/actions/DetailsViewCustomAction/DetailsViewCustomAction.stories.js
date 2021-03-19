import React from 'react';

import * as R from "ramda";

import {
    DefaultActionFactory,
    DefaultActionMapper,
    DefaultDomainActionModel,
    DefaultFormSubmitHandlerMapper,
    DomainActionModelCtxt,
    FactoryContextProvider,
    GridView,
    defaultActionFactoryConfig,
    parseFormData,
    resources,
    submitRequest,
    withGridViewConfig,
    withGridViewDomainActions,
} from "@intellective/core";

export default {title: 'Examples/Actions/Details View'};

const {isDocument} = resources;

const GridViewFactory = (props) => {

    const {Component = GridView, ...otherProps} = props;

    const ComposedGridView = R.compose(withGridViewConfig, withGridViewDomainActions)(Component);

    const _links = {
        config: {
            href: "/api/config/components/usersGrid"
        },
        query: {
            href: "/api/users/query",
        },
        list: {
            href: "/api/users/list",
        },
    };

    return (
        <ComposedGridView {...otherProps} _links={_links}/>
    );
};


/*
* Using details view customized actions
*/
export const UsingDetailsViewCustomActions = () => {

    /**
     * Condition to detect Verify action
     */
    const isVerifyAction = R.allPass([R.propEq('type', 'custom.verify'), isDocument]);

    /**
     * Condition to detect that Verify action should be executed only once and the form to be closed right away.
     */
    const isVerifyOneTimeAction = R.allPass([
        R.propEq('type', 'custom.verify'),
        R.propEq('name', 'verifyAndClose'),
        isDocument
    ]);

    /**
     * Custom form submit handler for Verify action. It sends form data along with records id
     */
    const VerifyFormSubmitHandler = (props) => {
        const {actionLink, data, fields = {}} = props;

        const parsedFormData = parseFormData(data, fields);

        const payload = {ids: [parsedFormData.id], formData: parsedFormData};

        return actionLink && submitRequest(actionLink, payload, 'POST');
    };

    /**
     * Customized form submit handler mapper with Verify action condition added
     */
    const DomainFormSubmitHandlerMapper = R.cond([
        [isVerifyAction, R.always(VerifyFormSubmitHandler)],
        [R.T, DefaultFormSubmitHandlerMapper]
    ]);


    /**
     * Action factory component with redefined FormSubmitHandlerMapper
     */
    const ActionFactory = new DefaultActionFactory(defaultActionFactoryConfig, DefaultActionMapper, DomainFormSubmitHandlerMapper);


    /**
     * Custom domain action model. It extends DefaultDomainActionModel with override functions for Verify action logic
     */
    function DomainActionModel() {
        DefaultDomainActionModel.call(this);

        const getActionLinkOriginal = this.getActionLink,
            isOneTimeActionOriginal = this.isOneTimeAction,
            isDisabledOriginal = this.isDisabled;

        this.getActionLink = R.curry((action, objLinks) => {
            return R.cond([
                [isVerifyAction, R.always(action.href)],
                [R.T, R.always(getActionLinkOriginal(action, objLinks))]
            ])(action);
        });

        this.isOneTimeAction = R.curry((action) => R.cond([
            [isVerifyOneTimeAction, R.always(true)],
            [R.T, isOneTimeActionOriginal]
        ])(action));

        this.isDisabled = R.curry((action, formState) => {

            const {data = {}} = formState;
            const values = R.values(data);

            const isOlder70 = R.pathSatisfies(R.lt(70), ["age", "value"], data);
            const invalid = R.reduce((acc, value) => acc || Boolean(value.invalid), false, values);
            const notUpdated = R.not(R.any(value => value.updated === true)(values));

            return R.cond([
                [isVerifyOneTimeAction, R.always(notUpdated || isOlder70 || invalid)],
                [isVerifyAction, R.always(isOlder70 || invalid)],
                [R.T, R.always(isDisabledOriginal(action, formState))]
            ])(action);
        });
    }

    return (
        <FactoryContextProvider ActionFactory={ActionFactory}>
            <DomainActionModelCtxt.Provider value={new DomainActionModel()}>
                <GridViewFactory/>
            </DomainActionModelCtxt.Provider>
        </FactoryContextProvider>
    );
};
