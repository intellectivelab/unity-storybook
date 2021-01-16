import React from 'react';

import {DefaultPageBuilder, resolveBuilder, useConfigLoader} from "@intellective/core"

const PageContainer = props => {
	const {href, ...otherProps} = props;

	const {status, data: config = {}} = useConfigLoader(href);

	if (status === "loading") {
		return null;
	}

	const PageBuilder = resolveBuilder(config.builder, DefaultPageBuilder);

	return PageBuilder && <PageBuilder {...otherProps} {...config}/>;
};

export default PageContainer;