// sendVerifiedCode
import {request} from "@@/plugin-request/request";
import {MsgSystemVO} from "@/components/RightContent/data";

export type Params = {
  phone: string;
}

export type CodeLoginParams = {
  phone: string;
  password: string;
}

export type ModifyParams = {
  name: string;
  phone: string;
  imgUrl: string;
  sex: number;
  major: string;
  email: string;
  id: string;
}

export async function sendStudentVerifiedCode(
  params: string,
): Promise<{ data: number }> {
  return request('/api/student/sendVerifiedCode', {
    method: 'GET',
    params: {phone: params},
  });
}

export async function sendTeacherVerifiedCode(
  params: string,
): Promise<{ data: number }> {
  return request('/api/teacher/sendVerifiedCode', {
    method: 'GET',
    params: {phone: params},
  });
}

export async function teacherVerifiedCodeLogin(
  params: CodeLoginParams,
): Promise<API.BaseResponseString_> {
  return request('/api/teacher/login/verifiedCode', {
    method: 'POST',
    data: {
      phone: params.phone,
      code: params.password,
    },
  });
}
export async function studentVerifiedCodeLogin(
  params: CodeLoginParams,
): Promise<API.BaseResponseString_> {
  return request('/api/student/login/verifiedCode', {
    method: 'POST',
    data: {
      phone: params.phone,
      code: params.password,
    },
  });
}

export async function studentModify(
  params: ModifyParams,
): Promise<{ data: number }> {
  return request('/api/student/modify', {
    method: 'POST',
    data: {
      id: params.id,
      imgUrl: params.imgUrl,
      phone: params.phone,
      name: params.name,
      major: params.major,
      email: params.email,
      sex: params.sex,
    },
  });
}


export async function teacherModify(
  params: ModifyParams,
): Promise<{ data: number }> {
  return request('/api/teacher/modify', {
    method: 'POST',
    data: {
      id: params.id,
      imgUrl: params.imgUrl,
      phone: params.phone,
      name: params.name,
      major: params.major,
      email: params.email,
      sex: params.sex,
    },
  });
}

export async function queryUserMsgNum(
  params: string
): Promise<{ data: number }> {
  return request('/api/sysMsg/getNum', {
    params: {userId: params},
    method: 'GET'
  });
}
