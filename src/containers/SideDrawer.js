import React from "react";
import NavbarMenu from "../components/UI/Navigation/NavbarMenu";
import "./SideDrawer.scss";

function SideDrawer({ isDrawerOpen, searchTermHandler }) {
  return (
    <div className={isDrawerOpen ? "side-drawer-open" : "side-drawer-closed"}>
      <NavbarMenu searchTermHandler={searchTermHandler} />
    </div>
  );
}

export default SideDrawer;
