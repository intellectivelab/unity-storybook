import React from 'react';

import {DefaultThemeProvider, FactoryContextProvider} from '@intellective/core';

import PageContainer from "./PageContainer";

export default (props) => {
	const {href, ...otherProps} = props;

	return (
		<DefaultThemeProvider paletteName="connecticut">
			<FactoryContextProvider {...otherProps}>
				<PageContainer href={href}/>
			</FactoryContextProvider>
		</DefaultThemeProvider>
	);
};
