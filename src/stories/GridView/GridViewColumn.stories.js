import React from 'react';

import {useDispatch} from "react-redux";

import * as R from "ramda";

import Alert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
import TableCell from "@material-ui/core/TableCell";

import GetAppIcon from '@material-ui/icons/GetApp';

import {
    DefaultComponentFactory,
    DefaultGridViewFactory,
    grids,
    GridView,
    useDefaultColumnRenderer
} from "@intellective/core";

import Page from "../../components/Page/Page";

export default {title: 'Examples/Grid View'};

/*
* Add custom column renderer
*/
export const UsingColumnRenderer = () => {

    const mapValue = R.cond([
        [R.is(Array), R.map(R.when(R.is(Object), R.prop('value')))],
        [R.is(Object), R.prop('value')],
        [R.T, R.identity]
    ]);

    const renderStatus = R.curry((column, value) => {
        const {name} = column;

        if (value === undefined || value === null || value === '') {
            return null;
        }

        const isCaseStatus = "case_status" === name;

        const severity = R.cond([
            [R.equals("Open"), R.always("info")],
            [R.equals("Error"), R.always("error")],
            [R.equals("Close"), R.always("success")],
            [R.T, R.always("warning")],
        ])(value);

        const icon = isCaseStatus ? {icon: false} : {};

        return <Alert variant={isCaseStatus ? "filled" : "outlined"} severity={severity} {...icon}>{value}</Alert>;
    });

    const domainStatusColumnRenderer = (value, row, column) => R.compose(renderStatus(column), mapValue)(value);

    const isCaseStatusColumn = R.anyPass([R.propEq('name', 'case_status'), R.propEq('name', 'task_status')]);

    const useDomainColumnRenderer = R.cond([
        [isCaseStatusColumn, R.always(domainStatusColumnRenderer)],
        [R.T, useDefaultColumnRenderer]
    ]);

    const DomainComponentMapping = R.cond([
        [R.propEq('type', 'grid'), (props) => <DefaultGridViewFactory {...props}
                                                                      useColumnRenderer={useDomainColumnRenderer}/>],
    ]);

    /**
     *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
     */
    const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props);

    return (
        <Page href="/api/1.0.0/config/perspectives/search/dashboards/page12"
              ComponentFactory={DomainComponentFactory}/>
    );
};

/*
* Add custom column action
*/
export const UsingColumnAction = () => {

    /**
     * Custom action that invokes download action on gender column click
     */
    const mappedColumnName = 'gender';

    const useColumnActionType = R.cond([[R.propEq('name', mappedColumnName), R.always('download')]]);

    const customActionRenderer = R.curry((column) => {

        return (value, record, column) => {
            const handleClick = (event) => {
                event.preventDefault();

                column.onClick && column.onClick(record);
            };

            return <Tooltip title={column.label} role="tooltip">
                <GetAppIcon cursor='pointer' color="inherit" onClick={handleClick}/>
            </Tooltip>;
        };
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const useColumnRenderer = column => R.cond([[R.propEq('name', mappedColumnName), customActionRenderer]])(column) || useDefaultColumnRenderer(column);

    const DomainComponentMapping = R.cond([
        [R.propEq('type', 'grid'),
            (props) => <DefaultGridViewFactory {...props} useColumnActionType={useColumnActionType}
                                               useColumnRenderer={useColumnRenderer}/>],
    ]);


    /**
     *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
     */
    const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props);

    return (
        <Page href="/api/1.0.0/config/perspectives/search/dashboards/page1"
              ComponentFactory={DomainComponentFactory}/>
    );
};

/**
 *  Custom action that implements cellRenderer with onDoubleClick handler
 */
const withUseCustomCellRenderer = R.curry((WrappedGrid, props) => {
    const findAction = actionName => R.find(R.propEq("name", actionName));

    const {id, actions} = props;

    const dispatch = useDispatch();

    const action = findAction('view')(actions);

    const useCustomCellRenderer = R.curry((classes, row, column) => {

        const value = row[column.name];

        return (
            <TableCell onDoubleClick={() => dispatch(grids.updateGridCurrentAction(id, {action, selected: row}))}
                       key={`${row.id}-${column.name}`} className={classes.tableCell} scope="row" variant="body">
                {column.renderer ? column.renderer(value, row, column) : value}
            </TableCell>
        );
    });

    return <WrappedGrid {...props} useCellRenderer={useCustomCellRenderer}/>;
});

/*
* Add custom row click handler
*/
export const UsingColumnClickHandler = () => {

    const Component = withUseCustomCellRenderer(GridView);

    const DomainComponentMapping = R.cond([
        [R.propEq('type', 'grid'), (props) => <DefaultGridViewFactory {...props} Component={Component}/>],
    ]);

    /**
     *  Customize the default component factory logic with simple boolean condition so that the custom component factory comes first
     */
    const DomainComponentFactory = (props) => DomainComponentMapping(props) || DefaultComponentFactory(props);

    return (
        <Page href="/api/1.0.0/config/perspectives/search/dashboards/page1"
              ComponentFactory={DomainComponentFactory}
        />
    );
};
