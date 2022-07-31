import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuCyberBug() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/download.jfif")} alt="avatar" />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" style={{ marginRight: "2%" }} />
          <NavLink
            to="/cyberbugs"
            // activeClassName="active font-weight-bold"
            activeStyle={{ fontWeight: "bold" }}
            style={{ color: "black" }}
          >
            Cyber Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-tasks" style={{ marginRight: "2%" }} />
          <NavLink
            to="/projectmanagement"
            // activeClassName="active font-weight-bold"
            activeStyle={{ fontWeight: "bold" }}
            style={{ color: "black" }}
          >
            Project Management
          </NavLink>
        </div>
        <div>
          <i class="fa fa-users" style={{ marginRight: "2%" }} />
          {/* <i className="fa fa-tasks" style={{ marginRight: "2%" }} /> */}
          <NavLink
            to="/usermanagement"
            // activeClassName="active font-weight-bold"
            activeStyle={{ fontWeight: "bold" }}
            style={{ color: "black" }}
          >
            User Management
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" style={{ marginRight: "2%" }} />
          <NavLink
            to="/createproject"
            // activeClassName="active font-weight-bold"
            activeStyle={{ fontWeight: "bold" }}
            style={{ color: "black" }}
          >
            Create Project
          </NavLink>
        </div>
      </div>
      {/* <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div> */}
    </div>
  );
}
