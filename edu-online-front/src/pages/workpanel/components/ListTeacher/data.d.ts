export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type TeacherVO = {
  id: string,
  name: string,
  education: string,
  major: string,
  picPath: string,
  status: number,
  createTime: Date,
  introduction: string,
  phone: string,
  email: string,
  sex: number,
}

export type TeacherListVO = {
  studentVOList: TeacherVO[],
  total: number,
}

export type PageParams = {
  current: number,
  pageSize: number,
}

export type changeStatusParams = {
  status: number,
  teacherId: string,
}
