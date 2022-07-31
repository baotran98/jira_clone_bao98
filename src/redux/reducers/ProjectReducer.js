const stateDefault = {
  projectEdit: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: "string",
  },
  projectDetail: {},
};

export const ProjectReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "EDIT_PROJECT":
      state.projectEdit = action.projectEditModel;
      return { ...state };
    case "PUT_DETAIL_PROJECT":
      state.projectDetail = action.projectDetail;
      return { ...state };
    default:
      return { ...state };
  }
};
