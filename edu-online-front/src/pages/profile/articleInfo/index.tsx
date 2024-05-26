import {PageContainer} from '@ant-design/pro-layout';
import {Card, Button, message, Avatar, List, Tag, Comment, Input} from 'antd';
import React, {useState} from 'react';
import styles from './style.less';
import {history, request, useModel, useParams, useRequest} from 'umi';
import {ArticleVO, ForumCommentVO, forumCommentVO} from './data';
import {
  queryArticleInfoById,
  queryCommentUsingGET,
  publishArticleComment,
  likeArticleComment,
  favorArticle, queryFavorArticle, queryForumChildComments, onForumAddReply, deleteArticleComment,deleteArticle,clickArt
} from './service';
import {
  LoadingOutlined, MessageOutlined,
  RollbackOutlined, HeartOutlined, LikeOutlined,CloseCircleOutlined
} from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";

import {Typography} from 'antd';

const {Title, Paragraph, Text, Link} = Typography;


interface RouteParams {
  articleId: string;
}

const articleInfo: React.FC = () => {

  const handleGoBack = () => {
    history.goBack();
  };

  //const [buy, setBuy] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [commentVOList, setCommentVOList] = useState<ForumCommentVO[]>([])
  const [totalNum, setTotalNum] = useState<number>(0);
  const {articleId} = useParams<RouteParams>();
  const [articleInfo, setArticleInfo] = useState<ArticleVO>();
  const [getSearchVal, setGetSearchVal] = useState<string>('');
  const [isFavorArticle, setIsFavorArticle] = useState<number>(0);
  const [childComments, setChildComments] = useState<{ [key: string]: ForumCommentVO[] }>({});
  const [canDel,setCanDel] = useState<boolean>(false);

  const [replyContent, setReplyContent] = useState("");
  const [replyContent2, setReplyContent2] = useState("");
  // const [replyContents, setReplyContents] = useState<string[]>([]);
  const handleAddReply = (comment) => {
    // 判断回复内容是否为空，可根据具体需求增加其他判断条件
    if (replyContent.trim() !== "") {
      onForumAddReply({
        commentId: comment.commentId, comment: replyContent, userId: initialState?.currentUser.id
        , articleId: articleId, otherId: comment.userId
      }); // 调用回复评论的函数，传递评论ID和回复内容
      setReplyContent(""); // 清空回复内容输入框
      message.success("回复成功")
    }
  };
  const handleAddReply2 = (comment) => {
    // 判断回复内容是否为空，可根据具体需求增加其他判断条件
    if (replyContent2.trim() !== "") {
      onForumAddReply({
        commentId: comment.commentId, comment: replyContent2, userId: initialState?.currentUser.id
        , articleId: articleId, otherId: comment.userId
      }); // 调用回复评论的函数，传递评论ID和回复内容
      setReplyContent(""); // 清空回复内容输入框
      message.success("回复成功")
    }
  };

  //  获取用户信息
  const {initialState} = useModel('@@initialState');

  const {loading} = useRequest(
    () => {
      const result = queryArticleInfoById(articleId);
      clickArt({articleId:articleId,studentId:initialState?.currentUser?.id});
      return result;
    },
    {
      onSuccess(result, isFavor) {
        setArticleInfo(result);
        if(initialState?.currentUser?.id===result.authorId || initialState?.currentUser?.access=="canAdmin"){
          setCanDel(true)
        }
      }
    },
  );

  const handleShowReplies = async (commentId: string) => {
    try {
      const response = await queryForumChildComments({commentId: commentId, userId: initialState?.currentUser.id});
      setChildComments((prevChildComments) => ({
        ...prevChildComments,
        [commentId]: response.data.forumCommentVOList,
      }));
    } catch (error) {
      console.error("Failed to fetch child comments", error);
    }
  };

  useRequest(
    () => {
      const isFavor = queryFavorArticle({articleId: articleId, userId: initialState?.currentUser.id});
      return isFavor;
    },
    {
      onSuccess(isFavor) {
        setIsFavorArticle(isFavor);
      }
    },
  );
  const handleReplyChange = (e, index) => {
    const newReplyContents = [...replyContents];
    newReplyContents[index] = e.target.value;
    setReplyContents(newReplyContents);
  };

  const {commentList, loadMore, loadingMore} = useRequest(
    () => {
      const vo = queryCommentUsingGET({
        articleId: articleId,
        userId: initialState?.currentUser.id,
        current: currentPage,
        pageSize: pageSize,
      });
      return vo;
    },
    {
      onSuccess(vo) {
        setTotalNum(vo.totalNum);
        setCommentVOList(commentVOList.concat(vo.forumCommentVOList));
        // loadMore: true,
      },
    },
  );

  const getIptValue = (event: { target: { value: any } }) => {
    setGetSearchVal(event.target.value);
  };

  const inputRef = React.useRef(null);

  async function publishComment() {
    const response = await publishArticleComment({
      articleId: articleId,
      comment: getSearchVal,
      userId: initialState.currentUser.id || ""
    });
    if (response) {
      message.success("评论成功");
      const vo = await queryCommentUsingGET({
        articleId: articleId,
        userId: initialState?.currentUser.id,
        current: currentPage,
        pageSize: pageSize,
      });
      setTotalNum(vo.data.totalNum);
      setCommentVOList(vo.data.forumCommentVOList);
    }
  }

  const loadMoreDom = totalNum > commentVOList.length && (
    <div style={{textAlign: 'center', marginTop: 16}}>
      <Button onClick={loadMore} style={{paddingLeft: 48, paddingRight: 48}}>
        {loadingMore ? (
          <span>
          <LoadingOutlined/> 加载中...
        </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );
  const updateCommentLikeStatus = (commentId: string, liked: boolean) => {
    // 在此处编写修改评论点赞状态的代码
    setCommentVOList(prevComments =>
      prevComments.map(comment => {
        if (comment.commentId === commentId) {
          if(liked) {
            return {...comment, liked: !liked, praiseCount: comment.praiseCount - 1};
          } else{
            return {...comment, liked: !liked, praiseCount: comment.praiseCount + 1};
          }
        }
        return comment;
      })
    );
  };

  const updateChildCommentLikeStatus = (parentId: string, commentId: string, liked: boolean) => {
    setChildComments(prevChildComments => {
      const updatedComments = { ...prevChildComments };
      if (updatedComments[parentId]) {
        const updatedCommentArray = updatedComments[parentId].map(comment => {
          if (comment.commentId === commentId) {
            if(liked) {
              return {...comment, liked: !liked, praiseCount: comment.praiseCount - 1};
            } else {
              return {...comment, liked: !liked, praiseCount: comment.praiseCount + 1};
            }
          }
          return comment;
        });
        updatedComments[parentId] = updatedCommentArray;
      }
      return updatedComments;
    });
  };



  // to
  async function handleFavorArticle() {
    const res = await favorArticle({articleId: articleId, userId: initialState.currentUser.id || ""});
    if (res) {
      message.success("收藏成功");
      setIsFavorArticle(1);
    }
  }

  async function handleDel() {
    const res = await deleteArticle({articleId: articleId, userId: initialState.currentUser.id || ""});
    if (res) {
      message.success("删除成功");
      history.push("/forum/articles");
    }
  }

  const sendLikeRequest = async (comment: ForumCommentVO) => {
    // 根据commentId发送点赞评论的请求
    const res = await likeArticleComment({commentId: comment.commentId, userId: initialState?.currentUser.id});
    // 在此处编写发送请求的代码
    if(res.data) {
      message.success("ok");
      updateCommentLikeStatus(comment.commentId, comment.liked)
    } else {
      message.error("点赞失败");
    }
  }

  const sendChildLikeRequest = async (comment: ForumCommentVO) => {
    // 根据commentId发送点赞评论的请求
    const res = await likeArticleComment({commentId: comment.commentId, userId: initialState?.currentUser.id});
    // 在此处编写发送请求的代码
    if(res.data) {
      message.success("ok");
      updateChildCommentLikeStatus(comment.pCommentId, comment.commentId, comment.liked);
    } else {
      message.error("点赞失败");
    }
  }

  const renderChildComments = (commentId: string) => {
    const replies = childComments[commentId] || [];
    return (
      replies.length > 0 && (
        <List
          dataSource={replies}
          renderItem={(reply) => (
            <Comment
              author={reply.userName}
              content={reply.comment}
              datetime={reply.addTime}
              avatar={reply.userImgUrl}
              actions={[
                <div key={`comment-action-${reply.commentId}`} style={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                  <span
                    key={`comment-like-${reply.commentId}`}
                    style={{ marginRight: "10px", cursor: "pointer", color: reply.liked ? "red" : "" }}
                    className={reply.liked ? "liked-button" : ""}
                    onClick={() => sendChildLikeRequest(reply)}
                  >
                    <LikeOutlined /> {reply.praiseCount}
                  </span>
                  <span
                    key={`comment-reply-${reply.commentId}`}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => handleShowReplies(reply.commentId)}
                  >
                    展示回复
                  </span>
                  <span
                    key={`comment-delete-\${comment.commentId}`}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => deleteArticleComment({commentId: reply.commentId, userId: initialState?.currentUser.id})}
                    // 添加权限控制
                    hidden={!(initialState?.currentUser.access =="canAdmin" || initialState?.currentUser.id == reply.userId) }
                  >
                    删除评论
                  </span>
                  <div key={`comment-reply-input-${reply.commentId}`} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", position: "absolute", right: "0" }}>
                    <Input
                      value={replyContent2}
                      onChange={(e) => setReplyContent2(e.target.value)}
                      placeholder="请输入回复内容"
                      style={{ marginRight: "10px" }}
                      maxLength={400}
                    />
                    <Button type="primary" onClick={() => handleAddReply2(reply)}>
                      回复
                    </Button>
                  </div>
                </div>
              ]}
            >
              {renderChildComments(reply.commentId)}
            </Comment>
          )}
        />
      )
    );
  };


  return (
    <PageContainer
      header={{
        extra: [
          <Button type="primary" icon={<RollbackOutlined/>} onClick={handleGoBack} key="3">
            返回上一级
          </Button>,
          isFavorArticle == 0 ? (
            // <CourseChapterDrawer param={param} />
            <Button type="primary" icon={<HeartOutlined />} onClick={handleFavorArticle} key="4">
              收藏文章
            </Button>
          ) : (
            <Button type="primary" icon={<HeartOutlined />} disabled={true}>
              已收藏
            </Button>
          ),

          canDel==true ? (
            // <CourseChapterDrawer param={param} />
            <Button type="primary" icon={<CloseCircleOutlined />} onClick={handleDel} key="4">
              删除
            </Button>
          ) : (
            " "
          ),
        ]
      }}
    >
      <Card
        style={{marginTop: 24}}
        bordered={false}
        bodyStyle={{padding: '8px 32px 32px 32px'}}
      >
        <Typography>
          <Title>{articleInfo?.title}</Title>

          <Paragraph>
            <ul style={{ listStyleType: "none", marginLeft: 2, lineHeight: 1.5 }}>
              <li style={{ listStyleType: "none", marginLeft: 2 }}>
                <Typography.Text strong>
                  <Avatar src={articleInfo?.authorImgUrl} size={"small"}/>
                  作者: <Typography.Text type="secondary">{articleInfo?.authorName}</Typography.Text>
                </Typography.Text>
              </li>
              <li style={{ listStyleType: "none", marginLeft: 2 }}>
                <Typography.Text strong>
                  发布时间: <Typography.Text type="secondary">{articleInfo?.publishTime}</Typography.Text>
                </Typography.Text>
              </li>
              <li style={{ listStyleType: "none", marginLeft: 2 }}>
                <Typography.Text strong>
                  文章类别: <Typography.Text type="secondary">{articleInfo?.articleType}</Typography.Text>
                </Typography.Text>
              </li>
              <li style={{ listStyleType: "none", marginLeft: 2 }}>
                <Typography.Text strong>
                  关键词：<Tag>{articleInfo?.keyWord}</Tag>
                </Typography.Text>
              </li>

            </ul>
          </Paragraph>
          <Title level={5}>详情</Title>
          <Paragraph>
            <blockquote>{articleInfo?.summary}</blockquote>
            <pre>{articleInfo?.content}</pre>
          </Paragraph>
          <Paragraph>
            来源: {articleInfo?.source}
          </Paragraph>
        </Typography>
      </Card>

      <Card title={"评论区"}
            style={{marginTop: 24}}
            bordered={false}
            bodyStyle={{padding: '8px 32px 32px 32px'}}
      >
        <TextArea
          name="comment"
          showCount
          maxLength={100}
          style={{height: 70, resize: 'none'}}
          placeholder="最多100字"
          onChange={getIptValue}
          ref={inputRef}
        />
        <Button type="primary" onClick={publishComment}>发布评论</Button>
        <List
          dataSource={commentVOList}
          renderItem={(comment) => (
            <Comment
              author={comment.userName}
              content={comment.comment}
              datetime={comment.addTime}
              avatar={comment.userImgUrl}
              actions={[
                <div key={`comment-action-${comment.commentId}`} style={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                  <span
                    key={`comment-like-${comment.commentId}`}
                    style={{ marginRight: "10px", cursor: "pointer", color: comment.liked ? "red" : "" }}
                    className={comment.liked ? "liked-button" : ""}
                    onClick={() => sendLikeRequest(comment)}
                  >
                    <LikeOutlined /> {comment.praiseCount}
                  </span>
                  <span
                    key={`comment-reply-${comment.commentId}`}
                    onClick={() => handleShowReplies(comment.commentId)}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  >
                    展示回复
                  </span>
                  <span
                    key={`comment-delete-\${comment.commentId}`}
                    style={{ marginRight: "10px", cursor: "pointer"}}
                    onClick={() => deleteArticleComment({commentId: comment.commentId, userId: initialState?.currentUser.id})}
                    // 添加权限控制
                    hidden={!(initialState?.currentUser.access =="canAdmin" || initialState?.currentUser.id == comment.userId) }
                  >
                    删除评论
                  </span>
                  <div key={`comment-reply-input-${comment.commentId}`} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", position: "absolute", right: "0" }}>
                    <Input
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="请输入回复内容"
                      style={{ marginRight: "10px" }}
                      maxLength={400}
                    />
                    <Button type="primary" onClick={() => handleAddReply(comment)}>
                      回复
                    </Button>
                  </div>
                </div>
              ]}
            >
              {renderChildComments(comment.commentId)}

            </Comment>
          )}
        />
      </Card>
    </PageContainer>
  )

};

export default articleInfo;
