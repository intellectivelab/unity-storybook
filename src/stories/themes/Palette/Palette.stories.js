import React from 'react';

import {DefaultThemeProvider, FactoryContextProvider, Palettes} from "@intellective/core";

import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

import PageContainer from "../../../components/PageContainer/PageContainer";

export default {title: 'Examples/Themes/Palette'};

/*
* default theme builder with custom palette
*/
export const UsingCustomPalette = () => {

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
        <ThemeProvider>
            <FactoryContextProvider>
                <PageContainer href="/api/config/perspectives/storybook/dashboards/page1"/>
            </FactoryContextProvider>
        </ThemeProvider>
    );
};

/*
* Default theme builder with dark palette
*/
export const UsingDarkPalette = () => {

    const ThemeProvider = (props) => <DefaultThemeProvider {...props} paletteName="neptune" paletteType="dark"/>;

    return (
        <ThemeProvider>
            <FactoryContextProvider>
                <PageContainer href="/api/config/perspectives/storybook/dashboards/page1"/>
            </FactoryContextProvider>
        </ThemeProvider>
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

const DomainThemeBuilder = (options, palette) => responsiveFontSizes(createMuiTheme(buildTheme(options, palette)));

export const UsingThemeBuilder = () => {

    const DomainThemeProvider = (props) => {
        return <DefaultThemeProvider {...props} Builder={DomainThemeBuilder}/>;
    };

    return (
        <DomainThemeProvider>
            <FactoryContextProvider>
                <PageContainer href="/api/config/perspectives/storybook/dashboards/page1"/>
            </FactoryContextProvider>
        </DomainThemeProvider>
    );
};

