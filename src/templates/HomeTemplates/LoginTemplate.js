import { Button, Layout } from "antd";
import { withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

export const LoginTemplate = (props) => {
  const [{ width, height }, setSize] = useState({
    width: Math.round(window.innerWidth),
    height: Math.round(window.innerHeight),
  });
  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
      });
    };
  });
  const { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Layout>
              <Sider
                width={width / 2}
                style={{
                  height: height,
                  // backgroundImage: `url(${require("../../assets/loginBG/login_BG.jpg")}) `,
                  backgroundImage: `url(https://picsum.photos/${Math.round(
                    width / 2
                  )}/${height})`,
                }}
              ></Sider>
              <Content>
                <Component {...propsRoute} />
              </Content>
            </Layout>
          </>
        );
      }}
    />
  );
};
