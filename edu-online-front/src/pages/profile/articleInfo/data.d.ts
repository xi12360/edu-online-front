
type ArticleVO = {
  articleId?: string;
  articleType?: string;
  authorId?: string;
  authorImgUrl?: string;
  authorName?: string;
  clickNum?: number;
  commentNum?: number;
  img_url?: string;
  keyWord?: string;
  praiseNum?: number;
  publishTime?: string;
  source?: string;
  summary?: string;
  title?: string;
  content?: string;
};

type forumCommentVO={
  addTime: string;
  articleId: string;
  comment: string;
  commentId: string;
  liked: number;
  userId: string;
  userImgUrl: string;
  userName: string;
  replyCount: number;
  userName: string;
  userImgUrl: string;
}

export type Params = {
  articleId: string,
  userId?: string,
  current: number,
  pageSize: number,
}

export type DelParams = {
  articleId: string,
  userId: string,
}

export type CommentParams = {
  articleId: string,
  comment: string,
  userId: string,
}
export type likeParams = {
  commentId: string,
  userId: string,
}

export type favorParams = {
  userId: string,
  articleId: string,
}

export type ForumCommentVO = {
  commentId: string;
  articleId: string;
  userId: string;
  userName: string;
  userImgUrl: string;
  pCommentId: string;
  comment: string;
  addTime: Date;
  otherId: string;
  praiseCount: number;
  replyCount: number;
  liked: boolean;
}

export type ForumReplyParams = {
  commentId: string
  articleId: string
  userId: string
  comment: string
  otherId: string
}

export type ParamsClick = {
  articleId: string;
  studentId: string;
};