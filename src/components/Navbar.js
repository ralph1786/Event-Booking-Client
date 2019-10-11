import React, { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import AuthContext from "../context/auth-context";

function Navbar() {
  const context = useContext(AuthContext);
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <NavLink to="/">
          <h2>EzEvents</h2>
        </NavLink>
      </div>
      <nav className="main-navigation__items">
        <ul>
          {!context.token ? (
            <li>
              <NavLink to="/auth">LogIn</NavLink>
            </li>
          ) : (
            ""
          )}
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          {context.token ? (
            <Fragment>
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li>
                <button onClick={context.logout}>Logout</button>
              </li>
            </Fragment>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
