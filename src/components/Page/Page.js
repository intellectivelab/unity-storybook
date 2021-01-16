import React from 'react';

import {HashRouter as Router} from "react-router-dom";

import {DefaultThemeProvider, FactoryContextProvider} from '@intellective/core';

import PageContainer from "../PageContainer/PageContainer";

export default (props) => {
	const {href, ThemeProvider = DefaultThemeProvider, ...otherProps} = props;

	return (
		<ThemeProvider>
			<FactoryContextProvider {...otherProps}>
				<Router>
					<PageContainer href={href}/>
				</Router>
			</FactoryContextProvider>
		</ThemeProvider>
	);
};
