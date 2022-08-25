import React, { useEffect } from "react";
import { Form, Input, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { EDIT_USER_SAGA } from "../../redux/types/CyberBugs/UserConst";

function FormEditUser(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  // sử dụng useSelector lấy dữ liệu từ Reducer về
  const {} = useSelector((state) => state.DrawerReducer);
  const dispatch = useDispatch();
  const submitForm = (e) => {
    e.preventDefault();
  };
  // componentDidMount
  useEffect(() => {
    // load sự kiện submit lên drawer nút submit
    dispatch({
      type: "SET_SUBMIT_EDIT_USER",
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="ID">
            <Input
              name="id"
              onChange={handleChange}
              value={values.id}
              disabled
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Email">
            <Input
              name="email"
              onChange={handleChange}
              value={values.email}
              placeholder="Nhập email của bạn"
            />
            <div className="text-danger">{errors.email}</div>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tên người dùng">
            <Input
              name="name"
              onChange={handleChange}
              value={values.name}
              placeholder="Nhập tên người dùng"
            />
            <div className="text-danger">{errors.name}</div>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Số điện thoại">
            <Input
              name="phoneNumber"
              onChange={handleChange}
              value={values.phoneNumber}
              placeholder="Nhập số điện thoại"
            />
            <div className="text-danger">{errors.phoneNumber}</div>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
const EditUserForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userEdit } = props;
    return {
      id: userEdit.userId,
      email: userEdit.email,
      name: userEdit.name,
      phoneNumber: userEdit.phoneNumber,
    };
  },
  // Custom sync validation
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("Email is required !!!")
      .email("email is valid !!!"),
    name: Yup.string().required("Name is required !!!"),
    phoneNumber: Yup.string()
      .required("Phone is required !!!")
      .min(10, "Phone must have 10 number")
      .max(11, "Phone have max 11 number"),
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("Values:", values);
    // khi người dùng bấm submit => đưa dữ liệu về Backend thông qua API
    // gọi Saga
    props.dispatch({
      type: EDIT_USER_SAGA,
      updateUser: values,
    });
  },

  displayName: "Edit User Form",
})(FormEditUser);

const mapStateToProps = (state) => ({
  userEdit: state.UserReducer.userEdit,
});

export default connect(mapStateToProps)(EditUserForm);
