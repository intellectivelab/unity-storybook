import React from 'react';

import {DefaultThemeProvider, Palettes} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

export default {title: 'Examples/Theme'};

/*
* default theme builder with neptune palette
*/

export const UsingNeptuneDarkPalette = () => {

    const ThemeProvider = (props) => <DefaultThemeProvider {...props} paletteName="neptune" paletteType="dark"/>;

    return (
        <AppPage ThemeProvider={ThemeProvider} href="/api/1.0.0/config/perspectives/search/dashboards/page1"/>
    );
};

/*
* default theme builder with custom palette
*/

const customPalette = {
    displayName: "blue-grey/orange",
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
export const UsingCustomPalette = () => {

    const ThemeProvider = (props) => {
        return <DefaultThemeProvider {...props} paletteName="customPalette" Palettes={{...Palettes, customPalette}}/>;
    };

    return (
        <AppPage ThemeProvider={ThemeProvider} href="/api/1.0.0/config/perspectives/search/dashboards/page1"/>
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

export const UsingCustomThemeBuilder = () => {

    const ThemeProvider = (props) => {
        return <DefaultThemeProvider {...props} Builder={CustomThemeBuilder}/>;
    };

    return (
        <AppPage ThemeProvider={ThemeProvider} href="/api/1.0.0/config/perspectives/search/dashboards/page1"/>
    );
};

