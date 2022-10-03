import React, { useState } from 'react';
import LoginApi from '../Api/LoginApi';

const CreateAccount = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = () => {
        const newUser = {
            "username": username,
            "password": pass,
            "role": "ROLE_USER",
            "enabled": true,
            "email": email
        }

        LoginApi.registerUser(newUser);
    }

    return (
        <div className='create-account-container'>
            <form onSubmit={handleSubmit}>

                <label className='form-label'>
                    Email:
                </label>
                <input
                    className='form-control'
                    value={email}
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <p className='display-6'>Credentials</p>
                <label className='form-label'>
                    Username:
                </label>
                <input
                    className='form-control'
                    value={username}
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className='form-label'>
                    Password:
                </label>
                <input
                    className='form-control'
                    value={pass}
                    type='text'
                    onChange={(e) => setPass(e.target.value)}
                />
                <input
                    type="submit"
                    value="Create Account"
                    className='btn btn-primary'
                />
            </form>
        </div>
    );
};

export default CreateAccount;