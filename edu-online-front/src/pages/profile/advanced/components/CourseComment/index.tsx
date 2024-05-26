import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

type CourseCommentProps = {
  data: {
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
  };
};

const CourseComment: React.FC<CourseCommentProps> = ({
  data: { commentId, courseId, userId, userName, userImgUrl,pCommentId,content
  ,addTime,otherId,praiseCount,replyCount},
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <Avatar src={userImgUrl} size="small" />
      {/*<a href={href}>{userName}</a> 发布在 <a href={href}>{href}</a>*/}
      <em>{moment(addTime).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default CourseComment;
