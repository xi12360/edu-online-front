export type tabKeyType = '1' | '2';
export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type Params = {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: number;
  // 其他已有属性
};



export interface ItemData {
  itemId: string;
  itemName: string;
  imgUrl: string;
  ownerId: string;
  description: string;
  price: number;
  status: number;
  uploadTime: string;
  ownerName: string;
  ownerUrl: string;
}

export type CourseVO = {
  buyCount?: number;
  courseId?: string;
  courseName?: string;
  currentPrice?: number;
  endTime?: string;
  lessonNum?: string;
  logo?: string;
  sourcePrice?: number;
  status?: number;
  subjectLink?: string;
  teacherId?: string;
  title?: string;
  updateTime?: string;
  clickNum?: number;
};

export type CurrentUser = {
  nickName?: string;
  id?: string;
  imgUrl?: string;
  access?: string;
  phone?: string;
  credit: number;
};
