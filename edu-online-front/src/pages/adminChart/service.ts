import {request} from "@@/plugin-request/request";
import {ArticleClickVO, ArticleFavorVO, CourseClickVO, CourseFavorVO} from "@/pages/adminChart/data";

export async function listMostClickArticle(token?: string): Promise<{ data: { totalNum: number; articleVOList : ArticleClickVO[] } }> {
  return request('/api/forum/mostClickArt', {
    method: 'GET',
    headers: {
      Authorization: token || "",
    },
  });
}

export async function listMostFavorArticle(token?: string): Promise<{ data: { totalNum: number; articleVOList: ArticleFavorVO[] } }> {
  return request('/api/forum/mostFavorArt', {
    method: 'GET',
    headers: {
      Authorization: token || "",
    },
  });
}

export async function listMostFavorCourse(token?: string): Promise<{ data: { totalNum: number; courseFavorListVO: CourseFavorVO[] } }> {
  return request('/api/course/mostFavorCourse', {
    method: 'GET',
    headers: {
      Authorization: token || "",
    },
  });
}

export async function listMostClickCourse(token?: string): Promise<{ data: { totalNum: number; courseClickListVO: CourseClickVO[] } }> {
  return request('/api/course/mostClickCourse', {
    method: 'GET',
    headers: {
      Authorization: token || "",
    },
  });
}
