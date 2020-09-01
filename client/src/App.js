import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import LoginView from './views/auth/LoginView'
import LookUpView from './views/lookup/LookUpView'
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

import './App.css';

function App() {
	const { isLoading, error } = useAuth0();

	if(error) {
		return (
			<>
			OPPS.. {error.message}
			</>
		)
	}

	if(isLoading) {
		return <h3>Loading...</h3>
	}

  return (
		<Router history = {history}>
			<Switch>
				<Route path='/' exact component={ LoginView}  />
				<Route path='/lookup' component={ LookUpView } />
			</Switch>
   

		</Router>
  );
}

export default App;
