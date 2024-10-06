import React from "react";


const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar-center">
                <ul className="nav-links">
                <li>
                    <a href="/profile">Profile</a>
                </li>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/favorites">Favorites</a>
                </li>
                <li>
                    <a href='/passport'>Passport</a>
                </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar