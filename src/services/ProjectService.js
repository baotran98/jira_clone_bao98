import { BaseService } from "./BaseService";

export class ProjectService extends BaseService {
  constructor() {
    super();
  }

  allProject = () => {
    return this.get(`Project/getAllProject`);
  };
  deleteProject = (id) => {
    return this.delete(`/Project/deleteProject?projectId=${id}`);
  };
  detailProject = (projectId) => {
    return this.get(`Project/getProjectDetail?id=${projectId}`);
  };
}
export const projectService = new ProjectService();
