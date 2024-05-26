// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** comment POST /api/forum/comment */
export async function commentUsingPOST1(
  body: API.ForumCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/forum/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delArticle DELETE /api/forum/del/article */
export async function delArticleUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delArticleUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/forum/del/article', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** delComment DELETE /api/forum/del/comment */
export async function delCommentUsingDELETE1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delCommentUsingDELETE1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/forum/del/comment', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** likeArticle GET /api/forum/like/article */
export async function likeArticleUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.likeArticleUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/forum/like/article', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** likeComment GET /api/forum/like/comment */
export async function likeCommentUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.likeCommentUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/forum/like/comment', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listMostClickArticle DELETE /api/forum/mostClickArt */
export async function listMostClickArticleUsingDELETE(options?: { [key: string]: any }) {
  return request<API.BaseResponseListArticleClickVO_>('/api/forum/mostClickArt', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** listMostFavorArticle DELETE /api/forum/mostFavorArt */
export async function listMostFavorArticleUsingDELETE(options?: { [key: string]: any }) {
  return request<API.BaseResponseListArticleFavorVO_>('/api/forum/mostFavorArt', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** publish POST /api/forum/publish */
export async function publishUsingPOST(
  body: API.ArticlePublishRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/forum/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** queryComment GET /api/forum/queryComment */
export async function queryCommentUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCommentUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListForumCommentVO_>('/api/forum/queryComment', {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** replyComment POST /api/forum/reply */
export async function replyCommentUsingPOST1(
  body: API.ReplyForumCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/forum/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
