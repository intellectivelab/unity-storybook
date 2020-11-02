import React from "react";

import * as R from "ramda";

import {useSelector} from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import AppPage from "../../components/AppPage/AppPage";

import {DefaultFormFieldFactory, UrlField} from "@intellective/core";

export default {title: "Examples/Form Field"};

const withCustomFieldAdornment = R.curry((formId, WrappedField, props) => {

    const {id, value: url, InputProps = {}} = props;

    const formSelector = useSelector(({forms}) => (forms[formId]));

    const formState = (formSelector && formSelector.data) || {};

    const invalid = R.defaultTo(false)(R.path([id, "invalid"], formState));

    const onClickHandler = () => {
        window.open(url, "_blank");
    };

    const endAdornment = url && !invalid && (
        <InputAdornment position="end">
            <Tooltip title="Open in a new browser tab" role="tooltip">
                <IconButton size="small"
                            role="button"
                            aria-label="Open"
                            onClick={onClickHandler}>
                    <OpenInNewIcon/>
                </IconButton>
            </Tooltip>
        </InputAdornment>
    );

    return <WrappedField {...props} InputProps={{...InputProps, endAdornment}}/>;
});

const UsersUrlFieldFactory = (props) => {
    const {formId} = props;

    return withCustomFieldAdornment(formId, UrlField);
};

const DomainFieldMapper = R.cond([
    [R.propEq("ui", "usersUrl"), UsersUrlFieldFactory],
]);

const DomainFormFieldFactory = (props) => DomainFieldMapper(props) || DefaultFormFieldFactory(props);

export const UsingFormFieldAdornment = () => {
    return <AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page12"
                    FormFieldFactory={DomainFormFieldFactory}/>;
}