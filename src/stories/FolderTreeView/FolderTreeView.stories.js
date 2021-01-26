import React, {useEffect} from "react";

import * as R from "ramda";

import {useDispatch} from "react-redux";

import {DefaultComponentFactory, folders, FolderTreeView, withSnackbar, withTreeQueryLoader} from "@intellective/core";
import Page from "../../components/Page/Page";

export default {title: 'Examples/FolderTree View'};

/**
 * HOC selects root folder by default
 */
const withSelectedRoot = R.curry((WrappedComponent, props) => {

    const {id, selected, data, onNodeSelect} = props;

    const isRealEmpty = R.anyPass([R.isEmpty, R.isNil]);

    const roots = R.filter(R.compose(isRealEmpty, R.prop('parentId')), R.values(data));

    const dispatch = useDispatch();

    useEffect(() => {
        if (isRealEmpty(selected) && R.not(isRealEmpty(roots))) {

            const nodeIds = R.map(R.prop('id'), roots);
            const paths = R.map(R.prop('path'), roots);
            dispatch(folders.setSelected(id, nodeIds));
            onNodeSelect && onNodeSelect(nodeIds, paths, R.pick(nodeIds, data));
        }

    }, [selected, roots]);

    return <WrappedComponent {...props} />;
});

/*
* Add HOC to select root folder by default
*/

export const UsingRootFolderSelectedByDefault = () => {

    const FolderTreeViewFactory = (props) => {

        const {Component = FolderTreeView, _links = {}, ...otherProps} = props;

        const ComposedFolderTreeView = R.compose(withSnackbar, withTreeQueryLoader, withSelectedRoot)(Component);

        return (
            <ComposedFolderTreeView {...otherProps} browseLink={_links.browse}/>
        );
    };

    const DomainComponentMapping = R.cond([
        [R.propEq('type', 'treeView'), FolderTreeViewFactory],
    ]);

    const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props);

    return (
        <Page href="/api/1.0.0/config/perspectives/search/dashboards/folderTreeView"
              ComponentFactory={DomainComponentFactory}/>
    );
};
