import { takeLatest, call, put, delay } from "redux-saga/effects";
import { cyberBugService } from "../../../services/CyberBugService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

// quản lý các action Saga
function* updateProjectSaga(action) {
  // kiểm tra dữ liệu đã sửa có đc đưa lên Saga chưa
  console.log("Update Project Action", action);
  // return;
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      cyberBugService.updateProject(action.projectUpdate)
    );
    // gọi API thành công thì dùng put để dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
    }
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    // hoặc
    // yield call(getListProjectSaga);
    yield put({
      type: "CLOSE_DRAWER",
    });
    console.log("Update Project", data);
  } catch (error) {
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theodoiUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}
