import { request } from 'umi';
import type { Params, ItemData } from './data';

export async function queryList(): Promise<{ data: { totalNum: number; list: ItemData[] } }> {
  return request('/api/item/list');
}

export async function queryCourseLikeUsingGET(
  params: Params,
): Promise<{ data: { totalNum: number; courseVOList: API.CourseVO[] } }> {
  return request('/api/course/query', {
    params,
  });
}
