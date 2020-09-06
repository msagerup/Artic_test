import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import LoginView from './views/auth/LoginView'
import LookUpView from './views/lookup/LookUpView'
import Auth from './components/Auth'
import LoadingScreen from './components/LoadingScreen';
import Topbar from './components/TopBar'
import { useAuth0 } from "@auth0/auth0-react";
import { create } from 'jss';
import rtl from 'jss-rtl';
// Material UI
import {
  createStyles,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core';
import { createTheme } from './theme';
import SiteLayout from './Layout/SiteLayout'

import history from "./utils/history";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

const darkStyle = {
		direction: 'ltr',
		responsiveFontSizes: true,
		theme: 'ONE_DARK'
}

function App() {
	useStyles();
	const { isLoading, error, isAuthenticated } = useAuth0();

	if(error) {
		return (
			<>
			OPPS.. {error.message}
			</>
		)
	}

	console.log('Autehnticatred', isAuthenticated)

	if(isLoading) {
		return <LoadingScreen />
	}

  return (
		<ThemeProvider theme={createTheme(darkStyle)}>
			<StylesProvider jss={jss}>
			<Router history = {history}>
				<Topbar />
				<SiteLayout>
				<Switch>
					<Route path='/' exact component={ LoginView}  />
					<Auth>			
						<Route path='/lookup' component={ LookUpView } />
					</Auth>
				</Switch>
				</SiteLayout>
			</Router>
			</StylesProvider>
		</ThemeProvider>
  );
}

export default App;
