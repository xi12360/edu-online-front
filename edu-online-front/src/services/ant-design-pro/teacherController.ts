// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getLoginTeacher GET /api/teacher/get/login */
export async function getLoginTeacherUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseTeacherVO_>('/api/teacher/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** list GET /api/teacher/list */
export async function listUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListTeacherVO_>('/api/teacher/list', {
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

/** teacherLogin POST /api/teacher/login */
export async function teacherLoginUsingPOST(
  body: API.TeacherLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/api/teacher/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** logout GET /api/teacher/logout */
export async function logoutUsingGET2(options?: { [key: string]: any }) {
  return request<API.BaseResponseInt_>('/api/teacher/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** teacherModify POST /api/teacher/modify */
export async function teacherModifyUsingPOST(
  body: API.TeacherModifyRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/teacher/modify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** teacherRegister POST /api/teacher/register */
export async function teacherRegisterUsingPOST(
  body: API.TeacherRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/teacher/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** changeStatus GET /api/teacher/status */
export async function changeStatusUsingGET1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.changeStatusUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/teacher/status', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
