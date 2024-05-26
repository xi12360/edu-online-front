import {request} from "@@/plugin-request/request";

export interface StateType {
  status?: 1 | 0;
  currentAuthority?: 'user' | 'admin';
}

export type registerParams = {
  phone: string,
  password: string,
  checkPwd: string,
  email: string,
}

export async function teacherRegister(
  params: registerParams
): Promise<{ data: number }> {
  return request('/api/teacher/register', {
    method: 'POST',
    data: {
      phone: params.phone,
      password: params.password,
      checkPwd: params.checkPwd,
      email: params.email,
    },

  });
}
