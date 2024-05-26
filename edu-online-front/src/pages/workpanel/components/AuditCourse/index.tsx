import {Avatar, Button, Card, Input, List, Typography} from 'antd';
import { useRequest, Link } from 'umi';
import React, {FC, useState} from 'react';
import styles from './index.less';
import {CourseVO} from "@/pages/course/data";
import {useModel} from "@@/plugin-model/useModel";
import {queryCourseLikeUsingGET} from "@/pages/course/service";
import {PageContainer} from "@ant-design/pro-layout";

const { Paragraph } = Typography;
const AuditCourse: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [listData, setListData] = useState<CourseVO[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [name, setName] = useState<string>("");
  const {initialState, setInitialState} = useModel('@@initialState');
  const {loading} = useRequest(
    () => {
      const result = queryCourseLikeUsingGET({name: "", current: currentPage, pageSize: pageSize, status: 0});
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
    queryCourseLikeUsingGET({name: name, current: _page, pageSize: _pageSize})
      .then((result) => {
        setListData(result.data.courseVOList);
        setTotalNum(result.data.totalNum);
      })
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

  const handleFormSubmit = async (value: string) => {
    setName(value);
    const result = await queryCourseLikeUsingGET({name: value, current: currentPage, pageSize: pageSize, status: 0});
    setListData(result.data.courseVOList || []);
    setTotalNum(result.data.totalNum || 0);
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
                      查看数:{item.clickNum}
                    </b>
                    <span style={{marginRight: '10px'}}></span>
                    <b style={{color: 'darkblue', fontWeight: 'bolder', fontSize: '15px'}}>
                      购买数:{item.buyCount}
                    </b>
                    <span style={{marginRight: '10px'}}></span>
                    <b style={{color: 'darkblue', fontWeight: 'bolder', fontSize: '15px'}}>
                      {item.status === 1 ? '已上架' : '待审核'}
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

  //  获取用户信息
  // const {initialState} = useModel('@@initialState');

  return (
    <div>
      <PageContainer title={false}
        content={
          <div style={{textAlign: 'left'}}>
            <Input.Search
              placeholder="请输入要查找的课程名称"
              enterButton="搜索"
              size="large"
              onSearch={handleFormSubmit}
              style={{maxWidth: 522}}
            />
          </div>
        }
      >
        <div className={styles.coverCardList}>
          <div className={styles.cardList}>{cardList}</div>
        </div>
      </PageContainer>
    </div>
  );
};

export default AuditCourse;
