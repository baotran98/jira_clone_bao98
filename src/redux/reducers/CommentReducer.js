import { GET_ALL_COMMENT } from "../types/CyberBugs/CommentConst";

const stateDefault = {
  listComment: [],
};

export const CommentReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT:
      return { ...state };

    default:
      return { ...state };
  }
};
