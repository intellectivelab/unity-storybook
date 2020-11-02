import React, {useRef} from "react";

import * as R from "ramda";

import AppPage from "../../components/AppPage/AppPage";

import {
    Dashboard,
    DefaultComponentRenderer,
    DefaultContainerFactory,
    DefaultFormFieldFactory,
    TwoColumnsLayout,
    registerBuilder,
    useDimensions,
    withPageHeader,
} from "@intellective/core";

import withStyles from "@material-ui/core/styles/withStyles";

export default {title: 'Examples/Page Layout'};

export const UsingCustomPageLayout = () => {

    const styles = () => ({
        root: {
            //
        },
        container: {
            //
        }
    });

    const CustomPageLayout = (props) => {
        const {classes, PageHeader} = props;

        const rootRef = useRef();

        const dimensions = useDimensions(rootRef);

        const styles = {
            maxHeight: `calc(100vh - ${dimensions.offsetTop + 16}px)`,
            overflowY: 'auto',
        };

        return (
            <div className={classes.root}>
                {PageHeader && <PageHeader/>}

                <div className={classes.container} ref={rootRef} style={styles}>
                    <TwoColumnsLayout {...props}/>
                </div>
            </div>
        );
    };

    const CustomPageBuilder = (props) => {
        const {components = [], containers = [], ...otherProps} = props;

        const _CustomPageLayout = R.compose(
            withPageHeader,
            withStyles(styles)
        )(CustomPageLayout);

        return (
            <Dashboard {...otherProps} layout={_CustomPageLayout} components={components}>
                {/* render containers first */}
                {containers && containers.length > 0 &&
                <section key="containers" data-bind-to="containers">
                    {containers.map((containerDef, index) => (
                        <DefaultContainerFactory key={`container${index}`} id={`container${index}`} type="container" {...containerDef}/>
                    ))}
                </section>}

                {/* render components without containers */}
                {components && components.length > 0 && components.map((def) => <DefaultComponentRenderer {...def} key={def.id}/>)}
            </Dashboard>
        );
    };

    // Register custom page builder
    registerBuilder("custom", CustomPageBuilder);

    return <AppPage href="/api/1.0.0/config/perspectives/search/dashboards/page13"
                    ActionFactory={DefaultFormFieldFactory}/>;
};