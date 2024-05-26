// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    // createTime?: string;
    email?: string;
    // grade?: string;
    // id?: string;
    major?: string;
    phone?: string;
    picImg?: string;
    sex?: number;
    // status?: number;
    // userName?: string;
    // access?: string;
    access?: string;
    id?: string;
    name?: string;
  };

  type UserVO = {
    access?: string;
    id?: string;
    name?: string;
  }

  type BaseResponseListCourseVO_ = {
    code?: number;
    data?: CourseListVO;
    message?: string;
  };
  type CourseListVO = {
    courseVOList?: CourseVO[];
    totalNum?: number;
  }

  type LoginResult = {
    type?: string;
  };

  type PublishResult = {
    ok?: boolean;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    type?: string;
  };

  type ListCourseCommentVO = {
    courseCommentVOList?: CourseCommentVO;
    totalNum?: number;
  }

  type BaseResponseListCourseCommentVO_ = {
    code?: number;
    data?: ListCourseCommentVO;
    message?: string;
  };



  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
  type ArticleClickVO = {
    articleId?: string;
    clickNum?: number;
    title?: string;
  };

  type ArticleFavorVO = {
    articleId?: string;
    praiseNum?: number;
    title?: string;
  };

  type ArticlePublishRequest = {
    articleType?: string;
    authorId?: string;
    imgUrl?: string;
    keyWord?: string;
    role?: number;
    source?: string;
    summary?: string;
    title?: string;
  };

  type auditCourseUsingGETParams = {
    /** courseId */
    courseId: string;
    /** status */
    status: number;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListArticleClickVO_ = {
    code?: number;
    data?: ArticleClickVO[];
    message?: string;
  };

  type BaseResponseListArticleFavorVO_ = {
    code?: number;
    data?: ArticleFavorVO[];
    message?: string;
  };




  type BaseResponseListCourseTestVO_ = {
    code?: number;
    data?: CourseTestVO[];
    message?: string;
  };

  type BaseResponseListCourseVO_ = {
    code?: number;
    data?: CourseVO[];
    message?: string;
  };

  type BaseResponseListForumCommentVO_ = {
    code?: number;
    data?: ForumCommentVO[];
    message?: string;
  };

  type BaseResponseListStudentVO_ = {
    code?: number;
    data?: StudentVO[];
    message?: string;
  };

  type BaseResponseListTeacherVO_ = {
    code?: number;
    data?: TeacherVO[];
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseStudentVO_ = {
    code?: number;
    data?: StudentVO;
    message?: string;
  };

  type BaseResponseTeacherVO_ = {
    code?: number;
    data?: TeacherVO;
    message?: string;
  };
  type BaseResponseAdmin_ = {
    id?: string;
    password?: string;
    phone?: string;
    name?: string;
  }
  type BaseResponseUser_ = {
    code?: number;
    data?: CurrentUser;
    message?: string;
  }

  type buyCourseUsingGETParams = {
    /** courseId */
    courseId: string;
    /** studentId */
    studentId: string;
  };

  type changeStatusUsingGET1Params = {
    /** id */
    id: string;
    /** status */
    status?: number;
  };

  type changeStatusUsingGETParams = {
    /** id */
    id: string;
    /** status */
    status?: number;
  };

  type CourseCommentRequest = {
    content?: string;
    courseId?: string;
    userId?: string;
  };

  type CourseCommentVO = {
    addTime?: string;
    commentId?: string;
    content?: string;
    courseId?: string;
    otherId?: string;
    pcommentId?: string;
    praiseCount?: number;
    replyCount?: number;
    userId?: string;
  };

  type CourseTestRequest = {
    answer?: number;
    question?: string;
  };

  type CourseTestUploadRequest = {
    courseId?: string;
    courseTestRequestList?: CourseTestRequest[];
  };

  type CourseTestVO = {
    answer?: number;
    id?: string;
    question?: string;
  };

  type CourseUploadRequest = {
    courseName?: string;
    endTime?: string;
    logo?: string;
    sourcePrice?: number;
    subjectLink?: string;
    teacherId?: string;
    title?: string;
  };

  type CourseVO = {
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

  type delArticleUsingDELETEParams = {
    /** articleId */
    articleId: string;
    /** userId */
    userId: string;
  };

  type delCommentUsingDELETE1Params = {
    /** commentId */
    commentId: string;
    /** userId */
    userId: string;
  };

  type delCommentUsingDELETEParams = {
    /** id */
    id: string;
    /** userId */
    userId: string;
  };

  type dropCourseUsingGETParams = {
    /** courseId */
    courseId: string;
  };

  type ForumCommentRequest = {
    articleId?: string;
    comment?: string;
    userId?: string;
  };

  type ForumCommentVO = {
    addTime?: string;
    articleId?: string;
    comment?: string;
    commentId?: string;
    liked?: number;
    userId?: string;
    userImgUrl?: string;
    userName?: string;
  };

  type getTestUsingGETParams = {
    /** courseId */
    courseId: string;
  };

  type likeArticleUsingGETParams = {
    /** commentId */
    commentId: string;
    /** userId */
    userId: string;
  };

  type likeCommentUsingGETParams = {
    /** commentId */
    commentId: string;
    /** userId */
    userId: string;
  };

  type listAuditUsingGETParams = {
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  };

  type listUsingGET1Params = {
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  };

  type listUsingGETParams = {
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  };

  type Pinyin__ = {
    /** 管理员id */
    id?: string;
    password?: string;
  };

  type queryCommentUsingGET1Params = {
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  };

  type queryCommentUsingGETParams = {
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  };

  type queryCourseLikeUsingGETParams = {
    /** current */
    current?: number;
    /** name */
    name: string;
    /** pageSize */
    pageSize?: number;
  };

  type ReplyCourseCommentRequest = {
    comment?: string;
    courseId?: string;
    otherId?: string;
    pcommentId?: string;
    userId?: string;
  };

  type ReplyForumCommentRequest = {
    articleId?: string;
    comment?: string;
    otherId?: string;
    pcommentId?: string;
    userId?: string;
  };

  type SendSysMsgRequest = {
    text?: string;
    toId?: string;
  };

  type StudentLoginRequest = {
    password?: string;
    phone?: string;
  };

  type StudentLoginUseVerifiedCodeRequest = {
    code?: string;
    phone?: string;
  };

  type StudentModifyRequest = {
    email?: string;
    grade?: string;
    id?: string;
    major?: string;
    phone?: string;
    pic_img?: string;
    sex?: number;
    userName?: string;
  };

  type StudentRegisterRequest = {
    checkPwd?: string;
    password?: string;
    phone?: string;
  };

  type StudentVO = {
    createTime?: string;
    email?: string;
    grade?: string;
    id?: string;
    major?: string;
    phone?: string;
    picImg?: string;
    sex?: number;
    status?: number;
    userName?: string;
  };

  type TeacherLoginRequest = {
    password?: string;
    phone?: string;
  };

  type TeacherModifyRequest = {
    education?: string;
    email?: string;
    id?: string;
    introduction?: string;
    major?: string;
    name?: string;
    phone?: string;
    pic_path?: string;
  };

  type TeacherRegisterRequest = {
    checkPwd?: string;
    education?: string;
    introduction?: string;
    major?: string;
    name?: string;
    password?: string;
    phone?: string;
    sex?: number;
  };

  type TeacherVO = {
    createTime?: string;
    education?: string;
    email?: string;
    id?: string;
    introduction?: string;
    major?: string;
    name?: string;
    phone?: string;
    picPath?: string;
    sex?: number;
    status?: number;
  };
}
