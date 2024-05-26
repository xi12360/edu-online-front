export type CourseCommentVO = {
  commentId: string;
  courseId: string;
  userId: string;
  userName: string;
  userImgUrl: string;
  pCommentId: string;
  content: string;
  addTime: Date;
  otherId: string;
  praiseCount: number;
  replyCount: number;
  liked: boolean;
}

export type Params = {
  courseId: string,
  userId?: string,
  current: number,
  pageSize: number,
}

export type CommentParams = {
  courseId: string,
  content: string,
  userId: string,
}
export type likeParams = {
  commentId: string,
  userId?: string,
}

export type question = {
  question: string,
  answer: number,
}

export type uploadTestParams = {
  courseId: string,
  courseTestRequestList: question[],
}

export type courseInfoVO = {
  id: string,
  courseId: string,
  videoLink: string,
  infoLink: string,
  content: string,
  chapterNum: number,
  intro: string,
  title: string,
}

export type courseInfoListVO = {
  courseInfoVOList: courseInfoVO[],
  totalNum: number,
}

export type ReplyParams = {
   commentId: string
   courseId: string
   userId: string
   comment: string
   otherId: string
}

export type commentUserParams = {
  commentId: string,
  userId?: string,
}

export type clickParams = {
  courseId: string,
  studentId?: string,
}
