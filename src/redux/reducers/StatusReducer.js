import { GET_ALL_STATUS } from "../types/CyberBugs/StatusConst";

const stateDefault = {
  arrStatus: [],
};

export const StatusReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_STATUS:
      return { ...state, arrStatus: action.arrStatus };

    default:
      return { ...state };
  }
};
