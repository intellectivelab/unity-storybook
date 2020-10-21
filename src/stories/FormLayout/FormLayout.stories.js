import React from 'react';

import * as R from "ramda";

import AppPage from "../../components/AppPage/AppPage";

import {
    CreateCaseWithAttachments,
    DefaultActionFactory,
    DefaultActionMapper,
    OneColumnLayout,
    ThreeColumnsLayout
} from "@intellective/core";

export default {title: 'Examples/Form Layout'};

const customConfig = {
    variant: 'dialog',
    fullScreen: true,
    maxWidth: 'xl',
    innerMaxWidth: 'lg',
    margin: 'dense',
    Layout: ThreeColumnsLayout
};

/*
* Using Default Column Layout with custom configuration
*/
export const UsingDefaultColumnLayout = () => {

    function DomainActionFactory(defaultSettings = {}) {
        DefaultActionFactory.call(this, defaultSettings);

        const DomainActionMapper = R.curry((settings = {}, action) => {

            // Add custom actions creation logic here. For example,
            const isCreateAction = R.propEq('type', 'create');
            const isCaseResource = R.propEq('resourceName', "cases");
            const isCreateCaseAction = R.allPass([isCreateAction, isCaseResource]);

            return R.cond([
                [isCreateCaseAction, R.always(CreateCaseWithAttachments({
                    ...settings,
                    //Using custom configuration settings
                    variant: 'sidebar',
                    fullScreen: false,
                    Layout: OneColumnLayout
                }))],
            ])(action);
        });

        this.createAction = R.curry((action, props) => {
            const {settings = {}, ...otherProps} = props;

            const {view: viewSettings = {}} = settings;

            const ActionComponent = DomainActionMapper({...defaultSettings, ...viewSettings}, action) || DefaultActionMapper({...defaultSettings, ...viewSettings}, action);

            return <ActionComponent {...otherProps} {...action} action={action}/>;
        });
    }

    return <AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page12"
                    ActionFactory={new DomainActionFactory(customConfig)}/>;
};

