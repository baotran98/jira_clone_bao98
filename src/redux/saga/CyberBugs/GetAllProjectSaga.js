import { takeLatest, call, put, delay } from "redux-saga/effects";
import { cyberBugService } from "../../../services/CyberBugService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

// quản lý các action Saga
function* getListProjectSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() => cyberBugService.getListProject());
    // gọi API thành công thì dùng put để dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_LIST_PROJECT",
        projectList: data.content,
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
export function* theoDoiGetAllProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}
