import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Select } from "antd";
import { useDispatch, useSelector, connect } from "react-redux";
import ReactHtmlParser from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import { GET_ALL_STATUS_SAGA } from "../../../redux/types/CyberBugs/StatusConst";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/types/CyberBugs/PriorityConst";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_ALL_TASK_TYPE_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_ASSIGNESS,
} from "../../../redux/types/CyberBugs/TaskConst";
import {
  ADD_COMMENT_SAGA,
  DELETE_COMMENT_SAGA,
} from "../../../redux/types/CyberBugs/CommentConst";
import { withFormik } from "formik";
import * as Yup from "yup";
const { Option } = Select;

function ModalCyberBug(props) {
  // props của Formik
  const { values, touched, errors, handleBlur, handleSubmit, setFieldValue } =
    props;
  // hook useSelector
  const { taskDetailModel } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskReducer);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [visibleComment, setVisibleComment] = useState(false);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModel.description
  );
  const [content, setContent] = useState(taskDetailModel.description);
  const [contentComment, setContentComment] = useState(
    taskDetailModel.lstComment.id
  );
  // hook useDispatch
  const dispatch = useDispatch();
  // hook useEffect
  useEffect(() => {
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
  }, []);

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModel.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
              initialValue={taskDetailModel.description}
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
            <button
              className="btn btn-primary m-1"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-danger m-1"
              onClick={() => {
                // dùng historyContent
                // dispatch({
                //   type: CHANGE_TASK_MODAL,
                //   name: "description",
                //   value: historyContent,
                // });
                setVisibleEditor(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              // dùng setHistoryContent
              // setHistoryContent(taskDetailModel.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModel;
    const Total = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const Percent = Math.round((Number(timeTrackingSpent) / Total) * 100);
    return (
      <>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${Percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={100}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label className="fw-bold">Spent</label>
            <Input
              name="timeTrackingSpent"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="col-6">
            <label className="fw-bold">Remaining</label>
            <Input
              name="timeTrackingRemaining"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark me-1" />
              <select
                name="typeId"
                value={taskDetailModel.typeId}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {arrTaskType.map((type, index) => {
                  return (
                    <option key={index} value={type.id}>
                      {type.taskType}
                    </option>
                  );
                })}
              </select>
              <span>ID: {taskDetailModel.taskId}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button
                type="button"
                className="btn btn-light"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">{taskDetailModel.taskName}</p>
                  <div className="description">
                    <p>Mô tả</p>
                    <p>{renderDescription()}</p>
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (1).jfif")}
                          alt="avatar"
                        />
                      </div>
                      <form className="w-100" onSubmit={handleSubmit}>
                        <div className="input-comment">
                          <Editor
                            name="contentComment"
                            onEditorChange={(content, editor) => {
                              // setContent(content);
                              setFieldValue("contentComment", content);
                            }}
                            init={{
                              height: 150,
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
                          <div className="mt-1 text-end">
                            <Button
                              className="me-1"
                              type="primary"
                              htmlType="submit"
                            >
                              Save
                            </Button>
                            <Button htmlType="button">Cancel</Button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        {taskDetailModel.lstComment?.map((comment, index) => {
                          return (
                            <div
                              className="display-comment"
                              style={{ display: "flex" }}
                              key={index}
                            >
                              <div className="avatar">
                                <img
                                  src={comment.avatar}
                                  alt={comment.idUser}
                                />
                              </div>
                              <div>
                                <p
                                  className="fw-bold"
                                  style={{ marginBottom: 5 }}
                                >
                                  {comment.name}
                                </p>

                                <div>
                                  {visibleComment ? (
                                    <Editor
                                      name="contentComment"
                                      onEditorChange={(
                                        contentComment,
                                        editor
                                      ) => {
                                        // setContent(content);
                                        // setFieldValue(
                                        //   "contentComment",
                                        //   content
                                        // );
                                        setContentComment(contentComment);
                                      }}
                                      initialValue={comment.contentComment}
                                      init={{
                                        height: 150,
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
                                  ) : (
                                    <p style={{ marginBottom: 5 }}>
                                      {ReactHtmlParser(comment.commentContent)}
                                    </p>
                                  )}
                                  <button
                                    onClick={() => {
                                      setVisibleComment(!visibleComment);
                                    }}
                                    className="me-1"
                                    style={{
                                      color: "blue",
                                      border: "none",
                                      background: "none",
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <Popconfirm
                                    title="Are you sure to delete this comment?"
                                    onConfirm={() => {
                                      dispatch({
                                        type: DELETE_COMMENT_SAGA,
                                        idComment: comment.id,
                                      });
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <button
                                      style={{
                                        color: "red",
                                        border: "none",
                                        background: "none",
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </Popconfirm>
                                  {/* <button
                                    onClick={() => {
                                      dispatch({
                                        type: DELETE_COMMENT_SAGA,
                                        idComment: comment.id,
                                      });
                                    }}
                                    style={{
                                      color: "red",
                                      border: "none",
                                      background: "none",
                                    }}
                                  >
                                    Delete
                                  </button> */}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      className="custom-select"
                      name="statusId"
                      value={taskDetailModel.statusId}
                      onChange={(e) => {
                        // Cách 1: thay đổi với API riêng
                        // const action = {
                        //   type: UPDATE_TASK_STATUS_SAGA,
                        //   taskStatus: {
                        //     taskId: taskDetailModel.taskId,
                        //     statusId: e.target.value,
                        //     // gọi id của Project Detail hiện tại để tự động cập nhật lại trang
                        //     projectId: taskDetailModel.projectId,
                        //   },
                        // };
                        // // console.log("action", action);
                        // // console.log("Task Update", {
                        // //   taskId: taskDetailModel.taskId,
                        // //   statusId: e.target.value,
                        // // });
                        // dispatch(action);
                        // Cách 2: thay đổi với API chung bằng handleChang(e)
                        handleChange(e);
                      }}
                    >
                      {arrStatus.map((status, index) => {
                        return (
                          <option key={index} value={status.statusId}>
                            {status.statusName}
                          </option>
                        );
                      })}
                      {/* <option value={""}>SELECTED FOR DEVELOPMENT</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option> */}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {taskDetailModel.assigness?.map((member, index) => {
                        return (
                          <div className="col-6 mb-1">
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                width: "100%",
                                padding: "5%",
                                cursor: "pointer",
                              }}
                              className="item shadow-sm bg-light rounded"
                              onClick={() => {
                                // dispatch({
                                //   type: REMOVE_ASSIGNESS,
                                //   userId: member.id,
                                // });
                                dispatch({
                                  type: HANDLE_CHANGE_POST_API_SAGA,
                                  actionType: REMOVE_ASSIGNESS,
                                  userId: member.id,
                                });
                              }}
                            >
                              <div className="avatar">
                                <img src={member.avatar} alt={member.id} />
                              </div>
                              <p className="name mt-1 ms-1">
                                {member.name}
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 3 }}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      {/* <Popover
                        style={{ zIndex: "1000" }}
                        placement="right"
                        title={"Thêm thành viên"}
                        trigger="click"
                        content={() => {}}
                      > */}
                      {/* <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "none",
                          background: "none",
                          marginTop: "3%",
                          marginBottom: "3%",
                          color: "blue",
                        }}
                      >
                        <i className="fa fa-plus" style={{ marginRight: 5 }} />
                        <span>Add</span>
                      </button> */}

                      {/* </Popover> */}
                      {/* <Select
                        className="ms-2"
                        name="listUser"
                        options={projectDetail.members
                          ?.filter((mem) => {
                            let index = taskDetailModel.assigness?.findIndex(
                              (user) => user.id === mem.userId
                            );
                            if (index !== -1) {
                              return false;
                            }
                            return true;
                          })
                          .map((mem, index) => {
                            return { value: mem.userId, label: mem.name };
                          })}
                        optionFilterProp="label"
                        onSelect={(value) => {
                          if (value === "0") {
                            return;
                          }
                          let userSelect = projectDetail.members.find(
                            (mem) => mem.userId === value
                          );
                          userSelect = { ...userSelect, id: userSelect.userId };
                        }}
                      ></Select> */}

                      <select
                        className="form-select w-100 ms-2 mt-1 mb-1"
                        name="listUser"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value == "0") {
                            return;
                          }
                          let userSelect = projectDetail.members.find(
                            (mem) => mem.userId == value
                          );
                          userSelect = {
                            ...userSelect,
                            id: userSelect.userId,
                          };
                          // dispatch lên TaskReducer
                          dispatch({
                            type: HANDLE_CHANGE_POST_API_SAGA,
                            actionType: CHANGE_ASSIGNESS,
                            userSelect,
                          });
                          // dispatch({
                          //   type: CHANGE_ASSIGNESS,
                          //   userSelect,
                          // });
                        }}
                      >
                        {projectDetail.members
                          ?.filter((mem) => {
                            let index = taskDetailModel.assigness?.findIndex(
                              (user) => user.id === mem.userId
                            );
                            if (index !== -1) {
                              return false;
                            }
                            return true;
                          })
                          .map((mem, index) => {
                            return (
                              <option key={index} value={mem.userId}>
                                {mem.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      // value={taskDetailModel.priorityTask?.priorityId}
                      value={taskDetailModel.priorityId}
                      name="priorityId"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrPriority.map((level, index) => {
                        return (
                          <option key={index} value={level.priorityId}>
                            {level.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="text"
                      className="estimate-hours"
                      name="originalEstimate"
                      value={taskDetailModel.originalEstimate}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const AddCommentForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { taskDetailModel } = props;
    return {
      taskId: taskDetailModel.taskId,
      contentComment: "",
    };
  },
  // Custom sync validation
  validateSchema: Yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("Submit Value", values);
    props.dispatch({
      type: ADD_COMMENT_SAGA,
      newComment: values,
    });
  },

  displayName: "AddCommentForm",
})(ModalCyberBug);

const mapStateToProps = (state) => {
  return {
    taskDetailModel: state.TaskReducer.taskDetailModel,
  };
};

export default connect(mapStateToProps)(AddCommentForm);
