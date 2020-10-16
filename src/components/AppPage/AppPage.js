import React from 'react';

import {DefaultThemeProvider, FactoryContextProvider} from '@intellective/core';
import {HashRouter as Router} from "react-router-dom";

import PageContainer from "./PageContainer";

export default (props) => {
	const {href, ...otherProps} = props;

	return (
		<DefaultThemeProvider paletteName="charcoal">
			<FactoryContextProvider {...otherProps}>
				<Router>
					<PageContainer href={href}/>
				</Router>
			</FactoryContextProvider>
		</DefaultThemeProvider>
	);
};
