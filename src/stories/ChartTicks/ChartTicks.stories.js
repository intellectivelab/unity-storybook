import React from 'react';

import * as R from "ramda";

import {
    DefaultComponentFactory,
} from "@intellective/core";

import DefaultChartContainer from '@intellective/core/build/containers/DefaultChartContainer/DefaultChartContainer'
import withChartConfigLoader from '@intellective/core/build/containers/DefaultChartContainer/withChartConfigLoader'

import AppPage from "../../components/AppPage/AppPage";
import Tooltip from "@material-ui/core/Tooltip";

export default {title: 'Examples/Chart Ticks'};

export const ChartTickFormat = () => {

    const withCheckerboardTickFormat = R.curry((WrappedChart, props) => {

        const scaledTickFormat = scaleRate => v => (v * scaleRate).toFixed();

        const checkerBoardFormat = R.curry((formatValue, value, index) => {
            const formattedValue = formatValue(0, value);

            const odd = index % 2 !== 0;

            return <>
                {odd && <line x1="0" x2="0" y1="-6" y2="30" className="rv-xy-plot__axis__tick__line"/>}
                <text className='rv-xy-plot__axis__tick__text' transform="translate(0, 14)" textAnchor="middle"
                      dy='0.72em'>
                    <tspan y={odd ? '25' : '0'}>{formattedValue}</tspan>
                </text>
            </>;

        });

        const tickFormat = formatValue => ({
            mainAxisTickFormatHandler: checkerBoardFormat(formatValue),
            scaleTicksHandler: scaledTickFormat
        });

        return <WrappedChart {...props} chartTickFormat={tickFormat}/>;
    });

    const withTooltipTickFormat = R.curry((WrappedChart, props) => {

        const scaledTickFormat = scaleRate => v => (v * scaleRate).toFixed();

        const tooltipFormat = R.curry((length, formatValue, value) => {
            const formattedValue = formatValue(0, value);

            return formattedValue.length > length ?
                <Tooltip title={formattedValue} aria-label={formattedValue} placement='right'>
                    <text textAnchor="end" dy="0.32em" transform="translate(-14, 0)"
                          className="rv-xy-plot__axis__tick__text">
                        <tspan>
                            {formattedValue.substring(0, length)}...
                        </tspan>
                    </text>
                </Tooltip> : formattedValue;

        });

        const tickFormat = formatValue => ({
            mainAxisTickFormatHandler: tooltipFormat(6)(formatValue),
            scaleTicksHandler: scaledTickFormat
        });

        return <WrappedChart {...props} chartTickFormat={tickFormat}/>;
    });

    const checkPropType = R.curry((typeDeclared, Result, WrappedChart, props) =>
        R.propEq('type', typeDeclared)(props) ? Result(WrappedChart, props) : <WrappedChart {...props}/>
    );

    const CustomChartFactory = (props) => {
        const {Component = DefaultChartContainer, ...otherProps} = props;

        const Chart = R.compose(
            withChartConfigLoader,
            checkPropType('vComposite')(withCheckerboardTickFormat),
            checkPropType('hComposite')(withTooltipTickFormat)
        )(Component);

        return (
            <Chart {...otherProps} />
        );
    };

    const DomainComponentMapping = R.cond([
        [R.propEq('type', 'chart'), CustomChartFactory]
    ]);

    const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props)

    return (
        <AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page6"
                 ComponentFactory={DomainComponentFactory}/>
    );
};
