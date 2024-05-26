// @ts-ignore
/* eslint-disable */



import {request} from "umi";

/** getLoginStudent GET /api/admin/get/login */

export async function getLoginUserUsingGET(token?: string, options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/user/get/login', {
    method: 'GET',
    headers: {
      Authorization: token || "",
    },
    ...(options || {}),
  });
}

/** adminLogin POST /api/admin/login */
export async function adminLoginUsingPOST(body: API.Pinyin__, options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** logout GET /api/admin/logout */
export async function logoutUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseInt_>('/api/admin/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** sendSysMsg POST /api/admin/sysMsg */
export async function sendSysMsgUsingPOST(
  body: API.SendSysMsgRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/admin/sysMsg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
