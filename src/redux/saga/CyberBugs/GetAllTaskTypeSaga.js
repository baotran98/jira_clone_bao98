import { takeLatest, call, put, delay } from "redux-saga/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../types/CyberBugs/TaskConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

// quản lý các action Saga
function* getAllTaskTypeSaga(action) {
  try {
    const { data, status } = yield call(() => taskService.getTaskType());
    // gọi API thành công thì dùng put để dispatch lên reducer
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_TASK_TYPE,
        arrTaskType: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiGetAllTaskTypeSaga() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}
