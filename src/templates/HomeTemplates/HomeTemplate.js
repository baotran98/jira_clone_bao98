import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../../components/Home/Header/Header";

export const HomeTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      path={restParam.path}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
};
