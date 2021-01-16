import React from "react";

import * as R from "ramda";

import {useSelector} from "react-redux";

import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Rating from "@material-ui/lab/Rating";
import Tooltip from "@material-ui/core/Tooltip";

import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import {AutocompleteField, DefaultFormFieldFactory, UrlField} from "@intellective/core";

import Page from "../../components/Page/Page";
import MaskedInput from "react-text-mask/dist/reactTextMask";

export default {title: "Examples/Form Field"};

export const UsingRatingField = () => {

    /*
     * Rating Form Field
    */
    const RatingField = props => {

        const {id, label, margin = "dense", value, onChange} = props;

        const handleChange = (event, newValue) => {
            onChange && onChange(newValue);
        };

        return (
            <FormControl margin={margin} fullWidth component="div">
                <FormLabel component="label">{label}</FormLabel>

                <Rating name={id} value={value} onChange={handleChange}/>
            </FormControl>
        );
    };

    const DomainFormFieldFactory = (props) => R.ifElse(
        R.propEq("ui", "rating"),
        R.always(RatingField),
        DefaultFormFieldFactory
    )(props);

    return <Page href="/api/1.0.0/config/perspectives/search/dashboards/page12"
                    FormFieldFactory={DomainFormFieldFactory}/>;
}

const withOpenBrowserTabAdornment = R.curry((formId, WrappedField, props) => {

    const {id, value: url, InputProps = {}} = props;

    const formState = useSelector(R.pathOr({}, ["forms", formId, "data"]));

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

export const UsingFieldAdornment = () => {

    const UsersUrlFieldFactory = (props) => {
        const {formId} = props;

        return withOpenBrowserTabAdornment(formId, UrlField);
    };

    const DomainFieldMapper = R.cond([
        [R.propEq("ui", "usersUrl"), UsersUrlFieldFactory],
    ]);

    const DomainFormFieldFactory = (props) => DomainFieldMapper(props) || DefaultFormFieldFactory(props);

    return <Page href="/api/1.0.0/config/perspectives/search/dashboards/page12"
                    FormFieldFactory={DomainFormFieldFactory}/>;
}

const TextMaskCustom = props => {
    const {inputRef, mask, guide = false, showMask = true, ...other} = props;

    return <MaskedInput
        {...other}
        ref={(ref) => {
            inputRef(ref ? ref.inputElement : null);
        }}
        mask={mask}
        guide={guide}
        showMask={showMask}
    />;
};

const withMaskedInput = R.curry((mask, WrappedField, props) => {

    const {onChange, InputProps = {}, inputProps = {}} = props;

    const handleChange = (value) => {
        onChange && onChange(R.replace(/\D+/g, '', R.defaultTo('', value)));
    };

    return <WrappedField {...props}
                         InputProps={{...InputProps, inputComponent: TextMaskCustom}}
                         onChange={handleChange}
                         inputProps={{...inputProps, mask: mask}}/>;
});

export const UsingPhoneField = () => {

    const phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    const PhoneFieldFactory = () => withMaskedInput(phoneMask, AutocompleteField);

    const DomainFieldMapper = R.cond([
        [R.propEq("ui", "phone"), PhoneFieldFactory],
    ]);

    const DomainFormFieldFactory = (props) => DomainFieldMapper(props) || DefaultFormFieldFactory(props);

    return <Page href="/api/1.0.0/config/perspectives/search/dashboards/page12"
                    FormFieldFactory={DomainFormFieldFactory}/>;
};
