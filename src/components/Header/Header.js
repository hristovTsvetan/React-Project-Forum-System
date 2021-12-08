import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useUser } from "../../hooks/useUser";

import HondaLogo from "./Assets/Honda.svg";

import "./Header.css";

export default function Header() {
  const { logout } = useLogout();
  const { user } = useUser();

  return (
    <header className="main">
      <section className="logo">
        <Link to="/">
          <img src={HondaLogo} alt="Honda logo" />
        </Link>
      </section>

      <section className="header-mid-section">
        <p>POWER OF DREAMS</p>
      </section>

      <ul className="navbar">
        {!user && (
          <>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>Welcome {user.displayName}</li>
            <li>
              <Link to="/Profile/:id">Profile</Link>
            </li>
            <li>
              <Link to="/" onClick={logout}>
                LogOut
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
