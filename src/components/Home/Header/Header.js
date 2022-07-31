import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  // let activeClassName = "underline";
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            ReactJS
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  activeClassName="activeNavItem "
                  activeStyle={{ fontWeight: "bold" }}
                  className="nav-link"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="activeNavItem"
                  activeStyle={{ fontWeight: "bold" }}
                  className="nav-link"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="activeNavItem"
                  activeStyle={{ fontWeight: "bold" }}
                  className="nav-link"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="activeNavItem"
                  activeStyle={{ fontWeight: "bold" }}
                  className="nav-link"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="activeNavItem"
                  activeStyle={{ fontWeight: "bold" }}
                  className="nav-link"
                  to="/demoHOCmodal"
                >
                  Demo HOC
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  activeClassName="activeNavItem"
                  activeStyle={{ fontWeight: "bold" }}
                  className="nav-link dropdown-toggle"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  // aria-expanded="false"
                  to="#"
                >
                  To Do List
                </NavLink>
                <ul
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <li>
                    <NavLink
                      activeClassName="activeNavItem"
                      activeStyle={{ fontWeight: "bold" }}
                      className="dropdown-item"
                      to="/todolistClass"
                    >
                      Class
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName="activeNavItem"
                      activeStyle={{ fontWeight: "bold" }}
                      className="dropdown-item"
                      to="/todolistFunc"
                    >
                      Function
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName="activeNavItem"
                      activeStyle={{ fontWeight: "bold" }}
                      className="dropdown-item"
                      to="/todolistRedux"
                    >
                      Reducer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName="activeNavItem"
                      activeStyle={{ fontWeight: "bold" }}
                      className="dropdown-item"
                      to="/todolistSaga"
                    >
                      Saga
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
