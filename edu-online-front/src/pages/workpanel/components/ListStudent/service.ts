import { request } from 'umi';
import type {BasicListItemDataType, changeStatusParams, PageParams, StudentVO} from './data.d';

type ParamsType = {
  count?: number;
} & Partial<BasicListItemDataType>;

export async function queryFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/get_list', {
    params,
  });
}

export async function removeFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function listStudent(
  params: PageParams,
): Promise<{ data: { studentVOList: StudentVO[], total: number } }> {
  return request('/api/student/list', {
    method: 'GET',
    params: {
      current: params.current,
      pageSize: params.pageSize,
    },
  });
}

export async function changeStatus(
  params: changeStatusParams,
): Promise<{ data: number }> {
  return request('/api/student/status', {
    method: 'GET',
    params: {
      status: params.status,
      id: params.studentId,
    },
  });
}
