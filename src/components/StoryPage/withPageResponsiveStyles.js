import React, {useMemo, useRef} from "react";

import * as R from "ramda";

import {useDimensions} from "@intellective/core";

const withPageResponsiveStyles = R.curry((WrappedComponent, props) => {

	const rootRef = useRef();

	const {offsetLeft, scrollLeft} = useDimensions(rootRef);

	const styles = ({
		maxWidth: `calc(100vw - ${offsetLeft + scrollLeft + 1}px)`,
		overflowX: 'auto',
	});

	return (
		<div ref={rootRef} style={styles}>
			{useMemo(() => <WrappedComponent {...props} />, [props])}
		</div>
	);
});

export default withPageResponsiveStyles;