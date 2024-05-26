import { request } from 'umi';
import type {CurrentUser, ItemData, CommentData, OrderData, FavorParams, ArticleVO} from './data.d';
import {ArticleFavorParams} from "./data.d";

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/user/currentUser');
}

export async function queryItemList(): Promise<{
  data: { totalNum: number; list: ItemData[] };
}> {
  return request('/api/item/listMy');
}

export async function queryOrderList(): Promise<{
  data: { totalNum: number; list: OrderData[] };
}> {
  return request('/api/order/listMy');
}

export async function queryCommentList(): Promise<{
  data: { totalNum: number; list: CommentData[] };
}> {
  return request('/api/comment/list');
}


export async function queryMyFavorCourse(
  params: FavorParams,
): Promise<{ data: { totalNum: number; courseVOList: API.CourseVO[] } }> {
  return request('/api/course/listMyFavor', {
    params,
  });
}

export async function queryMyPublishArticle(
  params: ArticleFavorParams,
): Promise<{ data: { totalNum: number; articleVOList: ArticleVO[] } }> {
  return request('/api/forum/listMyPublish', {
    params,
  });
}

export async function queryMyFavorArticle(
  params: ArticleFavorParams,
): Promise<{ data: { totalNum: number; articleVOList: ArticleVO[] } }> {
  return request('/api/forum/listMyFavor', {
    params,
  });
}
