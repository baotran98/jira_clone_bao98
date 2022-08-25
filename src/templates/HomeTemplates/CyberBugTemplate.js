import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import MenuCyberBug from "../../components/CyberBugs/MenuCyberBug";
import ModalCyberBug from "../../components/CyberBugs/ModalCyberBug/ModalCyberBug";
import SidebarCyberBug from "../../components/CyberBugs/SidebarCyberBug";
import { USER_LOGIN } from "../../util/constants/settingSystem";
import "../HomeTemplates/css/CyberBugTemplate.css";

export const CyberBugTemplate = (props) => {
  const { Component, ...restParam } = props;
  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn chưa đăng nhập để vào trang này!");
    return <Redirect to="/login" />;
  }
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
