import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderMain(props) {
  const { projectDetail } = props;
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">CyberLearn</li>
          <NavLink
            style={{ color: "black" }}
            className="breadcrumb-item"
            to="/projectmanagement"
          >
            Project Management
          </NavLink>
          <li className="breadcrumb-item active" aria-current="page">
            {projectDetail.projectName}
          </li>
        </ol>
      </nav>
    </div>
  );
}
