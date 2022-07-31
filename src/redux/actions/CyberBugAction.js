import { USER_SIGNIN_API } from "../types/CyberBugs/CyberBugConst";

export const singinCyberBugAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
