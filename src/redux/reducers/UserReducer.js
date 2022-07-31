import { USER_LOGIN } from "../../util/constants/settingSystem";
import { LOCAL_STORAGE_LOGIN } from "../types/CyberBugs/CyberBugConst";
import {
  EDIT_USER,
  GET_ALL_USER,
  GET_USER_PROJECT_BY_ID,
} from "../types/CyberBugs/UserConst";

let userLoginCookie = {};

if (localStorage.getItem(USER_LOGIN)) {
  userLoginCookie = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: userLoginCookie,
  userSearch: [],
  arrUser: [],
  userList: [],
  userEdit: [],
};

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOCAL_STORAGE_LOGIN:
      state.userLogin = action.userLogin;
      return { ...state };
    case "GET_USER_SEARCH":
      state.userSearch = action.listUserSearch;
      return { ...state };
    case GET_USER_PROJECT_BY_ID:
      return { ...state, arrUser: action.arrUser };
    case GET_ALL_USER:
      return { ...state, userList: action.userList };
    case EDIT_USER:
      return { ...state, userEdit: action.userEdit };
    default:
      return { ...state };
  }
};
