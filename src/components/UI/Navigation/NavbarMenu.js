import React, { useContext, Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import AuthContext from "../../../context/auth-context";
import SearchBar from "../SearchBar";

function NavbarMenu(props) {
  const context = useContext(AuthContext);
  return (
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
  );
}

export default withRouter(NavbarMenu);
