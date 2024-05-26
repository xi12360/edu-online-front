import {ArticleVO, Params} from "@/pages/forum/articles/data";
import {request} from "@@/plugin-request/request";

export async function queryMostClickUsingGET(
  params: Params,
): Promise<{ data: { totalNum: number; articleClickVOList: ArticleVO[] } }> {
  return request('/api/forum/mostClickArt', {
    params,
  });
}
