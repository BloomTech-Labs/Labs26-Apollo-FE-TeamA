import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/global.css";

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Apollo</NavLink>
    </nav>
  );
};

export default NavBar;
