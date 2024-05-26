import {Avatar} from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

type ArticleVO = {
  data:{
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
  content?:string;
};
};

const ArticleListContent: React.FC<ArticleVO> = (
  {
    data:{summary,authorImgUrl,authorName,publishTime},
  }) =>
  (
    <div className={styles.listContent}>
      <div className={styles.description}>{summary}</div>
      <div className={styles.extra}>
        <em>{moment(publishTime).format('YYYY-MM-DD HH:mm')}</em>发布
      </div>
    </div>
  );

export default ArticleListContent;
