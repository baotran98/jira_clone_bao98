import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";

function CreateProject(props) {
  // sử dụng useSelector lấy dữ liệu từ Reducer về
  const projectCategory = useSelector(
    (state) => state.ProjectCateReducer.arrProjectCate
  );
  //
  const dispatch = useDispatch();
  // console.log("result", projectCategory);
  // thêm các hàm của formik
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  //
  useEffect(() => {
    // gọi API để lấy dữ liệu cho thẻ Select
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
  }, []);

  const handleEditorChange = (content, editor) => {
    // dùng setFieldValue để set lại Editor ko có sẵn trong Formik
    setFieldValue("description", content);
    console.log("Content", content);
  };
  return (
    <div className="container m-5">
      <form onSubmit={handleSubmit} onChange={handleChange} className="form">
        <h4>CREATE PROJECT</h4>
        <div className="form-group mt-3">
          <p>Project Name</p>
          <input className="form-control" name="projectName" />
        </div>
        <div className="form-group mt-3">
          <p>Description</p>
          <Editor
            name="description"
            onEditorChange={handleEditorChange}
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="form-group mt-3">
          <select
            onChange={handleChange}
            className="form-control"
            name="categoryId"
          >
            {projectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary w-100 mt-3" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
}

const createProjectFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    // console.log("props value", props);
    return {
      projectName: "",
      description: "",
      categoryId: props.projectCategory[0]?.id,
    };
  },

  // Custom sync validation
  validateSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("Value", values);
    props.dispatch({
      type: "CREATE_PROJECT_SAGA",
      newProject: values,
    });
  },
  displayName: "CREATE PROJECT",
})(CreateProject);

const mapStateToProps = (state) => ({
  projectCategory: state.ProjectCateReducer.arrProjectCate,
});

export default connect(mapStateToProps)(createProjectFormik);
