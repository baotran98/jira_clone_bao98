import { takeLatest, call, put, delay } from "redux-saga/effects";
// import { cyberBugService } from "../../../services/CyberBugService";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";
import { Notification } from "../../../util/notifications/Notification";

// quản lý các action Saga
function* deleteProjectSaga(action) {
  // kiểm tra dữ liệu đã sửa có đc đưa lên Saga chưa
  console.log("Delete Project Action", action);
  // return;
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );
    // gọi API thành công thì dùng put để dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      // console.log(data);
      Notification("success", "Delete project successfuly !");
    } else {
      Notification("error", "Delete project fail !");
    }
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    // hoặc
    // yield call(getListProjectSaga);
    yield put({
      type: "CLOSE_DRAWER",
    });
    console.log("Delete Project", data);
  } catch (error) {
    Notification("error", "Delete project fail !");
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theodoiDeleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}
