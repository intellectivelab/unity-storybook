import React from 'react';

import * as R from "ramda";

import AppPage from "../../components/AppPage/AppPage";

import {
    CreateCaseWithAttachments,
    DefaultActionFactory,
    DefaultActionMapper,
    OneColumnLayout,
    ThreeColumnsLayout
} from "@intellective/core";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";

export default {title: 'Examples/Form Layout'};

/*
* Using Default Column Layout with custom configuration
*/
export const UsingDefaultColumnLayout = () => {

    const customConfig = {
        variant: 'dialog',
        fullScreen: true,
        maxWidth: 'xl',
        innerMaxWidth: 'lg',
        margin: 'dense',
        Layout: ThreeColumnsLayout
    };

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
                    //Using custom configuration settings
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

    return <AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page12"
                    ActionFactory={new DomainActionFactory(customConfig)}/>;
};

/*
* Using Custom Form Layout
*/
export const UsingCustomFormLayout = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 1000,
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
                <Paper className={classes.paper}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Typography variant="h2" gutterBottom>Custom Form Layout</Typography>
                        </Grid>
                        <Grid item xs={12} sm container>
                            {rows.map((row, rowIdx) => (<Grid className={classes.row}
                                                             container
                                                             direction="row"
                                                             justify="space-between"
                                                             alignItems="center"
                                                             key={rowIdx}>
                                    {row.map((child, idx) => (
                                        <Grid item xs={4} key={`${rowIdx}-${idx}`}>{child}</Grid>))}
                                </Grid>)
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    };
    const customConfig = {
        variant: 'dialog',
        fullScreen: true,
        maxWidth: 'xl',
        innerMaxWidth: 'lg',
        margin: 'dense',
        Layout: CustomFormLayout
    };

    return <AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page12"
                    ActionFactory={new DefaultActionFactory(customConfig)}/>;
};
