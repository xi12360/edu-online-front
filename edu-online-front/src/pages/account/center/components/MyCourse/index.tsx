import {Avatar, Card, Input, List, message, Typography} from 'antd';
import { useRequest, Link } from 'umi';
import React, { useState } from 'react';
import type {CourseVO} from '../../data';
import styles from './index.less';
import {queryCourseLikeUsingGET} from "@/pages/course/service";
import {useModel} from "@@/plugin-model/useModel";
import {PageContainer} from "@ant-design/pro-layout";
import {FireOutlined, PayCircleOutlined} from "@ant-design/icons";
import {queryMyFavorCourse} from "@/pages/account/center/service";

const { Paragraph } = Typography;

const MyCourse: React.FC = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<CourseVO[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [name, setName] = useState<string>("");
  const {initialState, setInitialState} = useModel('@@initialState');
  const {loading} = useRequest(
    async () => {
      let result;
      if(initialState?.currentUser.access == 'canStudent') {
        result = await queryMyFavorCourse({role: 1,userId: initialState?.currentUser.id, current: current, pageSize: pageSize});
      } else {
        result = await queryMyFavorCourse({role: 2,userId: initialState?.currentUser.id, current: current, pageSize: pageSize});
      }
      return result;
    },
    {
      onSuccess: (result) => {
        setTotalNum(result.totalNum);
        setListData(result.courseVOList);
      },
    },
  );

  function changePage(_page: number, _pageSize: number) {
    if(initialState?.currentUser.access == 'canStudent') {
      queryMyFavorCourse({role: 1,userId: initialState?.currentUser.id, current: _page, pageSize: _pageSize})
        .then((result) => {
          setListData(result.data.courseVOList);
          setTotalNum(result.data.totalNum);
        })
    } else {
      queryMyFavorCourse({role: 2,userId: initialState?.currentUser.id, current: _page, pageSize: _pageSize})
        .then((result) => {
          setListData(result.data.courseVOList);
          setTotalNum(result.data.totalNum);
        })
    }
    // setListData(result.courseVOList);
    setCurrentPage(_page);
    setPageSize(_pageSize);
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 件`;
  }

  const paginationProps = {
    onChange: changePage,
    showSizeChanger: true,
    showQuickJumper: true,
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
    pageSizeOptions: [8, 16, 24, 36],
  };


  const cardList = listData && (
    <List<CourseVO>
      rowKey="courseId"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      pagination={paginationProps}
      dataSource={listData}
      renderItem={(item) => (
        <List.Item>
          <Link to={`/profile/course-info/${item.courseId}`}>
            <Card
              className={styles.card}
              hoverable
              cover={<img alt={item.courseName} src={item.logo} width={100} height={200}/>}
              size={"small"}
            >
              <Card.Meta
                title={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <a>{item.courseName}</a>
                    <div className={styles.avatarList}>
                      <span style={{fontSize: '13px', marginRight: '10px'}}>
                        {item.courseName}
                      </span>
                      <Avatar
                        size="small"
                        className={styles.avatar}
                        src={item.logo}
                        alt="avatar"
                      />
                    </div>
                  </div>
                }
                description={
                  <div>
                    <b style={{color: 'darkblue', fontWeight: 'bolder', fontSize: '15px'}}>
                      ¥ {item.currentPrice}
                    </b>
                    <span style={{marginRight: '10px'}}></span>
                    <b style={{color: 'darkblue', fontWeight: 'bolder', fontSize: '15px'}}>
                      <FireOutlined />{item.viewCount}
                    </b>
                    <span style={{marginRight: '10px'}}></span>
                    <b style={{color: 'darkblue', fontWeight: 'bolder', fontSize: '15px'}}>
                      <PayCircleOutlined />{item.buyCount}·
                    </b>
                    <span style={{marginRight: '10px'}}></span>
                    <b style={{color: 'darkblue', fontWeight: 'bolder', fontSize: '15px'}}>
                      {item.status === 1 ? '进行中' : '结束或下架'}
                    </b>
                    <Paragraph
                      style={{marginTop: 3, whiteSpace: 'pre-wrap'}}
                      className={styles.item}
                      ellipsis={false}
                    >
                      课程号 {item.lessonNum}
                    </Paragraph>
                  </div>
                }
              />
              <div className={styles.cardItemContent}>
                <span>{item.endTime}</span>
              </div>
            </Card>
          </Link>
        </List.Item>
      )}
    />
  );

  return (
    <div>
      <PageContainer>
        <div className={styles.coverCardList}>
          <div className={styles.cardList}>{cardList}</div>
        </div>
      </PageContainer>
    </div>
  );
};

export default MyCourse;
