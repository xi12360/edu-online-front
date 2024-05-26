import { request } from 'umi';
import type {Params, ListItemDataType, ArticleVO,ParamsType,ParamsClick} from './data.d';

export async function queryFakeList(
  params: Params,
): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/fake_list', {
    params,
  });
}

export async function queryArticleLikeUsingGET(
  params: Params,
): Promise<{ data: { totalNum: number; articleVOList: ArticleVO[] } }> {
  return request('/api/forum/query', {
    params,
  });
}

export async function queryMostClickUsingGET(
  params: Params,
): Promise<{ data: { totalNum: number; articleVOList: ArticleVO[] } }> {
  return request('/api/forum/mostClickArt', {
    params,
  });
}

export async function queryByTimeUsingGET(
  params: Params,
): Promise<{ data: { totalNum: number; articleVOList: ArticleVO[] } }> {
  return request('/api/forum/queryByTime', {
    params,
  });
}

export async function clickArt(
  params:ParamsClick,
):Promise<{ data: {} }>{
  return request('/api/forum/onclick', {
    params,
  });
}

export async function queryByTypeUsingGET(
  params: ParamsType,
): Promise<{ data: { totalNum: number; articleVOList: ArticleVO[] } }> {
  return request('/api/forum/queryByType', {
    params,
  });
}


export async function queryArticleByAuthor(
  params: Params,
): Promise<{ data: { totalNum: number; articleVOList: ArticleVO[] } }> {
  return request('/api/forum/queryByAuthorName', {
    params,
  });
}