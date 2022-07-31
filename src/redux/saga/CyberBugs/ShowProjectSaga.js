import { takeLatest, call, put, delay } from "redux-saga/effects";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
} from "../../types/CyberBugs/ProjectConst";
import { GET_USER_PROJECT_BY_ID_SAGA } from "../../types/CyberBugs/UserConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

// quản lý các action Saga
function* getAllProjectSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() => projectService.allProject());
    // gọi API thành công thì dùng put để dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        showProject: data.content,
      });
      // cho mảng ProjectById mặc địch load giá trị lên
      yield put({
        type: GET_USER_PROJECT_BY_ID_SAGA,
        idProject: data.content[0]?.id,
      });
    }
    // console.log("List Project", data);
  } catch (error) {
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theodoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
