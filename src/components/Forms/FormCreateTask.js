import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Select, Slider, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector, connect } from "react-redux";
import { GET_ALL_PROJECT_SAGA } from "../../redux/types/CyberBugs/ProjectConst";
import {
  CREATE_TASK_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../redux/types/CyberBugs/TaskConst";
import { GET_ALL_PRIORITY_SAGA } from "../../redux/types/CyberBugs/PriorityConst";
import { GET_ALL_STATUS_SAGA } from "../../redux/types/CyberBugs/StatusConst";
import { GET_USER_PROJECT_BY_ID_SAGA } from "../../redux/types/CyberBugs/UserConst";
import { withFormik } from "formik";
import * as Yup from "yup";
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function FormCreateTask(props) {
  // props của Formik
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const { showProject } = useSelector((state) => state.ProjectCyberBugReducer);
  // console.log("Show Project", showProject);
  const { arrTaskType } = useSelector((state) => state.TaskReducer);
  // console.log("Show Task", arrTaskType);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  // console.log("Show Priority", arrPriority);
  const { arrUser } = useSelector((state) => state.UserReducer);
  // console.log("Get User", arrUser);
  // hàm biến đổi options cho thẻ select
  const userOption = arrUser?.map((user, index) => {
    return { value: user.userId, label: user.name };
  });
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  // console.log("List Status", arrStatus);
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  // useDispatch
  const dispatch = useDispatch();
  // hook useEffect
  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: "GET_USER_SAGA",
      keyWord: "",
    });
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    // đưa hàm handle submit lên DrawerReducer để cập nhật lại sự kiện cho nút Submit
    dispatch({
      type: "SET_SUBMIT_CREATE_TASK",
      submitFunction: handleSubmit,
    });
  }, []);

  return (
    <form layout="vertical" onSubmit={handleSubmit}>
      <div className="container">
        <div className="form-group">
          <label>Project</label>
          <Select
            className="w-100"
            name="projectId"
            placeholder="Nhập tên dự án"
            optionFilterProp="label"
            onChange={(value) => {
              // dispatch giá trị làm thay đổi arrUser
              // let { value } = e.target; => cho select thường
              dispatch({
                type: GET_USER_PROJECT_BY_ID_SAGA,
                idProject: value,
              });
              // cập nhật giá trị cho projectId
              setFieldValue("projectId", value);
            }}
            // onSelect={(value) => {
            //   console.log(value);
            // }}
          >
            {showProject.map((project, index) => {
              return (
                <Option key={index} value={project.id}>
                  {project.projectName}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="form-group mt-3">
          <label>Task name</label>
          <Input
            type="text"
            name="taskName"
            placeholder="Nhập tên yêu cầu"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-3">
          <label>Status</label>
          <Select
            className="w-100"
            name="statusId"
            //   value={values.categoryId}
            placeholder="Chọn trạng thái yêu cầu"
            optionFilterProp="label"
            onChange={(values) => {
              setFieldValue("statusId", values);
            }}
            onSelect={(value) => {
              console.log(value);
            }}
          >
            {arrStatus.map((status, index) => {
              return (
                <Option key={index} value={status.statusId}>
                  {status.statusName}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group mt-3">
              <label>Priority</label>
              <Select
                className="w-100"
                name="priorityId"
                placeholder="Chọn loại ưu tiên"
                optionFilterProp="label"
                onChange={(values) => {
                  setFieldValue("priorityId", values);
                }}
                onSelect={(value) => {
                  console.log(value);
                }}
              >
                {arrPriority.map((priority, index) => {
                  return (
                    <Option key={index} value={priority.priorityId}>
                      {priority.priority}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group mt-3">
              <label>Task type</label>
              <Select
                className="w-100"
                name="typeId"
                //   value={values.categoryId}
                placeholder="Chọn loại yêu cầu"
                optionFilterProp="label"
                onChange={(values) => {
                  setFieldValue("typeId", values);
                }}
                onSelect={(value) => {
                  console.log(value);
                }}
              >
                {arrTaskType.map((task, index) => {
                  return (
                    <Option key={index} value={task.id}>
                      {task.taskType}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="form-group mt-3">
              <label>Assignees</label>
              <Select
                mode="multiple"
                placeholder="Nhập thành viên tham gia"
                name="listUserAsign"
                options={userOption}
                optionFilterProp="label"
                onChange={(values) => {
                  setFieldValue("listUserAsign", values);
                }}
                onSelect={(value) => {
                  console.log(value);
                }}
                style={{
                  width: "100%",
                }}
              >
                {children}
              </Select>
            </div>
            <div className="form-group" style={{ marginTop: "8.1%" }}>
              <label>Original Estimate</label>
              <Input
                type="number"
                min="0"
                defaultValue="0"
                name="originalEstimate"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group mt-3">
              <label>Time tracking</label>
              <Slider
                defaultValue={30}
                value={timeTracking.timeTrackingSpent}
                max={
                  Number(timeTracking.timeTrackingSpent) +
                  Number(timeTracking.timeTrackingRemaining)
                }
                // tooltipVisible
              />
              <div className="row">
                <div className="col-6 text-start fw-light">
                  {timeTracking.timeTrackingSpent}h logged
                </div>
                <div className="col-6 text-end fw-light">
                  {timeTracking.timeTrackingRemaining}h remaining
                </div>
              </div>
              <div className="row" style={{ marginTop: "1%" }}>
                <div className="col-6">
                  <div className="form-group">
                    <label>Time spent</label>
                    <Input
                      type="number"
                      defaultValue="0"
                      min="0"
                      name="timeTrackingSpent"
                      onChange={(e) => {
                        setTimeTracking({
                          ...timeTracking,
                          timeTrackingSpent: e.target.value,
                        });
                        setFieldValue("timeTrackingSpent", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <lab>Time remaing</lab>
                    <Input
                      type="number"
                      defaultValue="0"
                      min="0"
                      name="timeTrackingRemaining"
                      onChange={(e) => {
                        setTimeTracking({
                          ...timeTracking,
                          timeTrackingRemaining: e.target.value,
                        });
                        setFieldValue("timeTrackingRemaining", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div label="Mô tả yêu cầu">
            <Editor
              // onInit={(evt, editor) => (editorRef.current = editor)}
              name="description"
              onEditorChange={(content, editor) => {
                setFieldValue("description", content);
              }}
              //   initialValue={values.description}
              init={{
                height: 400,
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
          </div>
        </div>
        {/* <button className="btn btn-primary mt-2 w-100" type="submit">
          Submit
        </button> */}
      </div>
    </form>
  );
}
const CreateTaskForm = withFormik({
  enableReinitialize: true, // sử dụng khi cần cho select mặc định là giá trị đầu
  mapPropsToValues: (props) => {
    const { showProject, arrTaskType, arrPriority, arrStatus } = props;
    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: showProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },
  // Custom sync validation
  validateSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("Submit Value", values);
    props.dispatch({
      type: CREATE_TASK_SAGA,
      taskObject: values,
    });
  },

  displayName: "CreateTaskForm",
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    showProject: state.ProjectCyberBugReducer.showProject,
    arrTaskType: state.TaskReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

export default connect(mapStateToProps)(CreateTaskForm);
