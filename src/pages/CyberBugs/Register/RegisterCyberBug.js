import React from "react";
import {
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { withFormik, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { singinCyberBugAction } from "../../../redux/actions/CyberBugAction";
import { USER_SIGNUP_API } from "../../../redux/types/CyberBugs/CyberBugConst";

function RegisterCyberBug(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <form
      onSubmit={handleSubmit}
      name="basic"
      style={{
        marginTop: "30%",
        marginLeft: "28%",
      }}
      className="w-50"
    >
      <h4 className="text-center">Register CyberBugs</h4>
      {/* trường nhập Email */}
      <Input
        className="mt-3"
        onChange={handleChange}
        label="Email"
        name="email"
        prefix={<MailOutlined />}
        placeholder="Please input your email..."
      >
        {/* <Input /> */}
      </Input>
      <div className="text-danger">{errors.email}</div>

      {/* trường nhập Password */}
      <Input
        className="mt-3"
        onChange={handleChange}
        label="Password"
        name="passWord"
        type="password"
        prefix={<LockOutlined />}
        placeholder="Please input your password..."
      >
        {/* <Input.Password /> */}
      </Input>
      <div className="text-danger">{errors.passWord}</div>

      {/* trường nhập Name */}
      <Input
        className="mt-3"
        onChange={handleChange}
        label="Name"
        name="name"
        type="text"
        prefix={<UserOutlined />}
        placeholder="Please input your name..."
      ></Input>
      <div className="text-danger">{errors.name}</div>

      {/* trường nhập Phone */}
      <Input
        className="mt-3"
        onChange={handleChange}
        label="PhoneNumber"
        name="phoneNumber"
        type="text"
        prefix={<PhoneOutlined />}
        placeholder="Please input your phone..."
      ></Input>
      <div className="text-danger">{errors.phoneNumber}</div>

      <div>
        <Button className="mt-3 w-100" type="primary" htmlType="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
const RegisterWithFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required !!!")
      .email("email is valid !!!"),
    passWord: Yup.string()
      .min(6, "Password must have 6 characters")
      .max(32, "Password have max 32 characters"),
    name: Yup.string().required("Name is required !!!"),
    phoneNumber: Yup.string()
      .required("Phone is required !!!")
      .min(10, "Phone must have 10 number")
      .max(11, "Phone have max 11 number"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("Register value", values);
    props.dispatch({
      type: USER_SIGNUP_API,
      newUser: values,
    });
  },

  displayName: "Register CyberBug",
})(RegisterCyberBug);

export default connect()(RegisterWithFormik);
