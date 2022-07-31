import React, { Fragment } from "react";
import { Route } from "react-router-dom";
// import ContentMain from "../../components/CyberBugs/Main/ContentMain";
// import HeaderMain from "../../components/CyberBugs/Main/HeaderMain";
// import InfoMain from "../../components/CyberBugs/Main/InfoMain";
import MenuCyberBug from "../../components/CyberBugs/MenuCyberBug";
import ModalCyberBug from "../../components/CyberBugs/ModalCyberBug/ModalCyberBug";
import SidebarCyberBug from "../../components/CyberBugs/SidebarCyberBug";
import "../HomeTemplates/css/CyberBugTemplate.css";

export const CyberBugTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              <SidebarCyberBug />
              <MenuCyberBug />
              <Component {...propsRoute} />
              <ModalCyberBug />
            </div>
          </>
        );
      }}
    />
  );
};
