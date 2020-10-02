import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { AuthContext } from './shared/context/auth';
import Header from './shared/components/Header';
import List from './pages/inventory/List';
import Login from './pages/login/Login';

function App() {
	const [token, setToken] = useState(null);

	const login = useCallback((tokenn) => {
		setToken(tokenn);
		localStorage.setItem('Token', tokenn);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		localStorage.removeItem('Token');
	}, []);

	// on mounting -> extract login if user has a token in local storage
	useEffect(() => {
		const tokenn = localStorage.getItem('Token');
		if (tokenn) {
			login(tokenn);
		}
	}, [login]);

	return (
		<AuthContext.Provider value={{ isLoggedIn: !!token, token: token, login: login, logout: logout }}>
			<Router>
				<Header />
				<Switch>
					<Route path='/list' component={List} />
					<Route path='/login' component={Login} />
					<Redirect to='/login' />
				</Switch>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
