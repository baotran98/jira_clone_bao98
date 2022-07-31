import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";
// MiddleWare Saga
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./saga/rootSaga";
// nhúng Reducer

import LoadingReducer from "./reducers/LoadingReducer";
import { ModalReducer } from "./reducers/ModalReducer";
import { HistoryReducer } from "./reducers/HistoryReducer";
import { UserReducer } from "./reducers/UserReducer";
import { ProjectCateReducer } from "./reducers/ProjectCateReducer";
import { ProjectCyberBugReducer } from "./reducers/ProjectCyberBugReducer";
import { DrawerReducer } from "./reducers/DrawerReducer";
import { ProjectReducer } from "./reducers/ProjectReducer";
import { TaskReducer } from "./reducers/TaskReducer";
import { PriorityReducer } from "./reducers/PriorityReducer";
import { StatusReducer } from "./reducers/StatusReducer";
import { CommentReducer } from "./reducers/CommentReducer";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  // khai báo reducer
  LoadingReducer,
  ModalReducer,
  HistoryReducer,
  UserReducer,
  ProjectCateReducer,
  ProjectCyberBugReducer,
  DrawerReducer,
  ProjectReducer,
  TaskReducer,
  PriorityReducer,
  StatusReducer,
  CommentReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);
// Gọi saga
middleWareSaga.run(rootSaga);

export default store;
