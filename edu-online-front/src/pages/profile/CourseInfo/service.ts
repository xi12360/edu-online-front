import {request} from 'umi';
import {
  clickParams,
  CommentParams, commentUserParams,
  CourseCommentVO,
  courseInfoVO, deleteParams,
  likeParams,
  Params, ReplyParams,
  uploadTestParams
} from "@/pages/profile/CourseInfo/data";

export async function queryCourseInfo(
  params: string,
): Promise<{
  data: {
    title: string;
    buyCount: number;
    courseId: string;
    courseName: string;
    currentPrice: number;
    endTime: Date;
    lessonNum: number;
    logo: string;
    sourcePrice: number;
    status: number;
    subjectLink: string;
    teacherVO: API.TeacherVO;
    clickNum: number;
    praiseNum: number;
    commentNum: number;
  }
}> {
  return request('/api/course/queryById', {
    params: {courseId: params},
  });
}

export async function buyCourse(
  studentId: string,
  courseId: string,
): Promise<{
  data: number
}> {
  return request('/api/course/buy', {
    method: 'GET',
    params: {
      studentId: studentId,
      courseId: courseId
    },
  });
}

export async function queryBuy(
  studentId: string,
  courseId: string,
): Promise<{
  data: number
}> {
  return request('/api/course/queryBuy', {
    method: 'GET',
    params: {
      studentId: studentId,
      courseId: courseId
    },
  });
}

export async function queryTestList(
  courseId: string,
): Promise<{
  data: {
    totalNum: number;
    courseTestVOList: API.CourseTestVO[];
  }
}> {
  return request('/api/course/get/test', {
    method: 'GET',
    params: {
      courseId: courseId
    },
  });
}

export async function queryCommentUsingGET(
  params: Params,
): Promise<{
  data: {
    totalNum: number;
    courseCommentVOList: CourseCommentVO[];
  }
}> {
  return request('/api/course/queryComment', {
    params,
  });
}

export async function publishCourseComment(
  params: CommentParams,
): Promise<{
  data: number
}> {
  return request('/api/course/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      courseId: params.courseId,
      content: params.content,
      userId: params.userId,
    },
  });
}

export async function likeCourseComment(
  params: likeParams,
): Promise<{
  data: number
}> {
  return request('/api/course/like/comment', {
    params,
  });
}

export async function uploadTest(
  params: uploadTestParams,
): Promise<{
  data: number
}> {
  return request('/api/course/upload/test', {
    method: 'POST',
    data: params,
  });
}

export async function queryCourseChapterInfo(
  params: string,
): Promise<{
  data: {
    id: string,
    courseId: string,
    videoLink: string,
    infoLink: string,
    content: string,
    order: number,
    intro: string,
    title: string,
  }
}> {
  return request('/api/course/info/queryById', {
    params: {courseInfoId: params},
  });
}


export async function queryCourseInfoList(
  params: string,
): Promise<{ data: { totalNum: number; courseInfoVOList: courseInfoVO[] } }> {
  return request('/api/course/listAllInfo', {
    params: {courseId: params},
  });
}

export async function queryChildComments(
  params: commentUserParams,
): Promise<{
  data: {
    totalNum: number;
    courseCommentVOList: CourseCommentVO[];
  }
}> {
  return request('/api/course/queryChildComment', {
    params: {commentId: params.commentId, userId: params.userId},
  });
}

//onAddReply

export async function onAddReply(
  params: ReplyParams,
): Promise<{
  data: number
}> {
  return request('/api/course/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      commentId: params.commentId,
      courseId: params.courseId,
      userId: params.userId,
      comment: params.comment,
      otherId: params.otherId,
    },
  });
}

export async function deleteComment(
  params: commentUserParams,
): Promise<{
  data: number
}> {
  return request('/api/course/del/comment', {
    method: 'DELETE',
    params: {
      commentId: params.commentId,
      userId: params.userId,
    },
  });
}

export async function onclickCourse(
  params: clickParams,
): Promise<{
  data: number
}> {
  return request('/api/course/onclick', {
    method: 'GET',
    params: {
      courseId: params.courseId,
      studentId: params.studentId,
    },
  });
}
