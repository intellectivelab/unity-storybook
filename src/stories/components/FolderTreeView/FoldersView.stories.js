import React, {useEffect} from "react";

import * as R from "ramda";

import {useDispatch} from "react-redux";

import {DefaultComponentFactory, FactoryContextProvider, folders, FolderTreeView, withSnackbar, withTreeQueryLoader} from "@intellective/core";

import PageContainer from "../../../components/PageContainer/PageContainer";

export default {title: 'Examples/Components/FoldersView'};

/**
 * Selects root folder by default
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

			dispatch(folders.updateSelected(id, nodeIds));

			onNodeSelect && onNodeSelect(nodeIds, paths, R.pick(nodeIds, data));
		}

	}, [selected, roots]);

	return <WrappedComponent {...props} />;
});

/*
* Add HOC to select root folder by default
*/
export const SelectRootByDefault = () => {

	const FolderTreeViewFactory = (props) => {

		const {Component = FolderTreeView, _links = {}, ...otherProps} = props;

		const ComposedFolderTreeView = R.compose(withSnackbar, withTreeQueryLoader, withSelectedRoot)(Component);

		return (
			<ComposedFolderTreeView {...otherProps} browseLink={_links.browse}/>
		);
	};

	const DomainComponentFactory = R.cond([
		[R.propEq('type', 'treeView'), FolderTreeViewFactory],
		[R.T, DefaultComponentFactory]
	]);

	return (
		<FactoryContextProvider ComponentFactory={DomainComponentFactory}>
			<PageContainer href="/api/config/perspectives/storybook/dashboards/folderTreeView"/>
		</FactoryContextProvider>
	);
};
