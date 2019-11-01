import React from "react";
import { NavLink } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";
import "./Navbar.scss";

function Navbar({ searchTermHandler, toggleSideDrawer }) {
  return (
    <header className="main-navigation">
      <div className="main-navigation__logo">
        <NavLink to="/">
          <h2>EzEvents</h2>
        </NavLink>
      </div>
      <nav className="main-navigation__items">
        <NavbarMenu searchTermHandler={searchTermHandler} />
        <i
          onClick={() => toggleSideDrawer()}
          className="fas fa-ellipsis-h fa-2x"
        ></i>
      </nav>
    </header>
  );
}

export default Navbar;
