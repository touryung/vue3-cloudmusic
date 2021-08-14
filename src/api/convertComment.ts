import { COMMENT_LIMIT } from "@/utils/constant";
import { formatDate } from "@/utils/utils";
import { AxiosResponse } from "axios";

export const convertComment = (res: AxiosResponse) => {
  let { hotComments, comments } = res.data;
  const { total } = res.data;

  // 转换热门评论
  if (hotComments && hotComments.length > 0) {
    hotComments = hotComments.map((comment: any) => {
      let beReplied: CommentReplied[] = [];
      // 转换当前热门评论回复
      if (comment.beReplied.length > 0) {
        beReplied = comment.beReplied.map((item: any) => ({
          id: item.user.userId,
          name: item.user.nickname,
          commentId: item.commentId,
          avatarUrl: item.user.avatarUrl,
          time: formatDate(item.time, "YYYY年MM月dd日 hh:mm"),
          likedCount: item.likedCount,
          content: item.content,
        }));
      }

      return {
        id: comment.user.userId,
        name: comment.user.nickname,
        commentId: comment.commentId,
        avatarUrl: comment.user.avatarUrl,
        time: formatDate(comment.time, "YYYY年MM月dd日 hh:mm"),
        likedCount: comment.likedCount,
        content: comment.content,
        beReplied,
      };
    });
  }
  // 转换普通评论
  comments = comments.map((comment: any) => {
    let beReplied: CommentReplied[] = [];
    // 转换当前普通评论回复
    if (comment.beReplied.length > 0) {
      beReplied = comment.beReplied.map((item: any) => ({
        id: item.user.userId,
        name: item.user.nickname,
        commentId: item.commentId,
        avatarUrl: item.user.avatarUrl,
        time: formatDate(item.time, "YYYY年MM月dd日 hh:mm"),
        likedCount: item.likedCount,
        content: item.content,
      }));
    }

    return {
      id: comment.user.userId,
      name: comment.user.nickname,
      commentId: comment.commentId,
      avatarUrl: comment.user.avatarUrl,
      time: formatDate(comment.time, "YYYY年MM月dd日 hh:mm"),
      likedCount: comment.likedCount,
      content: comment.content,
      beReplied,
    };
  });

  return {
    hotComments: hotComments || [],
    comments,
    total,
    pageCount:
      total % COMMENT_LIMIT
        ? Math.floor(total / COMMENT_LIMIT) + 1
        : total / COMMENT_LIMIT,
  };
};
