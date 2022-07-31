import { GET_ALL_PROJECT_CATEGORY } from "../types/CyberBugs/CyberBugConst";

const stateDefault = {
  arrProjectCate: [],
};
export const ProjectCateReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY:
      state.arrProjectCate = action.data;
      return { ...state };

    default:
      return { ...state };
  }
};
