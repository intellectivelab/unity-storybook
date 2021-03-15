import React from 'react';

import {DefaultThemeProvider, FactoryContextProvider, Palettes} from "@intellective/core";

import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

import PageContainer from "../../../components/PageContainer/PageContainer";

export default {title: 'Examples/Themes/Builder'};

/*
* Custom theme builder
*/
export const UsingThemeBuilder = () => {

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

