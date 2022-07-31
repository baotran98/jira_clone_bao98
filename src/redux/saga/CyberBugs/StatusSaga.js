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
import { statusService } from "../../../services/StatusService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../../types/CyberBugs/StatusConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

/* Chức năng GetAllStatus với Saga */
/* ---------8/7/2022--------- */
function* getAllStatusSaga(action) {
  // gọi API
  try {
    const { data, status } = yield call(() =>
      statusService.getAllStatus(action)
    );
    // gọi API thành công thì dùng put để dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_STATUS,
        arrStatus: data.content,
      });
    }
    console.log("Get Status:", data);
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}
