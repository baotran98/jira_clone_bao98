import { isEmptyArray } from "formik";
import {
  call,
  put,
  delay,
  fork,
  take,
  takeEvery,
  takeLatest,
  select,
} from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { Notification } from "../../../util/notifications/Notification";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  CREATE_TASK,
  CREATE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_ASSIGNESS,
  UPDATE_TASK_SAGA,
  UPDATE_TASK_STATUS,
  UPDATE_TASK_STATUS_SAGA,
} from "../../types/CyberBugs/TaskConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

/* Chức năng CreateTask với Saga */
/* ---------8/7/2022--------- */
function* createTaskSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  // gọi API
  try {
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    yield put({
      type: "CLOSE_DRAWER",
    });
    Notification("success", "Create task successfuly !");
    console.log("Create task:", data);
  } catch (error) {
    Notification("error", "Create task fail !");
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

/* Chức năng TaskDetail với Saga */
/* ---------9/7/2022--------- */
function* getTaskDetailSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  // gọi API
  try {
    const { data, status } = yield call(() =>
      taskService.getTaskDetail(action.taskId)
    );
    yield put({
      type: GET_TASK_DETAIL,
      taskDetailModel: data.content,
    });
    console.log("Task detail", data);
  } catch (error) {
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

/* Chức năng UpdateTaskStatus với Saga */
/* ---------9/7/2022--------- */
function* updateTaskStatusSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  // gọi API
  const { taskStatus } = action;
  try {
    // Cập nhật API Status cho Task hiện tại (đang ở Modal)
    const { data, status } = yield call(() =>
      taskService.updateStatusTask(taskStatus)
    );
    // sau khi thành gọi lại putProjectDetail ở Saga để sắp xếp lại thông tin các task
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_DETAIL_PROJECT_SAGA",
        projectId: taskStatus.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskStatus.taskId,
      });
    }
    console.log("Update Status Task", data);
  } catch (error) {
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_TASK_STATUS_SAGA, updateTaskStatusSaga);
}

/* Chức năng UpdateTask với Saga */
/* ---------12/7/2022--------- */
function* updateTaskSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  // gọi API
  const { taskUpdate } = action;
  try {
    // Cập nhật API dữ liệu cho Task hiện tại (đang ở Modal)
    const { data, status } = yield call(() =>
      taskService.updateTask(taskUpdate)
    );
    // sau khi thành gọi lại ở Saga để sắp xếp lại thông tin các task
    if (status === STATUS_CODE.SUCCESS) {
      // yield put({
      //   type: "GET_DETAIL_PROJECT_SAGA",
      //   projectId: taskStatus.projectId,
      // });
      // yield put({
      //   type: GET_TASK_DETAIL_SAGA,
      //   taskId: taskStatus.taskId,
      // });
    }
    console.log("Update Task", data);
  } catch (error) {
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiUpdateTaskSaga() {
  yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}

/* Chức năng HandleChangePostApi với Saga */
/* Vừa thay đổi dữ liệu và gửi dữ liệu đc cập nhật cùng lúc */
/* ---------13/7/2022--------- */

function* handleChangePostApiSaga(action) {
  // gọi action làm thay đổi taskDetailModel
  // eslint-disable-next-line default-case
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      const { value, name } = action;
      yield put({
        type: CHANGE_TASK_MODAL,
        name,
        value,
      });
      break;
    case CHANGE_ASSIGNESS:
      const { userSelect } = action;
      yield put({
        type: CHANGE_ASSIGNESS,
        userSelect,
      });
      break;
    case REMOVE_ASSIGNESS:
      const { userId } = action;
      yield put({
        type: REMOVE_ASSIGNESS,
        userId,
      });
      break;
  }
  // lưu qua API updateTaskSaga
  // lấy dữ liệu từ state.taskDetailModel
  let { taskDetailModel } = yield select((state) => state.TaskReducer);
  console.log("Task sau khi thay doi", taskDetailModel);
  // biến đổi dữ liệu state.taskDetailModel thành dữ liệu API
  const listUserAsign = taskDetailModel.assigness?.map((user, index) => {
    return user.id;
  });
  const updateTaskAPI = { ...taskDetailModel, listUserAsign };
  try {
    const { data, status } = yield call(() =>
      taskService.updateTask(updateTaskAPI)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_DETAIL_PROJECT_SAGA",
        projectId: updateTaskAPI.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: updateTaskAPI.taskId,
      });
    }
    console.log("Task update", data);
  } catch (error) {
    console.log(error.response?.data);
  }
}
export function* theoDoiHandleChangePostApiSaga() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApiSaga);
}
