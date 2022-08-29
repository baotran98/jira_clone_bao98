import React, { Fragment, useEffect } from "react";
import { Form, Input, Row, Col, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";

const { Option } = Select;

function FormEditProject(props) {
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
  const projectCategory = useSelector(
    (state) => state.ProjectCateReducer.arrProjectCate
  );

  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.preventDefault();
    // alert("Submit Edit");
    // console.log("Content Edit:", submitForm);
  };
  // componentDidMount
  useEffect(() => {
    dispatch({
      type: "GET_ALL_PROJECT_CATEGORY_SAGA",
    });
    // load sự kiện submit lên drawer nút submit
    dispatch({
      type: "SET_SUBMIT_EDIT_PROJECT",
      submitFunction: handleSubmit,
    });
  }, []);
  const handleEditorChange = (content, editor) => {
    // dùng setFieldValue để set lại Editor ko có sẵn trong Formik
    setFieldValue("description", content);
    // console.log("Content", content);
  };

  // lấy thông tin project từ LocalStorage
  let detailProject = [];
  if (localStorage.getItem("projectParams")) {
    detailProject = JSON.parse(localStorage.getItem("projectParams"));
  }

  return (
    <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="ID">
            <Input name="id" value={values.id} disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tên người tạo">
            <Input
              name="creator"
              onChange={handleChange}
              value={detailProject.creator.name}
              disabled
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tên dự án">
            <Input
              name="projectName"
              onChange={handleChange}
              value={values.projectName}
              placeholder="Nhập tên dự án"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Loại dự án">
            <Select
              name="categoryId"
              onChange={(value) => {
                setFieldValue("categoryId", value);
              }}
              value={values.categoryId}
              placeholder="Chọn loại dự án"
            >
              {projectCategory?.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <Option value={item.id}>{item.projectCategoryName}</Option>
                  </Fragment>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Mô tả dự án">
            <Editor
              // onInit={(evt, editor) => (editorRef.current = editor)}
              name="description"
              onEditorChange={handleEditorChange}
              initialValue={values.description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "a11ychecker",
                  "advlist",
                  "advcode",
                  "advtable",
                  "autolink",
                  "checklist",
                  "export",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "powerpaste",
                  "fullscreen",
                  "formatpainter",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | casechange blocks | bold italic backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
const EditProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    console.log({ projectEdit });
    return {
      id: projectEdit.id,
      projectName: projectEdit.projectName,
      description: projectEdit.description,
      categoryId: projectEdit.categoryId,
      creator: projectEdit.creator.id,
    };
  },
  // Custom sync validation
  validateSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    // khi người dùng bấm submit => đưa dữ liệu về Backend thông qua API
    // const action = {
    //   type: "UPDATE_PROJECT_SAGA",
    //   projectUpdate: values,
    // };
    // gọi Saga
    props.dispatch({
      type: "UPDATE_PROJECT_SAGA",
      projectUpdate: values,
    });
  },

  displayName: "Edit Project Form",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectForm);
