import React, {useMemo} from 'react';

import * as R from "ramda";

import {FactoryContextProvider} from "@intellective/core";

import {
	AnalyticsComponentFactory,
	DefaultChartContainer,
	DefaultChartFactory,
	Sunburst,
	sunburstDataReducer,
	SunburstRenderer,
	useChartComponentMapper,
	useLocalPreferences,
	VerticalPlotChart,
	withChartConfigLoader,
	withChartSettings,
	xyPlotDataReducer
} from "@intellective/analytics";

import PageContainer from "../../components/PageContainer/PageContainer";

export default {title: 'Examples/Visualization/Chart/Settings'};

const withDomainSunburstRenderer = R.curry((preferences, WrappedComponent, props) => {
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

	const CustomSunburstRenderer = withDomainSunburstRenderer(preferences, SunburstRenderer);

	return (
		<ComposedSunburst {...props}
		                  Renderer={CustomSunburstRenderer}
		                  preferences={preferences}
		                  onPreferenceChange={onPreferenceChange}
		/>
	);
});

export const UsingCustomChartSettings = () => {

	const useDomainChartMapper = R.cond([
		[R.propEq("type", "sunburst"), R.always(R.pair(withSunburstSettings(Sunburst), sunburstDataReducer(null)))],
		[R.T, useChartComponentMapper]
	]);

	const withDomainChartMapper = R.curry((WrappedComponent, props) => (
		<WrappedComponent {...props} component={useDomainChartMapper}/>
	));

	/**
	 *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
	 */
	const DomainComponentFactory = R.cond([
		[R.propEq('type', 'chart'), withDomainChartMapper(DefaultChartFactory)],
		[R.T, AnalyticsComponentFactory]
	]);

	return (
		<FactoryContextProvider ComponentFactory={DomainComponentFactory}>
			<PageContainer href="/api/config/perspectives/storybook/dashboards/sunburst_menu_page"/>
		</FactoryContextProvider>
	);
};

export const DisablingChartSettings = () => {

	const withDomainChartSettings = R.curry((WrappedChart, props) => {

		const xyFunctor = (x, y) => ({x, y});

		const useDomainChartMapper = R.cond([
			[R.propEq("type", 'vComposite'), R.always(R.pair(VerticalPlotChart, xyPlotDataReducer(xyFunctor, null)))],
			[R.T, useChartComponentMapper]
		]);

		return <WrappedChart {...props} component={useDomainChartMapper}/>;
	});

	const DomainChartFactory = (props) => {
		const {Component = DefaultChartContainer, ...otherProps} = props;

		const _Chart = R.compose(withChartConfigLoader, withDomainChartSettings)(Component);

		return (
			<_Chart {...otherProps} />
		);
	};

	/**
	 *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
	 */
	const DomainComponentFactory = R.cond([
		[R.propEq('type', 'chart'), DomainChartFactory],
		[R.T, AnalyticsComponentFactory]
	]);

	return (
		<FactoryContextProvider ComponentFactory={DomainComponentFactory}>
			<PageContainer href="/api/config/perspectives/storybook/dashboards/custom_menu_page"/>
		</FactoryContextProvider>
	);
};
