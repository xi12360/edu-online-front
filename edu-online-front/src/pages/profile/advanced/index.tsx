
import {PageContainer} from '@ant-design/pro-layout';
import {Image, Card, Descriptions, Divider, Button, message, Avatar, List, Tag} from 'antd';
import React, {useState} from 'react';
import {history, request, useModel, useParams, useRequest} from 'umi';
import {likeCourseComment, publishCourseComment, queryBuy, queryCommentUsingGET, queryCourseInfo} from './service';
import {
  CheckOutlined,
  DeleteOutlined,
  DollarOutlined, DownloadOutlined,
  FileAddOutlined, FireOutlined, HeartOutlined, LikeOutlined, LoadingOutlined, MessageOutlined,
  RollbackOutlined, StarOutlined,
  StopOutlined,
} from '@ant-design/icons';
import OrderForm from './components/OrderForm';
import UpdateForm from './components/UpdateForm';
import MyModal from '@/components/Modal';
import styles from './style.less';
import TestForm from "@/pages/profile/CourseInfo/components/TestForm";
import {Col, Row, Statistic} from 'antd';
import {CourseCommentVO} from "@/pages/profile/CourseInfo/data";
import TextArea from "antd/es/input/TextArea";
import {SizeType} from "@ant-design/pro-form/es/BaseForm";


interface RouteParams {
  courseId: string;
}

const CourseInfo: React.FC = () => {

  const handleGoBack = () => {
    history.goBack();
  };

  const [buy, setBuy] = useState<number>(0);
  const [size, setSize] = useState<SizeType>('large');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [commentVOList, setCommentVOList] = useState<CourseCommentVO[]>([])
  const [totalNum, setTotalNum] = useState<number>(0);
  const {courseId} = useParams<RouteParams>();
  const [getSearchVal, setGetSearchVal] = useState<string>('');
  const getIptValue = (event: { target: { value: any } }) => {
    setGetSearchVal(event.target.value);
  };

  const inputRef = React.useRef(null);

  //  获取用户信息
  const {initialState} = useModel('@@initialState');

  async function queryBuyFunction() {
    const isBuy = await queryBuy(initialState.currentUser.id, courseId);
    message.success(isBuy.data)
    // 在这里使用 isBuy 的结果
    setBuy(isBuy.data);
  }

  async function publishComment() {
    const response = await publishCourseComment( {courseId: courseId, content: getSearchVal, userId: initialState.currentUser.id || ""});
    if(response) {
      message.success("评论成功");
    }
  }

  async function handleLikeComment(commentId: string) {
    const res = await likeCourseComment({commentId: commentId, userId: initialState.currentUser.id || ""});
    if(res) {
      message.success("点赞成功");
    }
  }

  async function showChildComments() {

  }

  const {data, loading} = useRequest(() => {
    queryBuyFunction();
    // message.success(buy);
    return queryCourseInfo(courseId);
  });

  const {commentList,  loadMore, loadingMore} = useRequest(
    () => {
      const vo = queryCommentUsingGET({
        courseId: courseId,
        current: currentPage,
        pageSize: pageSize,
      });
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

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const [openOrder, setOpenOrder] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [openPull, setOpenPull] = useState(false);

  const loadMoreDom = totalNum > commentVOList.length && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={loadMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loadingMore ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );

  return (
    <PageContainer
      loading={loading}
      header={{
        title:
          data?.courseName +
          '——' +
          (data?.status == 3
            ? '审核未通过'
            : data?.status == 0
              ? '待审核'
              : data?.status == 1
                ? '已上架'
                : data?.status == 2
                  ? '已下架'
                  : '无效'),

        extra: [

          <Button type="primary" icon={<RollbackOutlined/>} onClick={handleGoBack} key="3">
            返回上一级
          </Button>,

          buy == 1 ? (
            // <Button type="primary" href={`/profile/course-test/${data?.courseId}`}>
            <Button type="primary" onClick={() => setOpenOrder(true)}>
              在线测试
              <TestForm open={openOrder} setOpen={setOpenOrder} courseId={courseId}></TestForm>
            </Button>
          ) : (
            ''
          ),
          buy == 1 ? (
            <Button type="primary" icon={<DownloadOutlined />} size={size} href={data?.subjectLink} download>
              课程资料
            </Button>
          ) : (
            ''
          ),

          (data?.status == 0 || data?.status == -1) &&
          initialState?.currentUser?.id == data?.teacherVO.teacherId ? (
            <Button
              key={1}
              icon={<DeleteOutlined/>}
              onClick={async () => {
                try {
                  const response = await request<{
                    data: number;
                  }>('/api/course/delete', {
                    params: {courseId},
                  });
                  if (response.data) {
                    message.success('提交成功');
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                  console.error(error);
                }
              }}
            >
              删除删除
            </Button>
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
                teacherId={data?.teacherVO.id}
              ></MyModal>
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
                    params: {courseId, status: 0},
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
          initialState?.currentUser?.id == data?.courseId &&
          (data?.status == -1 || data?.status == 0) ? (
            <Button key={3} icon={<FileAddOutlined/>} onClick={() => setOpenModify(true)}>
              修改课程
              <UpdateForm
                open={openModify}
                setOpen={setOpenModify}
                courseId={data?.courseId}
              ></UpdateForm>
            </Button>
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
      <Row gutter={16}>
        <Col span={2}>
          <Statistic title="购买数" value={data?.buyCount} prefix={<LikeOutlined/>}/>
        </Col>
        <Col span={2}>
          <Statistic title="点击数" value={data?.clickNum} prefix={<FireOutlined/>}/>
        </Col>
      </Row>
      <Card loading={loading}>
        <Descriptions title="课程信息" style={{marginBottom: 32}}>
          <Descriptions.Item label="课程名称">{data?.title}</Descriptions.Item>
          <Descriptions.Item label="课程ID">{data?.courseId}</Descriptions.Item>
          <Descriptions.Item label="课程价格">{data?.currentPrice} ¥</Descriptions.Item>
          <Descriptions.Item label="结束时间">{data?.endTime}</Descriptions.Item>
        </Descriptions>
        <Divider style={{marginBottom: 32}}/>
        <Descriptions title="课程详情" style={{marginBottom: 32}}>
          <Descriptions.Item>
            <Image width={200} src={data?.logo} style={{borderRadius: '50%'}}/>
          </Descriptions.Item>
          <Descriptions.Item label="课程简介">{data?.courseName}</Descriptions.Item>
        </Descriptions>
        <Divider style={{marginBottom: 32}}/>
        <Descriptions title="教师信息" style={{marginBottom: 32}}>
          <Descriptions.Item label="教师姓名">
            <div>
              <Avatar
                size="small"
                className={styles.avatar}
                src={data?.teacherVO.picPath}
                alt="avatar"
              />
              <span style={{marginLeft: '10px'}}>{data?.teacherVO.name}</span>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label="教师ID">{data?.teacherVO.id || "暂无"}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{data?.teacherVO.phone || "暂无"}</Descriptions.Item>
          <br/>
          <Descriptions.Item label="教师专业">{data?.teacherVO.major || "暂无"}</Descriptions.Item>
          <Descriptions.Item label="教师简介">{data?.teacherVO.introduction || "暂无"}</Descriptions.Item>
          <Descriptions.Item label="教师邮箱">{data?.teacherVO.email || "暂无"}</Descriptions.Item>
        </Descriptions>
        <Divider style={{marginBottom: 32}}/>

        {data?.status ? (
          <div>
            <Descriptions title="课程状态信息">
              {Object.entries(data.buyCount).map(([key, value]) => (
                <Descriptions.Item key={key} label={key}>
                  {value}
                </Descriptions.Item>
              ))}
            </Descriptions>
            <Divider style={{marginBottom: 32}}/>
          </div>
        ) : (
          ''
        )}
      </Card>
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <TextArea
          name="comment"
          showCount
          maxLength={100}
          style={{ height: 70, resize: 'none' }}
          placeholder="最多100字"
          onChange={getIptValue}
          ref={inputRef}
        />
        <Button type="primary" onClick={publishComment}>发布评论</Button>
        <List<CourseCommentVO>
          size="large"
          loading={loading}
          rowKey="commentId"
          itemLayout="vertical"
          loadMore={loadMoreDom}
          dataSource={commentVOList}
          renderItem={(item) => (
            <List.Item
              key={item.commentId}
              actions={[
                <Button type="text" icon={<HeartOutlined />} onClick={()=>handleLikeComment(item.commentId)}>  {item.praiseCount}</Button>,
                <Button type="text" icon={<MessageOutlined />} onClick={showChildComments}>  {item.replyCount}</Button>,
              ]}
              extra={<div className={styles.listItemExtra} />}
            >
              <List.Item.Meta
                title={
                  <a className={styles.listItemMetaTitle} href={""}>
                    {item.addTime}
                  </a>
                }
                description={
                  <span>
                    <Tag>评论</Tag>
                    <Tag>{item.content}</Tag>
                  </span>
                }
              />
              {/*<CourseComment data={}/>*/}
            </List.Item>
          )}
        />
      </Card>

    </PageContainer>
  );
};

export default CourseInfo;

