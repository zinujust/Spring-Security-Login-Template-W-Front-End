import React, { useState } from 'react';
import LoginApi from '../Api/LoginApi';

const SignIn = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState('')

    const handleSubmit = (event) => {

        LoginApi.getJWT(setToken, username, password);

        //persist JWT in local storage to use in other API calls
        //used for authorization
        window.localStorage.setItem('token', token);

        const JWT = window.localStorage.getItem('token');
        console.log(JWT);
        event.preventDefault();

    }

    // window.localStorage.removeItem('token') //clear token value from local storage

    return (
        <div className='sign-in-container'>
            <form onSubmit={handleSubmit}>
                <label className='form-label'>
                    Username:
                </label>
                <input
                    value={username}
                    type='text'
                    className='form-control'
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className='form-label'>
                    Password:
                </label>
                <input
                    value={password}
                    type='password'
                    className='form-control'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type='submit' value='Submit' className='btn btn-primary' />
            </form>
        </div>
    );
};

export default SignIn;