import React, {useRef} from "react";

import * as R from "ramda";

import {
    Dashboard,
    DefaultComponentRenderer,
    DefaultContainerFactory,
    FactoryContextProvider,
    OneColumnLayout,
    registerBuilder,
    useDimensions,
    withPageHeader,
} from "@intellective/core";

import withStyles from "@material-ui/core/styles/withStyles";

import PageContainer from "../../../components/PageContainer/PageContainer";

export default {title: 'Examples/Pages/Layout'};

export const UsingPageLayout = () => {

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
                    <OneColumnLayout {...props}/>
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
                        <DefaultContainerFactory key={`container${index}`} id={`container${index}`}
                                                 type="container" {...containerDef}/>
                    ))}
                </section>}

                {/* render components without containers */}
                {components && components.length > 0 && components.map((def) => <DefaultComponentRenderer {...def}
                                                                                                          key={def.id}/>)}
            </Dashboard>
        );
    };

    // Register custom page builder
    registerBuilder("custom", CustomPageBuilder);

    return (
        <FactoryContextProvider>
            <PageContainer builder="custom" href="/api/config/perspectives/storybook/dashboards/page1"/>
        </FactoryContextProvider>
    );
};
