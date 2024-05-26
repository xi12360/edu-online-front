import {request} from 'umi';
import {ArticleParams} from "@/pages/forum/publish/data";


export async function publishArticle(
  params: ArticleParams,
): Promise<{
  data: number
}> {
  return request('/api/forum/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      articleType: params.articleType,
      authorId: params.authorId,
      imageUrl: params.imageUrl,
      keyWord: params.keyWord,
      role:params.role,
      source:params.source,
      summary:params.summary,
      title: params.title,
      content:params.content,
    },
  });
}