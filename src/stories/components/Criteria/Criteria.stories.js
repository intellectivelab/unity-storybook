import React from "react";

import {useDispatch} from "react-redux";

import * as R from "ramda";

import {
    FactoryContextProvider,
    DefaultComponentFactory,
    Criteria,
    withCriteriaConfigLoader,
    withCriteriaDefaultValues,
    CriteriaPrimaryToolbar,
    criteria,
    IconButton,
    AriaHidden
} from "@intellective/core";

import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip";

import PageContainer from "../../../components/PageContainer/PageContainer";

export default {title: 'Examples/Components/Criteria'};

/*
 * Adds default criteria toolbar with custom reset action
 */

const withCustomCriteriaToolbar = R.curry((WrappedCriteria, props) => {

    const {id, PrimaryToolbar = CriteriaPrimaryToolbar} = props;

    const dispatch = useDispatch();

    /*
     * Create Action component and pass it to actions list
     */

    const onClickHandler = () => dispatch(criteria.resetFilters());

    const FlushAction = () => <IconButton role="button" size="medium" onClick={onClickHandler}>
        <AriaHidden>Reset</AriaHidden>
        <Tooltip edge="start" title='Reset filters' role="tooltip">
            <DeleteIcon fontSize='medium' color='primary' key={`${id}-criteria-flush`}/>
        </Tooltip>
    </IconButton>;

    const actions = [
        <FlushAction/>
    ];

    /*
     * Pass actions list into default PrimaryToolbar implementation
     */

    return (
        <>
            <PrimaryToolbar {...props} actions={actions}/>

            <WrappedCriteria {...props}/>
        </>
    );

});

/*
* Using custom reset Criteria action
*/

export const UsingCustomCriteriaAction = () => {

    /*
     * Use custom factory to provide
     * flexible component customization
     */

    const CustomCriteriaFactory = props => {

        const {Component = Criteria, children, ...otherProps} = props;

        const ComposedCriteria = R.compose(
            withCriteriaConfigLoader,
            withCriteriaDefaultValues,
            withCustomCriteriaToolbar
        )(Component);

        return (
            <ComposedCriteria {...otherProps}>
                {children}
            </ComposedCriteria>
        );
    };

    const DomainComponentFactory = R.cond([
        [R.propEq('type', 'criteria'), CustomCriteriaFactory],
        [R.T, DefaultComponentFactory]
    ]);

    return (
        <FactoryContextProvider ComponentFactory={DomainComponentFactory}>
            <PageContainer href="/api/config/perspectives/storybook/dashboards/folderTreeView"/>
        </FactoryContextProvider>
    );
};