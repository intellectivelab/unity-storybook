import React from 'react';

import * as R from "ramda";

import Tooltip from "@material-ui/core/Tooltip";

import {FactoryContextProvider} from "@intellective/core";

import {AnalyticsComponentFactory, DefaultChartContainer, withChartConfigLoader} from "@intellective/analytics";

import PageContainer from "../../../components/PageContainer/PageContainer";

export default {title: 'Examples/Visualization/Chart/Ticks'};

/*
* Improve default charts with custom tickFormat
*/
export const UsingTickFormat = () => {

	/**
	 * Custom formatter for x-axis for ticks to become in checkerboard order
	 */

	const withCheckerboardTickFormat = R.curry((WrappedChart, props) => {

		const scaledTickFormat = scaleRate => v => (v * scaleRate).toFixed();

		const checkerBoardFormat = R.curry((formatter, value, index) => {
			const formattedValue = formatter(0, value);

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

		return <WrappedChart {...props} tickFormat={tickFormat}/>;
	});

	/**
	 * Custom formatter for y-axis to display tooltip with additional info on hover
	 */

	const withTooltipTickFormat = R.curry((WrappedChart, props) => {

		const scaledTickFormat = scaleRate => v => (v * scaleRate).toFixed();

		const tooltipFormat = R.curry((length, formatValue, value) => {
			const formattedValue = formatValue(0, value);

			return formattedValue.length > length ?
				<Tooltip title={formattedValue} aria-label={formattedValue} placement='right'>
					<text textAnchor="end" dy="0.32em" transform="translate(-14, 0)"
					      className="rv-xy-plot__axis__tick__text"
					>
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

		return <WrappedChart {...props} tickFormat={tickFormat}/>;
	});

	/**
	 * Custom Chart factory with the custom formats
	 */

	const CustomChartFactory = (props) => {
		const {Component = DefaultChartContainer, ...otherProps} = props;

		/**
		 * Chart type check function to use format with charts with certain type
		 */

		const checkPropType = R.curry((typeDeclared, Result, WrappedChart, props) =>
			R.propEq('type', typeDeclared)(props)
				? Result(WrappedChart, props)
				: <WrappedChart {...props}/>
		);

		const _Chart = R.compose(
			withChartConfigLoader,
			checkPropType('vComposite')(withCheckerboardTickFormat),
			checkPropType('hComposite')(withTooltipTickFormat)
		)(Component);

		return (
			<_Chart {...otherProps} />
		);
	};

	/**
	 *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
	 */
	const DomainComponentFactory = R.cond([
		[R.propEq('type', 'chart'), CustomChartFactory],
		[R.T, AnalyticsComponentFactory]
	]);

	return (
		<FactoryContextProvider ComponentFactory={DomainComponentFactory}>
			<PageContainer href="/api/config/perspectives/storybook/dashboards/ticks_page"/>
		</FactoryContextProvider>
	);
};

