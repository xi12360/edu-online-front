export type Member = {
  avatar: string;
  name: string;
  id: string;
};

// export interface Params {
//   count: number;
// }

export type Params = {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: number;
  // 其他已有属性
};



export type ParamsType = {
  current?: number;
  pageSize?: number;
  type?: string;
  status?: number;
  // 其他已有属性
};

export interface ListItemDataType {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}

type ArticleVO = {
  articleId?: string;
  articleType?: string;
  authorId?: string;
  authorImgUrl?: string;
  authorName?:string;
  clickNum?: number;
  commentNum?: number;
  img_url?: string;
  keyWord?: string;
  praiseNum?: number;
  publishTime?: string;
  source?: string;
  summary?: string;
  title?: string;
  content?: string;
};
