import React from "react";
import './nav.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "./Users/users-thunks";
import { useLocation, useNavigate } from "react-router";

function Nav() {
    // find the name of this web
    const { pathname } = useLocation();
    const paths = pathname.split('/')
    const active = paths[1];

    // find the current user
    const { currentUser } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand bg-light font-style-brand">
            <div className="container-fluid">
                {
                    !currentUser ? (
                        <a className="navbar-brand" style={{ fontWeight: 'bold' }}>Coffee Quest</a>
                    ) : (
                        <a className="navbar-brand" style={{ fontWeight: 'bold' }}>Hi {currentUser.username}</a>
                    )
                }
                <div className="navbar-nav">
                    <ul className="nav nav-pills card-header-pills me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${active === '' ? 'active' : ''}`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/search" className={`nav-link ${active === 'search' ? 'active' : ''}`}>Search</Link>
                        </li>
                        {currentUser && currentUser.role === "ADMIN" && (
                            <li className="nav-item">
                                <Link to="/admin" className={`nav-link ${active === 'admin' ? 'active' : ''}`}>Admin</Link>
                            </li>
                        )}
                        {!currentUser && (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className={`nav-link ${active === 'login' ? 'active' : ''}`}>Login</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/register" className={`nav-link ${active === 'register' ? 'active' : ''}`}>Register</Link>
                                </li>
                            </>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to="/profile" className={`nav-link ${active === 'profile' ? 'active' : ''}`}>Profile</Link>
                            </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <button className="btn btn-outline-danger nav-link" type="button" onClick={() => {
                                    dispatch(logoutThunk());
                                    navigate("/");
                                }}>Logout</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
