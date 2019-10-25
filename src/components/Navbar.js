import React, { useContext, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Navbar.scss";
import AuthContext from "../context/auth-context";
import SearchBar from "./SearchBar";

function Navbar(props) {
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
            <Fragment>
              <li>
                {props.location.pathname === "/events" && (
                  <SearchBar searchTermHandler={props.searchTermHandler} />
                )}
              </li>
              <li>
                <NavLink to="/auth">LogIn</NavLink>
              </li>
            </Fragment>
          ) : (
            ""
          )}
          {context.token && (
            <li>
              {props.location.pathname === "/events" && (
                <SearchBar searchTermHandler={props.searchTermHandler} />
              )}
            </li>
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

export default withRouter(Navbar);
