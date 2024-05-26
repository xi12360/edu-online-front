import {
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  List,  message, Col, Row, Image, Avatar, Input,
} from 'antd';
import {GridContent, PageContainer, RouteContext} from '@ant-design/pro-layout';
import {FC, useEffect} from 'react';
import React, { useState} from 'react';
import {Comment} from 'antd';

import {useParams, useRequest} from 'umi';
import styles from './style.less';
import TextArea from "antd/es/input/TextArea";
import {CourseCommentVO} from "@/pages/profile/CourseInfo/data";
import {
  CheckOutlined,
  DeleteOutlined, DollarOutlined,
  DownloadOutlined, FireOutlined,
  LikeOutlined,
  LoadingOutlined,
  RollbackOutlined, ShopOutlined, StopOutlined
} from "@ant-design/icons";
import {history} from "@@/core/history";
import {SizeType} from "@ant-design/pro-form/es/BaseForm";
import {useModel} from "@@/plugin-model/useModel";
import {
  deleteComment,
  likeCourseComment,
  onAddReply, onclickCourse,
  publishCourseComment,
  queryBuy, queryChildComments,
  queryCommentUsingGET,
  queryCourseInfo
} from "@/pages/profile/CourseInfo/service";
import TestForm from "@/pages/profile/CourseInfo/components/TestForm";
import {request} from "@@/plugin-request/request";
import MyModal from "@/components/Modal";
import OrderForm from "@/pages/profile/CourseInfo/components/OrderForm";
import UploadTestQuestions from "@/pages/profile/CourseInfo/components/UploadTestForm";
import CourseChapterDrawer from "@/pages/profile/CourseInfo/components/CourseChapterDrawer";
import UploadChapterForm from "@/pages/profile/CourseInfo/components/UploadChapterForm";
import UploadForm from "@/pages/course/components/UploadForm/UploadForm";
import ModifyForm from "@/pages/profile/CourseInfo/components/UpdateForm";

interface RouteParams {
  courseId: string;
}

const CourseInfo: FC = () => {

  const handleGoBack = () => {
    history.goBack();
  };

  const [buy, setBuy] = useState<number>(0);
  const [size, setSize] = useState<SizeType>('large');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [commentVOList, setCommentVOList] = useState<CourseCommentVO[]>([])
  const [totalNum, setTotalNum] = useState<number>(0);
  const {courseId} = useParams<RouteParams>();
  const [getSearchVal, setGetSearchVal] = useState<string>('');
  const [upload, setUpload] = useState<number>(0);
  // const [childComments, setChildComments] = useState({});
  const [childComments, setChildComments] = useState<{ [key: string]: CourseCommentVO[] }>({});

  const [replyContent, setReplyContent] = useState("");
  const [replyContent2, setReplyContent2] = useState("");

  const [likes, setLikes] = useState<boolean>(true);

  const handleAddReply = (comment) => {
    // 判断回复内容是否为空，可根据具体需求增加其他判断条件
    if (replyContent.trim() !== "") {
      onAddReply({
        commentId: comment.commentId, comment: replyContent, userId: initialState?.currentUser.id
        , courseId: courseId, otherId: comment.userId
      }); // 调用回复评论的函数，传递评论ID和回复内容
      setReplyContent(""); // 清空回复内容输入框
      message.success("回复成功")
    }
  };
  const handleAddReply2 = (comment) => {
    // 判断回复内容是否为空，可根据具体需求增加其他判断条件
    if (replyContent2.trim() !== "") {
      onAddReply({
        commentId: comment.commentId, comment: replyContent2, userId: initialState?.currentUser.id
        , courseId: courseId, otherId: comment.userId
      }); // 调用回复评论的函数，传递评论ID和回复内容
      setReplyContent(""); // 清空回复内容输入框
      message.success("回复成功")
    }
  };
  // useEffect(() => {
  //   // 在数据改变后重新渲染整个组件
  //   setLikes(!likes);
  // }, [likes]);

  const getIptValue = (event: { target: { value: any } }) => {
    setGetSearchVal(event.target.value);
  };

  const inputRef = React.useRef(null);

  const {data, loading} = useRequest(() => {
    queryBuyFunction();
    return queryCourseInfo(courseId);
  });

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
      // const updatedComments = { ...prevChildComments };
      const updatedComments = JSON.parse(JSON.stringify(prevChildComments));
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

  //  获取用户信息
  const {initialState} = useModel('@@initialState');

  async function queryBuyFunction() {
    const isBuy = await queryBuy(initialState.currentUser.id, courseId);
    // 在这里使用 isBuy 的结果
    setBuy(isBuy.data);
  }

  async function publishComment() {
    const response = await publishCourseComment({
      courseId: courseId,
      content: getSearchVal,
      userId: initialState.currentUser.id || ""
    });
    if (response) {
      message.success("评论成功");
      const vo = await queryCommentUsingGET({
        courseId: courseId,
        userId: initialState?.currentUser.id,
        current: currentPage,
        pageSize: pageSize,
      });
      setTotalNum(vo.data.totalNum);
      setCommentVOList(vo.data.courseCommentVOList);
    }
  }

  const [tabStatus, seTabStatus] = useState<AdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });

  const {commentList, loadMore, loadingMore} = useRequest(
    () => {
      const vo = queryCommentUsingGET({
        courseId: courseId,
        userId: initialState?.currentUser.id,
        current: currentPage,
        pageSize: pageSize,
      });

      if(initialState?.currentUser.access == 'canStudent') {
        onclickCourse({courseId: courseId, studentId: initialState?.currentUser.id});
      }

      return vo;
    },
    {
      onSuccess(vo) {
        setTotalNum(vo.totalNum);
        setCommentVOList(commentVOList.concat(vo.courseCommentVOList));
        // loadMore: true,
      },
    },
  );
  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({...tabStatus, tabActiveKey});
  };

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

  const sendLikeRequest = async (comment: CourseCommentVO) => {
    // 根据commentId发送点赞评论的请求
    const res = await likeCourseComment({commentId: comment.commentId, userId: initialState?.currentUser.id});
    // 在此处编写发送请求的代码
    if(res.data) {
      message.success("ok");
      updateCommentLikeStatus(comment.commentId, comment.liked)
    } else {
      message.error("点赞失败");
    }
  }

  const sendChildLikeRequest = async (comment: CourseCommentVO) => {
    // 根据commentId发送点赞评论的请求
    const res = await likeCourseComment({commentId: comment.commentId, userId: initialState?.currentUser.id});
    // 在此处编写发送请求的代码
    if(res.data) {
      message.success("ok");
      updateChildCommentLikeStatus(comment.pCommentId, comment.commentId, comment.liked);
      setTimeout(() => {
        setLikes(!likes);
      }, 0);
    } else {
      message.error("点赞失败");
    }
  }

  const handleShowReplies = async (commentId: string) => {
    try {
      const response = await queryChildComments({commentId: commentId, userId: initialState?.currentUser.id});
      setChildComments((prevChildComments) => ({
        ...prevChildComments,
        [commentId]: response.data.courseCommentVOList,
      }));
    } catch (error) {
      console.error("Failed to fetch child comments", error);
    }
  };

// 渲染子评论列表
  const renderChildComments = (commentId: string) => {
    const replies = childComments[commentId] || [];

    return (
      replies.length > 0 && (
        <List
          dataSource={replies}
          renderItem={(reply) => (
            <Comment
              author={reply.userName}
              content={reply.content}
              datetime={reply.addTime}
              avatar={reply.userImgUrl}
              actions={[
                <div key={`comment-action-${reply.commentId}`} style={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                  <span
                    key={`comment-like-\${comment.commentId}`}
                    style={{ marginRight: "10px", cursor: "pointer", color: reply.liked ? "red" : "" }}
                    onClick={() => {
                      sendChildLikeRequest(reply);
                      reply.liked = !reply.liked;
                    }}
                  >
                    <LikeOutlined /> {reply.praiseCount}
                  </span>
                  <span
                    key={`comment-reply-${reply.commentId}`}
                    onClick={() => handleShowReplies(reply.commentId)}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  >
                    展示回复
                  </span>
                  <span
                    key={`comment-delete-\${comment.commentId}`}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => deleteComment({commentId: reply.commentId, userId: initialState?.currentUser.id})}
                    // 添加权限控制
                    hidden={!(initialState?.currentUser.access =="admin" || initialState?.currentUser.id == reply.userId) }
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


  const [openOrder, setOpenOrder] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [openPull, setOpenPull] = useState(false);

  return (
    <PageContainer
      title="课程详情"
      className={styles.pageHeader}
      content={(
        <RouteContext.Consumer>
          {({isMobile}) => (
            <Descriptions bordered layout="vertical" className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
              <Descriptions.Item label="课程名">{data?.courseName}</Descriptions.Item>
              <Descriptions.Item label="课程id">{data?.courseId}</Descriptions.Item>
              <Descriptions.Item label="教师姓名">{data?.teacherVO.name}</Descriptions.Item>
              <Descriptions.Item label="结束时间">{data?.endTime} </Descriptions.Item>
              <Descriptions.Item label="介绍">{data?.courseName}</Descriptions.Item>
            </Descriptions>
          )}
        </RouteContext.Consumer>
      )}
      // extraContent={}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
      header={{
        title:
        data?.courseName,
        extra: [

          <Button type="primary" icon={<RollbackOutlined/>} onClick={handleGoBack} key="3">
            返回上一级
          </Button>,

          (buy == 1 || initialState?.currentUser.access == 'canAdmin') ? (
            // <Button type="primary" href={`/profile/course-test/${data?.courseId}`}>
            <Button type="primary" onClick={() => setOpenOrder(true)}>
              在线测试
              <TestForm open={openOrder} setOpen={setOpenOrder} courseId={courseId}></TestForm>
            </Button>
          ) : (
            ''
          ),
          (initialState?.currentUser?.access == 'canTeacher' && initialState?.currentUser?.id == data?.teacherVO.id) ? (
            // <Button type="primary" href={`/profile/course-test/${data?.courseId}`}>
            <Button type="primary" onClick={() => setOpenOrder(true)}>
              上传测验题
              <UploadTestQuestions open={openOrder} setOpen={setOpenOrder} courseId={courseId}></UploadTestQuestions>
            </Button>
          ) : (
            ''
          ),
          (buy == 1 || initialState?.currentUser.access == 'canAdmin')? (
            <Button type="primary" icon={<DownloadOutlined/>} href={data?.subjectLink} download>
              课程资料
            </Button>
          ) : (
            ''
          ),

          (buy == 1 || initialState?.currentUser.id == data?.teacherVO.id || initialState?.currentUser.access == 'canAdmin') ? (
            // <CourseChapterDrawer param={param} />
            <CourseChapterDrawer courseId={courseId}/>
          ) : (
            ''
          ),

          (initialState?.currentUser?.access == 'canTeacher' && initialState?.currentUser?.id == data?.teacherVO.id) ? (
            // <Button type="primary" href={`/profile/course-test/${data?.courseId}`}>
            <UploadChapterForm
              btn={
                <Button type="primary" icon={<ShopOutlined/>}>
                  上传课程章节
                </Button>
              }
              courseId={courseId}
              upload={upload}
              setUploadForm={setUpload}
            />
          ) : (
            ''
          ),

          data?.status == 1 && initialState?.currentUser?.access == 'canAdmin' ? (
            <Button key={1} icon={<StopOutlined/>} onClick={() => setOpenPull(true)}>
              下架课程
              <MyModal
                open={openPull}
                setOpen={setOpenPull}
                displayMessage="下架理由"
                url="/api/course/drop"
                idPara={courseId}
                teacherId={data?.teacherVO.id}>
              </MyModal>
            </Button>
          ) : (
            ''
          ),

          data?.status === 0 && initialState?.currentUser?.access == 'canAdmin' ? (
            <Button
              key={2}
              icon={<CheckOutlined/>}
              onClick={async () => {
                try {
                  const response = await request<{
                    data: number;
                  }>('/api/course/audit', {
                    method: 'GET',
                    params: {courseId, status: 1},
                  });
                  if (response.data) {
                    message.success('提交成功');
                    history.push("/workpanel");
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                  console.error(error);
                }
              }}
            >
              审核通过
            </Button>
          ) : (
            ''
          ),
          data?.status === 0 && initialState?.currentUser?.access == 'canAdmin' ? (
            <Button
              key={2}
              icon={<StopOutlined/>}
              onClick={async () => {
                try {
                  const response = await request<{
                    data: number;
                  }>('/api/course/audit', {
                    method: 'GET',
                    params: {courseId, status: 2},
                  });
                  if (response.data) {
                    message.success('提交成功');
                    history.push("/workpanel");
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                  console.error(error);
                }
              }}
            >
              审核不通过
            </Button>
          ) : (
            ''
          ),
          data?.status === 2 && initialState?.currentUser?.id == data?.teacherVO.id ? (
            <Button
              key={2}
              icon={<CheckOutlined/>}
              onClick={async () => {
                try {
                  const response = await request<{
                    data: number;
                  }>('/api/course/reSubmit', {
                    method: 'GET',
                    params: {courseId, status: 1},
                  });
                  if (response.data) {
                    message.success('提交成功');
                    setUpload(upload + 1);
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                  console.error(error);
                }
              }}
            >
              重新提交审核
            </Button>
          ) : (
            ''
          ),
          initialState?.currentUser?.id == data?.teacherVO.id ? (
            <ModifyForm
              btn={
                <Button type="primary" icon={<ShopOutlined/>}>
                  修改课程
                </Button>
              }
              courseId={courseId}
            />
          ) : (
            ''
          ),

          data?.status == 1 && buy == 0 &&
          initialState?.currentUser?.access == 'canStudent' ? (
            <Button key={4} icon={<DollarOutlined/>} onClick={() => setOpenOrder(true)}>
              购买课程
              <OrderForm open={openOrder} setOpen={setOpenOrder} courseId={courseId} buy={buy}
                         setBuy={setBuy}></OrderForm>
            </Button>
          ) : (
            ''
          ),

        ],

      }}
    >
      <div className={styles.main}>
        <GridContent>
          <Card title={"课程统计"} bordered={false}>
            <Row gutter={16}>
              <Descriptions.Item>
                <Image width={90} src={data?.logo} style={{borderRadius: '50%'}}/>
              </Descriptions.Item>
              <Col span={2}>
                <Statistic title="购买数" value={data?.buyCount} prefix={<LikeOutlined/>}/>
              </Col>
              <Col span={2}>
                <Statistic title="点击数" value={data?.clickNum} prefix={<FireOutlined/>}/>
              </Col>
              <Col span={2}>
                <Statistic title="状态" value={data?.status == 1 ? "上架" : "未上架"}/>
              </Col>
              <Col span={2}>
                <Statistic title="课程金额" value={data?.currentPrice} prefix="¥"/>
              </Col>
              <Col span={2}>
                <Statistic title="课程金额" value={data?.currentPrice} prefix="¥"/>
              </Col>
            </Row>
          </Card>
        </GridContent>
      </div>
      <Card loading={loading}>
        <Descriptions title="教师信息" layout="vertical" bordered style={{marginBottom: 32}}>
          <Descriptions.Item label="教师名称">
            <div>
              <Avatar
                // size="small"
                className={styles.avatar}
                src={data?.teacherVO.picPath}
                alt="avatar"
              />
              <span style={{marginLeft: '10px'}}>{data?.teacherVO.name}</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="教师专业"><span className="bold-black">{data?.teacherVO.major}</span></Descriptions.Item>
          <Descriptions.Item label="教师简介"><span className="bold-black">{data?.teacherVO.introduction}</span></Descriptions.Item>
          <Descriptions.Item label="联系方式"><span className="bold-black">{data?.teacherVO.phone}</span></Descriptions.Item>
          <Descriptions.Item label="教师邮箱"><span className="bold-black">{data?.teacherVO.email || "暂无"}</span></Descriptions.Item>
          <Descriptions.Item label="教育背景"><span className="bold-black">{data?.teacherVO.education || "暂无"}</span></Descriptions.Item>
        </Descriptions>
        <Divider style={{marginBottom: 32}}/>
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
              content={comment.content}
              datetime={comment.addTime}
              avatar={comment.userImgUrl}
              actions={[
                <div key={`comment-action-${comment.commentId}`} style={{ display: "flex", alignItems: "center", marginBottom: "10px", justifyContent: "space-between" }}>
                  <span
                    key={`comment-like-\${comment.commentId}`}
                    style={{ marginRight: "10px", cursor: "pointer", color: comment.liked ? "red" : "" }}
                    // className={comment.liked ? "liked-button" : ""}
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
                    onClick={() => deleteComment({commentId: comment.commentId, userId: initialState?.currentUser.id})}
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
                      style={{ marginRight: "10px", width: "200%" }}
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
  );
};

export default CourseInfo;
