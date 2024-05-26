export type tabKeyType = 'myFavorCourse' | 'myFavorArticle' | 'myArticle' | 'myComment' | 'myCourse';

export type CurrentUser = {
  nickName?: string;
  id?: string;
  imgUrl?: string;
  access?: string;
  phone?: string;
  credit: number;
};

export interface ItemData {
  itemId: string;
  itemName: string;
  imgUrl: string;
  ownerId: string;
  description: string;
  price: number;
  status: number;
  uploadedTime: string;
  ownerName: string;
  ownerUrl: string;
}

export type CommentData = {
  commentId: number;
  fromUserName: string;
  fromUserUrl: string;
  rank: number;
  content: string;
  commentTime: string;
};

export type OrderData = {
  id: string;
  item: ItemData;
  buyerId: string;
  sellerId: string;
  state: number;
  createTime: string; //下单时间
  deliveryTime: string; //交易时间
  payment: string; //付款信息
  delivery: string; //交付方式
  name: string; //收货人姓名
  tel: string; //收货人电话
  position: string; //交易地点
  remark: string; //订单备注
};

export type FavorParams = {
  current?: number;
  pageSize?: number;
  userId?: string;
  role?: number;
  // 其他已有属性
};

export type ArticleFavorParams = {
  current?: number;
  pageSize?: number;
  userId?: string;
  // 其他已有属性
};

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
  viewCount?: number;
};

export type ArticleVO = {
  articleId?: string;
  articleType?: string;
  authorId?: string;
  authorImgUrl?: string;
  authorName?: string;
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
