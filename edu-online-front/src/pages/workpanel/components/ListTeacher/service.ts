import { request } from 'umi';
import type {changeStatusParams, PageParams, TeacherVO} from './data.d';



export async function listTeacher(
  params: PageParams,
): Promise<{ data: { teacherVOList: TeacherVO[], total: number } }> {
  return request('/api/teacher/list', {
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
  return request('/api/teacher/status', {
    method: 'GET',
    params: {
      status: params.status,
      id: params.teacherId,
    },
  });
}
