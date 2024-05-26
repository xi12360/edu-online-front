export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type StudentVO = {
  id: string,
  phone: string,
  email: string,
  userName: string,
  sex: number,
  grade: string,
  createTime: Date,
  status: number,
  picImg: string,
  major: string,
}

export type StudentListVO = {
  studentVOList: StudentVO[],
  total: number,
}

export type PageParams = {
  current: number,
  pageSize: number,
}

export type changeStatusParams = {
  status: number,
  studentId: string,
}
