import React from 'react';

import * as R from "ramda";

import {
    DefaultComponentFactory,
    withChartConfigLoader,
    DefaultChartContainer,
} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";

export default {title: 'Examples/Chart Menu'};

/**
 * Add custom menu for sunburst chart
 */
export const CustomChartMenu = () => {

    const withSunburstSettings = R.curry((WrappedChart, props) => {
        const chartSettings = {
            sunburstSettings: [
                {name: 'hovered', label: 'Hovered'}
            ]
        };
        return <WrappedChart {...props} chartSettings={chartSettings}/>;
    });

    const CustomChartFactory = (props) => {
        const {Component = DefaultChartContainer, ...otherProps} = props;

        const Chart = R.compose(
            withChartConfigLoader,
            withSunburstSettings
        )(Component);

        return (
            <Chart {...otherProps} />
        );
    };

    const DomainComponentMapping = R.cond([
        [R.propEq('type', 'chart'), CustomChartFactory]
    ]);

    /**
     *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
     */
    const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props)

    return (
        <AppPage href="/api/1.0.0/config/perspectives/search/dashboards/sunburst_menu_page"
                 ComponentFactory={DomainComponentFactory}/>
    );
};

/**
 * Remove menu for composite chart
 */
export const RemoveCompositeChartSettingsMenu = () => {

    const withoutCompositeChartSettings = R.curry((WrappedChart, props) => {
        const chartSettings = {
            compositeChartSettings: null
        };
        return <WrappedChart {...props} chartSettings={chartSettings}/>;
    });

    const CustomChartFactory = (props) => {
        const {Component = DefaultChartContainer, ...otherProps} = props;

        const Chart = R.compose(
            withChartConfigLoader,
            withoutCompositeChartSettings
        )(Component);

        return (
            <Chart {...otherProps} />
        );
    };

    const DomainComponentMapping = R.cond([
        [R.propEq('type', 'chart'), CustomChartFactory]
    ]);

    /**
     *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
     */
    const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props)

    return (
        <AppPage href="/api/1.0.0/config/perspectives/search/dashboards/custom_menu_page"
                 ComponentFactory={DomainComponentFactory}/>
    );
};
