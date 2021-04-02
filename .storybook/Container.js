import React from "react";

import {HashRouter as Router} from "react-router-dom";

import DateFnsUtils from "@date-io/date-fns";

import {Container} from "@material-ui/core";

import {MuiPickersUtilsProvider} from "@material-ui/pickers";

import {DashboardCtxt, DefaultStoreProvider, DefaultThemeProvider, FactoryContextProvider} from '@intellective/core';

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export default ({story}) => (
    <DefaultThemeProvider>
        <FactoryContextProvider>
            <DashboardCtxt.Provider value={{filter: ''}}>
                <DefaultStoreProvider>
                    <DndProvider backend={HTML5Backend}>
                        <Router>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Container maxWidth="lg">
                                    {story()}
                                </Container>
                            </MuiPickersUtilsProvider>
                        </Router>
                    </DndProvider>
                </DefaultStoreProvider>
            </DashboardCtxt.Provider>
        </FactoryContextProvider>
    </DefaultThemeProvider>
);
