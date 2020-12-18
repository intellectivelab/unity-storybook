import React from 'react';

import * as R from "ramda";

import {Hint, Sunburst as SunburstVis} from 'react-vis';

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import {
    DefaultComponentFactory,
    withChartConfigLoader,
    DefaultChartContainer,
    Sunburst,
    sunburstDataReducer,
    withChartSettings,
    VerticalPlotChart,
    xyPlotDataReducer
} from "@intellective/core";

import AppPage from "../../components/AppPage/AppPage";

export default {title: 'Examples/Chart Menu'};

/**
 * Add custom menu for sunburst chart
 */
export const CustomChartMenu = () => {

    const SunburstCustomRenderer = (props) => {
        const {
            preferences,
            classes,
            hovered,
            width,
            height,
            padAngle,
            applyStyles,
            valueMouseOverHandler,
            valueMouseOutHandler,
            valueClickHandler,
            hintFormatter,
            data,
        } = props;

        const _hovered = (preferences?.hovered ?? true) && hovered;
        return (
            <Grid item xs={12} className={classes.chart}>
                <Box display="flex" justifyContent="center">
                    <Box>
                        <SunburstVis
                            hideRootNode
                            colorType='literal'
                            width={width}
                            height={height}
                            padAngle={padAngle}
                            data={{children: applyStyles(data)}}
                            onValueMouseOver={valueMouseOverHandler}
                            onValueMouseOut={valueMouseOutHandler}
                            onValueClick={valueClickHandler}
                            style={{margin: '0 auto'}}
                        >
                            {_hovered && <Hint value={_hovered} format={hintFormatter}/>}
                        </SunburstVis>
                    </Box>
                </Box>
            </Grid>
        );
    };

    const withSunburstSettings = R.curry((WrappedChart, props) => {
        const sunburstSettings = [
                {name: 'hovered', label: 'Hovered'}
            ];

        const ComposedSunburst = withChartSettings(sunburstSettings)(Sunburst);

        const getChartByType = R.cond([
            [R.equals('sunburst'), R.always(R.pair(ComposedSunburst, sunburstDataReducer(null)))]
        ]);
        return <WrappedChart {...props} getChartByType={getChartByType} ChartRenderer={SunburstCustomRenderer}/>;
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

        const xyFunctor = (x, y) => ({x, y});

        const getChartByType = R.cond([
            [R.equals('vComposite'), R.always(R.pair(VerticalPlotChart, xyPlotDataReducer(xyFunctor, null)))],
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
