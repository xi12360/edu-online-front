// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getMsgSystem GET /api/sysMsg/get */
export async function getMsgSystemUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getMsgSystemUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListMsgSystemVO_>('/api/sysMsg/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
