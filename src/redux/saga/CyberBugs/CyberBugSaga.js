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
import { cyberBugService } from "../../../services/CyberBugService";
import { userService } from "../../../services/UserService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import { Notification } from "../../../util/notifications/Notification";
// import { history } from "../../../util/libs/history";
import {
  LOCAL_STORAGE_LOGIN,
  USER_SIGNIN_API,
  USER_SIGNUP_API,
} from "../../types/CyberBugs/CyberBugConst";
import {
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  GET_USER_PROJECT_BY_ID,
  GET_USER_PROJECT_BY_ID_SAGA,
} from "../../types/CyberBugs/UserConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../types/LoadingConst";

// quản lý các action Saga
function* SigninSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      cyberBugService.singinCyberBug(action.userLogin)
    );
    // lưu vào localStorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    console.log(data);
    yield put({
      type: LOCAL_STORAGE_LOGIN,
      userLogin: data.content,
    });
    // dùng History và hàm push để chuyển trang cần đến sau khi đăng nhập
    // action.userLogin.history.push("/home");
    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/");
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, SigninSaga);
}

/* Chức năng signupUser với Saga */
/* -----------20/7/2022------------ */
function* signUpSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      userService.signupCyberBug(action.newUser)
    );
    // dùng History và hàm push để chuyển trang cần đến sau khi đăng ký
    // action.userLogin.history.push("/login");
    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/login");
    console.log("Register", data);
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiSignUpSaga() {
  yield takeLatest(USER_SIGNUP_API, signUpSaga);
}

/* Chức năng GetUser với Saga */
/* -----------2/7/2022------------ */
function* getUserSaga(action) {
  // gọi API
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );
    yield put({
      type: "GET_USER_SEARCH",
      listUserSearch: data.content,
    });
    console.log("Data", data);
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_SAGA", getUserSaga);
}

/* Chức năng AddUser với Saga */
/* ---------2/7/2022--------- */
function* assignUserSaga(action) {
  // gọi API
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    console.log("Data:", data);
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiAssignUserSaga() {
  yield takeLatest("ADD_USER_SAGA", assignUserSaga);
}

/* Chức năng RemoveUser với Saga */
/* ---------2/7/2022--------- */
function* removeUserSaga(action) {
  // gọi API
  try {
    const { data, status } = yield call(() =>
      userService.removeUserProject(action.userProject)
    );
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    console.log("Data:", data);
  } catch (error) {
    console.log(error.response.data);
  }
}
export function* theoDoiRemoveUser() {
  yield takeLatest("REMOVE_USER_PROJECT_SAGA", removeUserSaga);
}

/* Chức năng GetUserByProjectId với Saga */
/* ---------8/7/2022--------- */
function* getUserByProjectId(action) {
  // gọi API
  try {
    const { data, status } = yield call(() =>
      userService.getUserProjectId(action.idProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_PROJECT_BY_ID,
        arrUser: data.content,
      });
    }
    console.log("GetUserProjectByID", data);
  } catch (error) {
    console.log(error.response?.data);
    if (error.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_PROJECT_BY_ID,
        arrUser: [],
      });
    }
  }
}
export function* theoDoiGetUserByProjectId() {
  yield takeLatest(GET_USER_PROJECT_BY_ID_SAGA, getUserByProjectId);
}

/* Chức năng getAllUser với Saga */
/* ---------20/7/2022--------- */
function* getAllUserSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() => userService.getAllUser(action));
    yield put({
      type: GET_ALL_USER,
      userList: data.content,
    });
    console.log("Show user", data);
  } catch (error) {
    console.log(error.response?.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiGetAllUserSaga() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUserSaga);
}

/* Chức năng editUser với Saga */
/* ---------20/7/2022--------- */
function* editUserSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      userService.editUser(action.updateUser)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USER_SAGA,
      });
      yield put({
        type: "CLOSE_DRAWER",
      });
      Notification("success", "Edit user successfuly !");
    }
    console.log("Edit user", data);
  } catch (error) {
    Notification("error", "Edit user fail !");
    console.log(error.response?.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiEditUserSaga() {
  yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}

/* Chức năng deleteUser với Saga */
/* ---------20/7/2022--------- */
function* deleteUserSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  // gọi API
  try {
    const { data, status } = yield call(() =>
      userService.deleteUser(action.id)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USER_SAGA,
      });
      Notification("success", "Delete user successfuly !");
    }
    console.log("Delete user", data);
  } catch (error) {
    Notification("error", "Delete user fail !");
    console.log(error.response?.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}
export function* theoDoiDeleteUserSaga() {
  yield takeLatest(DELETE_USER_SAGA, deleteUserSaga);
}
