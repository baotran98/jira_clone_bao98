import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_ALL_TASK_TYPE,
  GET_TASK_DETAIL,
  REMOVE_ASSIGNESS,
  UPDATE_TASK,
} from "../types/CyberBugs/TaskConst";

const stateDefault = {
  arrTaskType: [],
  taskDetailModel: {
    priorityTask: {
      priorityId: 1,
      priority: "High",
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug",
    },
    assigness: [
      {
        id: 2116,
        avatar: "https://ui-avatars.com/api/?name=bảo",
        name: "bảo",
        alias: "bao",
      },
      {
        id: 850,
        avatar: "https://ui-avatars.com/api/?name=AnhHoang",
        name: "AnhHoang",
        alias: "thangtv",
      },
      {
        id: 1939,
        avatar: "https://ui-avatars.com/api/?name=Tien Hung",
        name: "Tien Hung",
        alias: "tien-hung",
      },
    ],
    lstComment: [],
    taskId: 4951,
    taskName: "bug 11/7",
    alias: "bug-11-7",
    description: "<p><em><strong>Fix nhanh</strong></em></p>",
    statusId: "3",
    originalEstimate: 20,
    timeTrackingSpent: 10,
    timeTrackingRemaining: 20,
    typeId: 1,
    priorityId: 1,
    projectId: 6591,
  },
};

export const TaskReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_TASK_TYPE:
      return { ...state, arrTaskType: action.arrTaskType };

    case GET_TASK_DETAIL:
      return { ...state, taskDetailModel: action.taskDetailModel };
    case CHANGE_TASK_MODAL:
      const { name, value } = action;
      console.log("Change", state.taskDetailModel);
      return {
        ...state,
        taskDetailModel: { ...state.taskDetailModel, [name]: value },
      };
    case CHANGE_ASSIGNESS:
      state.taskDetailModel.assigness = [
        ...state.taskDetailModel.assigness,
        action.userSelect,
      ];
      return { ...state };
    case REMOVE_ASSIGNESS:
      state.taskDetailModel.assigness = [
        ...state.taskDetailModel.assigness.filter(
          (user) => user.id !== action.userId
        ),
      ];
      return { ...state };
    case UPDATE_TASK:
      return { ...state };
    default:
      return { ...state };
  }
};
