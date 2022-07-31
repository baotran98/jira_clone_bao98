import { takeLatest, call, put } from "redux-saga/effects";
import { cyberBugService } from "../../../services/CyberBugService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../types/CyberBugs/CyberBugConst";

// quản lý các action Saga
function* getAllProjectCateSaga(action) {
  // console.log("actionSaga", action);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      cyberBugService.getAllProjectCategory()
    );
    // gọi API thành công thì dùng put để dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });
    }
    // console.log("data", data);
  } catch (error) {
    console.log(error.response.data);
  }
}
//
export function* theoDoiGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCateSaga);
}
