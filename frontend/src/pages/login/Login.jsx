import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../shared/context/auth';
import classes from './Login.module.css';

export default function Login() {
	const [isValid, setIsValid] = useState(false);
	const [isTouched, setIsTouched] = useState(false);
	const [elements, setElements] = useState({});

	const context = useContext(AuthContext);
	const history = useHistory();

	const handleChange = (e) => {
		setElements({ ...elements, [e.target.name]: e.target.value });
	};

	if (context.isLoggedIn) {
		history.push('/list');
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post('/api/users/login', {
				username: elements.name,
				password: elements.password,
			})
			.then((res) => {
				context.login(res.data.token);
				history.push('/list');
				return;
			})
			.catch((error) => {
				console.log('Error: ', error.response.data.message);
				setIsValid(false);
				setIsTouched(true);
			});
	};

	return (
		<div className={classes.login}>
			<h2 className={classes.headline}>LOGIN</h2>
			<form className='container'>
				<label className={classes.label} htmlFor='name'>
					Username
				</label>
				<input className={classes.input} type='text' name='name' id='name' onChange={handleChange} />
				<label className={classes.label} htmlFor='password'>
					Password
				</label>
				<input className={classes.input} type='password' name='password' id='password' onChange={handleChange} />
				{isTouched && !isValid && <p className={classes.warning}>*Invalid username or password*</p>}
				<input className={classes.btn} type='submit' value='LOGIN' onClick={handleSubmit} />
			</form>
		</div>
	);
}
