import { GET_ALL_PRIORITY } from "../types/CyberBugs/PriorityConst";

const stateDefault = {
  arrPriority: [],
};

export const PriorityReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PRIORITY:
      return { ...state, arrPriority: action.arrPriority };

    default:
      return { ...state };
  }
};
