import React from 'react';

import {DefaultThemeProvider, Palettes} from "@intellective/core";

import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

import Page from "../../components/Page/Page";

export default {title: 'Examples/Theme'};

/*
* default theme builder with custom palette
*/
export const UsingPalette = () => {

	const customPalette = {
		palette: {
			type: "light",
			primary: {
				main: "#607D8B",
				contrastText: "#FFFFFF",
			},
			secondary: {
				main: "#FF9800",
				contrastText: '#212121'
			},
		}
	};

	const ThemeProvider = (props) => {
		return <DefaultThemeProvider {...props} paletteName="customPalette" Palettes={{...Palettes, customPalette}}/>;
	};

	return (
		<Page ThemeProvider={ThemeProvider} href="/api/1.0.0/config/perspectives/search/dashboards/page1"/>
	);
};

/*
* Default theme builder with dark palette
*/
export const UsingDarkPalette = () => {

	const ThemeProvider = (props) => <DefaultThemeProvider {...props} paletteName="neptune" paletteType="dark"/>;

	return (
		<Page ThemeProvider={ThemeProvider} href="/api/1.0.0/config/perspectives/search/dashboards/page1"/>
	);
};

/*
* Custom theme builder
*/
const buildTheme = (options, palette = Palettes.unity.palette) => ({
	typography: {
		fontSize: 12,
		body1: {
			fontSize: "12px"
		}
	},
	overrides: {
		MuiTableCell: {
			head: {
				fontSize: "11px",
			},
			root: {
				fontSize: "12px",
				whiteSpace: "pre-wrap",
			}
		}
		//put other stuff to override here
	},
	options,
	palette,
});

const CustomThemeBuilder = (options, palette) => responsiveFontSizes(createMuiTheme(buildTheme(options, palette)));

export const UsingThemeBuilder = () => {

	const ThemeProvider = (props) => {
		return <DefaultThemeProvider {...props} Builder={CustomThemeBuilder}/>;
	};

	return (
		<Page ThemeProvider={ThemeProvider} href="/api/1.0.0/config/perspectives/search/dashboards/page1"/>
	);
};

