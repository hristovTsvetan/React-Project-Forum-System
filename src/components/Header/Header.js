import { Link } from "react-router-dom";

import HondaLogo from './Assets/Honda.svg'

import './Header.css';

export default function Header() {
    return (
        <header className="main">
            <section className="logo">
                <img src={HondaLogo} alt="Honda logo" />
            </section>
            <section className="header-mid-section">
                <p>POWER OF DREAMS</p>
            </section>
            <ul className="navbar">
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                <li>Welcome Ivan</li>
                <li><Link to="/Profile/:id">Profile</Link></li>
                <li><Link to="/">LogOut</Link></li>
            </ul>
        </header>
    );
}