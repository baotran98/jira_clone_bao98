import { BaseService } from "./BaseService";

export class TaskService extends BaseService {
  constructor() {
    super();
  }
  getTaskType = () => {
    return this.get(`TaskType/getAll`);
  };
  createTask = (taskObject) => {
    return this.post(`Project/createTask`, taskObject);
  };
  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };
  updateStatusTask = (taskStatus) => {
    return this.put(`Project/updateStatus`, taskStatus);
  };
  updateTask = (taskUpdate) => {
    return this.post(`Project/updateTask`, taskUpdate);
  };
}
export const taskService = new TaskService();
