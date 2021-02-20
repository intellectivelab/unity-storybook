import React from 'react';

import {addDecorator, addParameters} from '@storybook/react';
import {themes} from '@storybook/theming';

import Container from "./Container";

import PackageInfo from './../package.json';

addParameters({
	options: {
		theme: {
			...themes.light,
			brandTitle: `Unity Storybook v${PackageInfo.version}`
		},
	},
});

addDecorator((story) => <Container story={story}/>);