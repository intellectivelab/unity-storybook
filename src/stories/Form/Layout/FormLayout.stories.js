import React from 'react';

import * as R from "ramda";

import {Grid, makeStyles} from "@material-ui/core";

import {DefaultActionFactory, FactoryContextProvider, GridView, withGridViewConfig, withGridViewDomainActions} from "@intellective/core";

export default {title: 'Examples/Form/Layout'};

const DefaultGridViewFactory = (props) => {

	const {Component = GridView, ...otherProps} = props;

	const ComposedGridView = R.compose(withGridViewConfig, withGridViewDomainActions)(Component);

	const _links = {
		config: {
			href: "/api/config/components/usersGrid"
		},
		query: {
			href: "/api/users/query",
		},
		list: {
			href: "/api/users/list",
		},
	};

	return (
		<ComposedGridView {...otherProps} _links={_links}/>
	);
};

/*
* Using Custom Form Layout
*/
export const UsingCustomLayout = () => {

	const useStyles = makeStyles((theme) => ({
		root: {
			//
		},
		row: {
			borderColor: theme.palette.action.active,
			borderBottom: 'inset',
			margin: theme.spacing(2),

		}
	}));

	const CustomFormLayout = (props) => {

		const {children} = props;

		const classes = useStyles();

		const rows = R.splitEvery(4, React.Children.toArray(children));

		return (
			<div className={classes.root}>
				<Grid container spacing={4}>
					{rows.map((row, rowIdx) => (
						<Grid key={rowIdx}
						      className={classes.row}
						      container
						      item
						      direction="column"
						>
							{row.map((child, idx) => (
								<Grid item key={`${rowIdx}-${idx}`}>{child}</Grid>
							))}
						</Grid>)
					)}
				</Grid>
			</div>
		);
	};

	const settings = {
		margin: 'dense',
		variant: 'dialog',
		Layout: CustomFormLayout
	};

	return (
		<FactoryContextProvider ActionFactory={new DefaultActionFactory(settings)}>
			<DefaultGridViewFactory/>
		</FactoryContextProvider>
	);
};
