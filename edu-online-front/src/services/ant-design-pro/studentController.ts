// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getLoginStudent GET /api/student/get/login */
export async function getLoginStudentUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseStudentVO_>('/api/student/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** list GET /api/student/list */
export async function listUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListStudentVO_>('/api/student/list', {
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

/** studentLogin POST /api/student/login */
export async function studentLoginUsingPOST(
  body: API.StudentLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/student/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** studentLoginUseVerifiedCode POST /api/student/login/verifiedCode */
export async function studentLoginUseVerifiedCodeUsingPOST(
  body: API.StudentLoginUseVerifiedCodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/student/login/verifiedCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** logout GET /api/student/logout */
export async function logoutUsingGET1(options?: { [key: string]: any }) {
  return request<API.BaseResponseInt_>('/api/student/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** studentModify POST /api/student/modify */
export async function studentModifyUsingPOST(
  body: API.StudentModifyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/student/modify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** studentRegister POST /api/student/register */
export async function studentRegisterUsingPOST(
  body: API.StudentRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/student/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** studentSendVerifiedCode POST /api/student/sendVerifiedCode */
export async function studentSendVerifiedCodeUsingPOST(
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/student/sendVerifiedCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** changeStatus GET /api/student/status */
export async function changeStatusUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeStatusUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/student/status', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
