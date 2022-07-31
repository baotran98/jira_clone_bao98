import { takeLatest, call, put, delay } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { Notification } from "../../../util/notifications/Notification";
import {
  ADD_COMMENT_SAGA,
  DELETE_COMMENT_SAGA,
  EDIT_COMMENT_SAGA,
  GET_ALL_COMMENT_SAGA,
} from "../../types/CyberBugs/CommentConst";
import {
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
} from "../../types/CyberBugs/TaskConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

// quản lý các action Saga
function* getAllCommentSaga(action) {
  try {
    const { data, status } = yield call(() =>
      commentService.allComment(action.taskId)
    );
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiGetAllCommentSaga() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllCommentSaga);
}

/* Chức năng AddComment với Saga */
function* addCommentSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      commentService.addComment(action.newComment)
    );
    const { newComment } = action;
    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: newComment.taskId,
    });
    console.log("Add comment", data);
  } catch (error) {
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiAddCommentSaga() {
  yield takeLatest(ADD_COMMENT_SAGA, addCommentSaga);
}

/* Chức năng EditComment với Saga */
function* editCommentSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      commentService.editComment(action.id)
    );
    const { id } = action;
    yield put({
      type: GET_TASK_DETAIL_SAGA,
      taskId: id.taskId,
    });
    console.log("Edit comment", data);
  } catch (error) {
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiEditCommentSaga() {
  yield takeLatest(EDIT_COMMENT_SAGA, editCommentSaga);
}

/* Chức năng deleteComment với Saga */
function* deleteCommentSaga(action) {
  // hiển thị Loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      commentService.deleteComment(action.idComment)
    );
    if (status === STATUS_CODE.SUCCESS) {
      Notification("success", "Delete comment successfuly !");
    }
    // const { idComment } = action;
    // yield put({
    //   type: GET_ALL_COMMENT_SAGA,
    //   taskId: idComment.taskId,
    // });
    console.log("Delete comment", data);
  } catch (error) {
    Notification("error", "Delete comment fail !");
    console.log(error.response.data);
  }
  // tắt Loading
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
