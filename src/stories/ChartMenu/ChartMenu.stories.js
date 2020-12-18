import React, {useMemo} from 'react';

import * as R from "ramda";

import {
    DefaultComponentFactory,
    withChartConfigLoader,
    DefaultChartContainer,
    DefaultSunburstRenderer,
    sunburstDataReducer,
    withChartSettings,
    useLocalPreferences,
    VerticalPlotChart,
    xyPlotDataReducer,
    DefaultChartFactory,
    getDefaultChartByType,
    Sunburst
} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";

export default {title: 'Examples/Chart Menu'};

/**
 * Add custom menu for sunburst chart
 */

const withCustomSunburstRenderer = R.curry((preferences, WrappedComponent, props) => {
    const {hovered} = props;
    const {hovered: prefHovered} = preferences || {};
    return <WrappedComponent {...props} hovered={(prefHovered ?? true) && hovered}/>;
});

const withSunburstSettings = R.curry((WrappedChart, props) => {

    const {id} = props;

    const sunburstSettings = [
        {name: 'hovered', label: 'Hovered'}
    ];

    const {preferences, onPreferenceChange} = useLocalPreferences(id);

    const ComposedSunburst = useMemo(() => withChartSettings(sunburstSettings)(WrappedChart), []);

    const CustomSunburstRenderer = withCustomSunburstRenderer(preferences, DefaultSunburstRenderer);

    return <ComposedSunburst {...props} preferences={preferences} onPreferenceChange={onPreferenceChange}
                             ChartRenderer={CustomSunburstRenderer}/>;
});

export const CustomChartMenu = () => {

        const getChartByType = R.cond([
            [R.equals('sunburst'), R.always(R.pair(withSunburstSettings(Sunburst), sunburstDataReducer(null)))],
            [R.T, getDefaultChartByType]
        ]);


        const withDomainChart = R.curry((WrappedChartFactory, props) => {
            return (
                <WrappedChartFactory {...props} getChartByType={getChartByType}/>
            );
        });

        const DomainComponentMapping = R.cond([
            [R.propEq('type', 'chart'), withDomainChart(DefaultChartFactory)]
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

        const xyFunctor = (x, y) => ({x, y});

        const getChartByType = R.cond([
            [R.equals('vComposite'), R.always(R.pair(VerticalPlotChart, xyPlotDataReducer(xyFunctor, null)))],
            [R.T, getDefaultChartByType]
        ]);
        return <WrappedChart {...props} getChartByType={getChartByType}/>;
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
