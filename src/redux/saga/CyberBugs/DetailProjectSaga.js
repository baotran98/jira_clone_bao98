import { takeLatest, call, put, delay, select } from "redux-saga/effects";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

// quản lý các action Saga
function* getDetailProjectSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      projectService.detailProject(action.projectId)
    );
    // lấy dữ liệu thành công thì đưa dữ liệu lên Redux
    yield put({
      type: "PUT_DETAIL_PROJECT",
      projectDetail: data.content,
    });
    console.log("Data:", data);
  } catch (error) {
    console.log("404 not found !");
    // useHistory.push("/projectmanagement");
    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/projectmanagement");
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiGetDetailProjectSaga() {
  yield takeLatest("GET_DETAIL_PROJECT_SAGA", getDetailProjectSaga);
}
