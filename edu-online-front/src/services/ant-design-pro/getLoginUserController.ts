// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getLoginStudent GET /api/user/get/login */
export async function getLoginStudentUsingGET1(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO_>('/api/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}
