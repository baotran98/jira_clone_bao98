import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/settingSystem";

export const cyberBugService = {
  singinCyberBug: (userLogin) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },
  getAllProjectCategory: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
      method: "GET",
    });
  },
  createProject: (newProject) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProject`,
      method: "POST",
      data: newProject,
    });
  },
  createProjectAuth: (newProject) => {
    // console.log("Token", localStorage.getItem(TOKEN));
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, // JWT
    });
  },
  getListProject: () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) }, // gửi Token yêu cầu từ API để chứng minh User đã đăng nhập
    });
  },
  updateProject: (projectUpdate) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
};
