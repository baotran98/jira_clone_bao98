import { BaseService } from "./BaseService";

export class CommentService extends BaseService {
  constructor() {
    super();
  }

  allComment = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };
  addComment = (newComment) => {
    return this.post(`Comment/insertComment`, newComment);
  };
  editComment = (id, contentCom) => {
    return this.put(
      `Comment/updateComment?id=${id}&contentComment=${contentCom}`
    );
  };
  deleteComment = (idComment) => {
    return this.delete(`Comment/deleteComment?idComment=${idComment}`);
  };
}
export const commentService = new CommentService();
