import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import classes from './Header.module.css';

export default function Header() {
	const context = useContext(AuthContext);
	const history = useHistory();

	const handleClick = () => {
		history.push('/login');
		context.logout();
	};

	return (
		<header className={classes.header}>
			<div className={classes.wrapper + ' container'}>
				<div>
					<h1 className={classes.logo}>INVENTORY</h1>
				</div>
				<div>
					{context.isLoggedIn && <span className={classes.username}>Hi Admin</span>}
					{context.isLoggedIn && (
						<button className={classes.button} onClick={handleClick}>
							LOGOUT
						</button>
					)}
				</div>
			</div>
		</header>
	);
}
