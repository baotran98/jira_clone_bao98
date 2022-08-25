import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  GET_TASK_DETAIL_SAGA,
  UPDATE_TASK_STATUS_SAGA,
} from "../../../redux/types/CyberBugs/TaskConst";

export default function ContentMain(props) {
  const { projectDetail } = props;
  const dispatch = useDispatch();
  const handleDragEnd = (result) => {
    // console.log("Result", result);
    // chuyển Chuỗi về Object thông qua parse
    let { projectId, taskId } = JSON.parse(result.draggableId); // lấy ra chuỗi sau mỗi lần draggableId
    // console.log({ projectId, taskId });
    let { source, destination } = result;
    if (!result.destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    // gọi API cập nhật lại Status
    dispatch({
      type: UPDATE_TASK_STATUS_SAGA,
      taskStatus: {
        taskId: taskId,
        statusId: destination.droppableId,
        projectId: projectId,
      },
    });
  };
  const renderTask = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((listTask, index) => {
          return (
            <Droppable droppableId={listTask.statusId} key={index}>
              {(provided) => {
                return (
                  <div
                    // ref={provided.innerRef}
                    // {...provided.droppableProps}
                    key={index}
                    className="card pb-3 animate__animated animate__fadeIn"
                    style={{ width: "17rem", height: "auto" }}
                  >
                    <div className="card-header">{listTask.statusName}</div>
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="list-group list-group-flush"
                    >
                      {listTask.lstTaskDeTail?.map((task, index) => {
                        return (
                          <Draggable
                            // draggableId chỉ nhận Chuỗi nên cần Stringify
                            draggableId={JSON.stringify({
                              projectId: task.projectId,
                              taskId: task.taskId,
                            })}
                            key={task.taskId.toString()}
                            index={index}
                          >
                            {(provided) => {
                              return (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={index}
                                  className="list-group-item shadow-sm bg-body rounded"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  // style={{ cursor: "pointer" }} * Ảnh hưởng đến thư viện Drag Drop
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DETAIL_SAGA,
                                      taskId: task.taskId,
                                    });
                                  }}
                                >
                                  <p className="fw-bold">{task.taskName}</p>
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      {/* <i className="fa fa-bookmark" />
                                        <i className="fa fa-arrow-up" /> */}
                                      <span className="fw-semibold">
                                        {task.priorityTask.priority}
                                      </span>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        {task.assigness?.map(
                                          (member, index) => {
                                            return (
                                              <div
                                                className="avatar"
                                                key={index}
                                              >
                                                <img
                                                  src={member.avatar}
                                                  alt={member.id}
                                                />
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
    // return
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      {renderTask()}
    </div>
  );
}
