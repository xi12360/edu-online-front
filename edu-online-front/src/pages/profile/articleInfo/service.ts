import {request} from 'umi';
import {
  ArticleVO,
  forumCommentVO,
  Params,
  CommentParams,
  likeParams,
  favorParams, ForumReplyParams, ForumCommentVO, DelParams,ParamsClick
} from "@/pages/profile/articleInfo/data";
import {commentUserParams, CourseCommentVO, deleteParams, ReplyParams} from "@/pages/profile/CourseInfo/data";

export async function queryArticleInfoById(
  params: string,
): Promise<{
  data: {
    articleId?: string;
    articleType?: string;
    authorId?: string;
    clickNum?: number;
    commentNum?: number;
    img_url?: string;
    keyWord?: string;
    praiseNum?: number;
    publishTime?: string;
    source?: string;
    summary?: string;
    title?: string;
    content: string;
  }
}
> {
  return request('/api/forum/queryById', {
    params: {articleId: params},
  })
};


export async function queryCommentUsingGET(
  params: Params,
): Promise<{
  data: {
    totalNum: number;
    forumCommentVOList: ForumCommentVO[];
  }
}> {
  return request('/api/forum/queryComment', {
    params,
  });
}

export async function publishArticleComment(
  params: CommentParams,
): Promise<{
  data: number
}> {
  return request('/api/forum/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      articleId: params.articleId,
      comment: params.comment,
      userId: params.userId,
    },
  });
}

export async function likeArticleComment(
  params: likeParams,
): Promise<{
  data: number
}> {
  return request('/api/forum/like/comment', {
    params,
  });
}

export async function favorArticle(
  params: favorParams,
): Promise<{
  data: number
}> {
  return request('/api/forum/favor/article', {
    method: 'GET',
    params: {
      articleId: params.articleId,
      userId: params.userId,
    },
  });
}

export async function queryFavorArticle(
  params: favorParams,
): Promise<{
  data: number
}> {
  return request('/api/forum/queryFavor/article', {
    method: 'GET',
    params: {
      articleId: params.articleId,
      userId: params.userId,
    },
  });
}

export async function onForumAddReply(
  params: ForumReplyParams,
): Promise<{
  data: number
}> {
  return request('/api/forum/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      commentId: params.commentId,
      articleId: params.articleId,
      userId: params.userId,
      comment: params.comment,
      otherId: params.otherId,
    },
  });
}

export async function queryForumChildComments(
  params: commentUserParams,
): Promise<{
  data: {
    totalNum: number;
    forumCommentVOList: ForumCommentVO[];
  }
}> {
  return request('/api/forum/queryChildComment', {
    params: {commentId: params.commentId, userId: params.userId},
  });
}

export async function deleteArticleComment(
  params: commentUserParams,
): Promise<{
  data: number
}> {
  return request('/api/forum/del/comment', {
    method: 'DELETE',
    params: {
      commentId: params.commentId,
      userId: params.userId,
    },
  });
}

export async function deleteArticle(
  params: DelParams,
): Promise<{
  data: number
}> {
  return request('/api/forum/del/article', {
    method: 'DELETE',
    params: {
      articleId: params.articleId,
      userId: params.userId,
    },
  });
}

export async function clickArt(
  params:ParamsClick,
):Promise<{ data: number} >{
  return request('/api/forum/onclick', {
    params:{
      articleId:params.articleId,
      studentId:params.studentId,
    }
  });
}