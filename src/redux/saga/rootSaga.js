import { all } from "redux-saga/effects";

import * as CyberBugSaga from "./CyberBugs/CyberBugSaga";
import * as ProjectCategory from "./CyberBugs/ProjectCategorySaga";
import * as GetAllProject from "./CyberBugs/GetAllProjectSaga";
import * as CreateProject from "./CyberBugs/CreateProjectSaga";
import * as UpdateProject from "./CyberBugs/UpdateProjectSaga";
import * as DeleteProject from "./CyberBugs/DeleteProjectSaga";
import * as DetailProject from "./CyberBugs/DetailProjectSaga";
import * as ShowProject from "./CyberBugs/ShowProjectSaga";
import * as TaskType from "./CyberBugs/GetAllTaskTypeSaga";
import * as Priority from "./CyberBugs/GetAllPrioritySaga";
import * as Task from "./CyberBugs/TaskSaga";
import * as StatusSaga from "./CyberBugs/StatusSaga";
import * as CommentSaga from "./CyberBugs/CommentSaga";

export function* rootSaga() {
  yield all([
    // theo dõi các action Saga CyberBugs
    /*---------User--------------*/
    CyberBugSaga.theoDoiSignin(),
    CyberBugSaga.theoDoiSignUpSaga(),
    CyberBugSaga.theoDoiGetUser(),
    CyberBugSaga.theoDoiAssignUserSaga(),
    CyberBugSaga.theoDoiRemoveUser(),
    CyberBugSaga.theoDoiGetUserByProjectId(),
    CyberBugSaga.theoDoiGetAllUserSaga(),
    CyberBugSaga.theoDoiEditUserSaga(),
    CyberBugSaga.theoDoiDeleteUserSaga(),
    /*---------Project--------------*/
    ProjectCategory.theoDoiGetAllProjectCategory(),
    GetAllProject.theoDoiGetAllProjectSaga(),
    CreateProject.theodoiCreateProjectSaga(),
    UpdateProject.theodoiUpdateProjectSaga(),
    DeleteProject.theodoiDeleteProjectSaga(),
    DetailProject.theoDoiGetDetailProjectSaga(),
    ShowProject.theodoiGetAllProjectSaga(),
    /*---------Task Type--------------*/
    TaskType.theoDoiGetAllTaskTypeSaga(),
    /*---------Priority--------------*/
    Priority.theoDoiGetAllPrioritySaga(),
    /*-------------Task--------------*/
    Task.theoDoiCreateTaskSaga(),
    Task.theoDoiGetTaskDetailSaga(),
    Task.theoDoiUpdateTaskStatusSaga(),
    Task.theoDoiUpdateTaskSaga(),
    Task.theoDoiHandleChangePostApiSaga(),
    /*-------------Status--------------*/
    StatusSaga.theoDoiGetAllStatusSaga(),
    /*-------------Comment--------------*/
    CommentSaga.theoDoiGetAllCommentSaga(),
    CommentSaga.theoDoiAddCommentSaga(),
    CommentSaga.theoDoiEditCommentSaga(),
    CommentSaga.theoDoiDeleteCommentSaga(),
  ]);
}
