import React from "react";
import "./Nav.css";

const Nav = () => {
  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark indigo">
        <li className="nav-item active">
          <a className="nav-link" href="/">
            Home
          </a>
        </li>
      </nav>
    </header>
  );
};
export default Nav;
