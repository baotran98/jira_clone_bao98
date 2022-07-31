import { takeLatest, call, put, delay } from "redux-saga/effects";
import { priorityService } from "../../../services/PriorityService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
} from "../../types/CyberBugs/PriorityConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

// quản lý các action Saga
function* getAllPrioritySaga(action) {
  try {
    const { data, status } = yield call(() => priorityService.getPriority());
    // gọi API thành công thì dùng put để dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PRIORITY,
        arrPriority: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiGetAllPrioritySaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}
