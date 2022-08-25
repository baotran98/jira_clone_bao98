import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { withFormik, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { USER_SIGNIN_API } from "../../../redux/types/CyberBugs/CyberBugConst";
import { singinCyberBugAction } from "../../../redux/actions/CyberBugAction";
import { NavLink } from "react-router-dom";

function LoginCyberBug(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <form
      onSubmit={handleSubmit}
      name="basic"
      style={{
        marginTop: "36.5%",
        marginLeft: "37%",
      }}
      className="w-25 animate__animated animate__fadeIn"
    >
      <h4>Login CyberBugs</h4>
      <Input
        className="mt-3"
        onChange={handleChange}
        label="Email"
        name="email"
        prefix={<UserOutlined />}
        placeholder="Please input your email..."
      >
        {/* <Input /> */}
      </Input>
      <div className="text-danger">{errors.email}</div>
      <Input
        className="mt-3"
        onChange={handleChange}
        label="Password"
        name="password"
        type="password"
        prefix={<LockOutlined />}
        placeholder="Please input your password..."
      >
        {/* <Input.Password /> */}
      </Input>
      <div className="text-danger">{errors.password}</div>
      <div className="mt-2">
        <NavLink to="/register">Register </NavLink>
        here !
      </div>

      <div>
        <Button className="mt-3 w-100" type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required !!!")
      .email("email is valid !!!"),
    password: Yup.string()
      .required("Password is required !!!")
      .min(6, "Password must have 6 characters")
      .max(32, "Password have max 32 characters"),
  }),

  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    // let action = {
    //   type: USER_SIGNIN_API,
    //   userLogin: {
    //     email: values.email,
    //     password: values.password,
    //   },
    // };
    setSubmitting(true);
    props.dispatch(singinCyberBugAction(email, password));
  },

  displayName: "Login CyberBug",
})(LoginCyberBug);

export default connect()(LoginCyberBugsWithFormik);
