import React from 'react';

import * as R from "ramda";

import Page from "../../components/Page/Page";

import {CreateCaseWithAttachments, DefaultActionFactory, DefaultActionMapper, OneColumnLayout, ThreeColumnsLayout} from "@intellective/core";

import {Grid, makeStyles} from "@material-ui/core";

export default {title: 'Examples/Form Layout'};

/*
* Using Column Layout with custom configuration
*/
export const UsingDefaultLayout = () => {

	function DomainActionFactory(defaultSettings = {}) {
		DefaultActionFactory.call(this, defaultSettings);

		const DomainActionMapper = R.curry((settings = {}, action) => {

			// Add custom actions creation logic here. For example,
			const isCreateAction = R.propEq('type', 'create');
			const isCaseResource = R.propEq('resourceName', "cases");
			const isCreateCaseAction = R.allPass([isCreateAction, isCaseResource]);

			return R.cond([
				[isCreateCaseAction, R.always(CreateCaseWithAttachments({
					...settings,
					//Override default view settings
					variant: 'sidebar',
					fullScreen: false,
					Layout: OneColumnLayout
				}))],
			])(action);
		});

		this.createAction = R.curry((action, props) => {
			const {settings = {}, ...otherProps} = props;

			const {view: viewSettings = {}} = settings;

			const ActionComponent = DomainActionMapper({...defaultSettings, ...viewSettings}, action) || DefaultActionMapper({...defaultSettings, ...viewSettings}, action);

			return <ActionComponent {...otherProps} {...action} action={action}/>;
		});
	}

	const actionViewSettings = {
		variant: 'dialog',
		fullScreen: true,
		maxWidth: 'xl',
		innerMaxWidth: 'lg',
		margin: 'dense',
		Layout: ThreeColumnsLayout
	};

	return (
		<Page ActionFactory={new DomainActionFactory(actionViewSettings)}
		         href="/api/1.0.0/config/perspectives/search/dashboards/page12"/>
	);
};

/*
* Using Custom Form Layout
*/
export const UsingCustomLayout = () => {

	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
		},
		row: {
			padding: theme.spacing(2),
			borderColor: theme.palette.action.active,
			borderBottom: 'inset',

		}
	}));

	const CustomFormLayout = (props) => {

		const {children} = props;
		const classes = useStyles();

		const rows = R.splitEvery(2, React.Children.toArray(children));

		return (
			<div className={classes.root}>
				<Grid container spacing={1}>
					{rows.map((row, rowIdx) => (
						<Grid key={rowIdx}
						      className={classes.row}
						      item
						      container
						      direction="row"
						      justify="space-between"
						      alignItems="center"
						>
							{row.map((child, idx) => (
								<Grid item xs={4} key={`${rowIdx}-${idx}`}>{child}</Grid>
							))}
						</Grid>)
					)}
				</Grid>
			</div>
		);
	};

	const actionViewSettings = {
		variant: 'dialog',
		fullScreen: true,
		maxWidth: 'xl',
		innerMaxWidth: 'lg',
		margin: 'dense',
		Layout: CustomFormLayout
	};

	return <Page href="/api/1.0.0/config/perspectives/search/dashboards/page12"
	                ActionFactory={new DefaultActionFactory(actionViewSettings)}/>;
};
