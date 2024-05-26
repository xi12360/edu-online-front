//这里是数据层
export type TagType = {
  key: string;
  label: string;
};

export type GeographicItemType = {
  name: string;
  id: string;
};

export type GeographicType = {
  province: GeographicItemType;
  city: GeographicItemType;
};

export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};

export type CurrentUser = {
  nickName?: string;
  id?: string;
  imgUrl?: string;
  access?: string;
  phone?: string;
  credit: number;
  password?: string;
  sex?: number;
  major?: string;
  grade?: string;
  email?: string;
};

