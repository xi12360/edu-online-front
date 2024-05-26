// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** auditCourse GET /api/course/audit */
export async function auditCourseUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.auditCourseUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/course/audit', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** buyCourse GET /api/course/buy */
export async function buyCourseUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.buyCourseUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/course/buy', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** comment POST /api/course/comment */
export async function commentUsingPOST(
  body: API.CourseCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/course/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** delComment DELETE /api/course/del/comment */
export async function delCommentUsingDELETE(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.delCommentUsingDELETEParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/course/del/comment', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** dropCourse GET /api/course/drop */
export async function dropCourseUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dropCourseUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/course/drop', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getTest GET /api/course/get/test */
export async function getTestUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTestUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCourseTestVO_>('/api/course/get/test', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listAudit GET /api/course/listAudit */
export async function listAuditUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listAuditUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCourseVO_>('/api/course/listAudit', {
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

/** queryCourseLike GET /api/course/query */
export async function queryCourseLikeUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCourseLikeUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.CourseListVO>('/api/course/query', {
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

/** queryComment GET /api/course/queryComment */
export async function queryCommentUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.queryCommentUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListCourseCommentVO_>('/api/course/queryComment', {
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

/** replyComment POST /api/course/reply */
export async function replyCommentUsingPOST(
  body: API.ReplyCourseCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/course/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** uploadCourse POST /api/course/upload */
export async function uploadCourseUsingPOST(
  body: API.CourseUploadRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/course/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** uploadTest POST /api/course/upload/test */
export async function uploadTestUsingPOST(
  body: API.CourseTestUploadRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/course/upload/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
