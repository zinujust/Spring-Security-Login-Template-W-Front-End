import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <nav className="navbar nav navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to='sign-in'>Sign In</Link>
                            <Link className="nav-link" to='create-account'>Create Account</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
};

export default Navbar;