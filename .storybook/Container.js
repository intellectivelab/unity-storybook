import React from "react";

import {HashRouter as Router} from "react-router-dom";

import DateFnsUtils from "@date-io/date-fns";

import {Container} from "@material-ui/core";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

import {DashboardCtxt, DefaultStoreProvider, DefaultThemeProvider} from '@intellective/core';

export default ({story}) => (
	<DefaultThemeProvider>
		<DashboardCtxt.Provider value={{filter: ''}}>
			<DefaultStoreProvider>
				<Router>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Container maxWidth="lg">
							{story()}
						</Container>
					</MuiPickersUtilsProvider>
				</Router>
			</DefaultStoreProvider>
		</DashboardCtxt.Provider>
	</DefaultThemeProvider>
);
