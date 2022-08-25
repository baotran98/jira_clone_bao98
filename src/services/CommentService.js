import { BaseService } from "./BaseService";

export class CommentService extends BaseService {
  constructor() {
    super();
  }
  // lấy tất cả bình luận từ API
  allComment = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };
  // thêm bình luận mới vào API
  addComment = (newComment) => {
    return this.post(`Comment/insertComment`, newComment);
  };
  // sửa bình luận từ API
  editComment = (commentId, commentContent) => {
    return this.put(
      `Comment/updateComment?id=${commentId}&contentComment=${commentContent}`
    );
  };
  // xóa bình luận khỏi API
  deleteComment = (idComment) => {
    return this.delete(`Comment/deleteComment?idComment=${idComment}`);
  };
}
export const commentService = new CommentService();
