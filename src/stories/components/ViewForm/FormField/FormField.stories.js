import React from "react";

import * as R from "ramda";

import {FormControl, FormLabel, IconButton, InputAdornment, Tooltip} from "@material-ui/core";

import {Rating} from "@material-ui/lab";

import OpenInNewIcon from "@material-ui/icons/OpenInNew";

import {AutocompleteField, DefaultFormFieldFactory, UrlField} from "@intellective/core";

import MaskedInput from "react-text-mask";

export default {title: "Examples/Components/View Form/Fields/FormField"};

export const UsingCustomField = () => {

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

	const DomainFormFieldFactory = R.cond([
		[R.propEq("ui", "rating"), R.always(RatingField)],
		[R.T, DefaultFormFieldFactory]
	]);

	return (
		<RatingField/>
	);
}

const withOpenBrowserTabAdornment = R.curry((WrappedField, props) => {

	const {value, InputProps = {}} = props;

	const onClickHandler = () => {
		window.open(value, "_blank");
	};

	const endAdornment = value && (
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

export const UsingCustomAdornment = () => {

	const CustomUrlField = withOpenBrowserTabAdornment(UrlField);

	const DomainFormFieldFactory = R.cond([
		[R.propEq("ui", "custom_url"), R.always(CustomUrlField)],
		[R.T, DefaultFormFieldFactory]
	]);

	return (
		<CustomUrlField value="intellective.com"/>
	);
}

const withMaskedInput = R.curry((WrappedField, props) => {

	const TextMaskCustom = props => {
		const {inputRef, mask, guide = false, showMask = true, ...otherProps} = props;

		return (
			<MaskedInput {...otherProps}
			             ref={(ref) => {
				             inputRef(ref ? ref.inputElement : null);
			             }}
			             mask={mask}
			             guide={guide}
			             showMask={showMask}
			/>
		);
	};

	const {onChange, InputProps = {}, inputProps = {}} = props;

	const handleChange = (value) => {
		onChange && onChange(R.replace(/\D+/g, '', R.defaultTo('', value)));
	};

	const {mask} = props;

	return (
		<WrappedField {...props}
		              inputProps={{...inputProps, mask}}
		              InputProps={{...InputProps, inputComponent: TextMaskCustom}}
		              onChange={handleChange}
		/>
	);
});

export const UsingCustomInputMask = () => {

	const phoneMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

	const PhoneField = withMaskedInput(AutocompleteField);

	const DomainFormFieldFactory = R.cond([
		[R.propEq("ui", "phone"), R.always(PhoneField)],
		[R.T, DefaultFormFieldFactory]
	]);

	return (
		<PhoneField mask={phoneMask} value="123456789"/>
	);
};
