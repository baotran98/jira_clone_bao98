import { GET_ALL_PROJECT } from "../types/CyberBugs/ProjectConst";

const stateDefault = {
  projectList: [],
  showProject: [],
};
export const ProjectCyberBugReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT":
      state.projectList = action.projectList;
      return { ...state };
    case GET_ALL_PROJECT:
      return { ...state, showProject: action.showProject };
    default:
      return { ...state };
  }
};
