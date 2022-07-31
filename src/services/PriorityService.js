import { BaseService } from "./BaseService";

export class PriorityService extends BaseService {
  constructor() {
    super();
  }
  getPriority = () => {
    return this.get(`Priority/getAll`);
  };
}
export const priorityService = new PriorityService();
