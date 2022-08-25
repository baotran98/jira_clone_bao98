import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  constructor() {
    super();
  }
  // đăng ký user
  signupCyberBug = (newUser) => {
    return this.post(`Users/signup`, newUser);
  };
  // lấy user theo từ khóa
  getUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };
  // thêm user vào project
  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };
  // bỏ user khỏi project
  removeUserProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };
  // lấy user theo id project
  getUserProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };
  // lấy hết dữ liệu user từ API
  getAllUser = (keyword = "") => {
    if (keyword.trim() !== "") {
      return this.get(`/Users/getUser?keyword=${keyword}`);
    }
    return this.get(`Users/getUser`);
  };
  // sửa lại dữ liệu user
  editUser = (updateUser) => {
    return this.put(`Users/editUser`, updateUser);
  };
  // xóa user khỏi API
  deleteUser = (id) => {
    return this.delete(`Users/deleteUser?id=${id}`);
  };
}
export const userService = new UserService();
