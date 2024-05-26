import {
  ContactsOutlined,
  PhoneOutlined,
  RadarChartOutlined,
} from '@ant-design/icons';
import {Button, Card, Col, Divider, message, Row} from 'antd';
import React, { useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import type { RouteChildrenProps } from 'react-router';
import OrderHistory from './components/OrderHistory';
import MyCourse from './components/MyCourse';
import Comments from './components/Comments';
import MyPublish from './components/MyPublish';
import type { tabKeyType } from './data.d';
import styles from './Center.less';
import MyFavorArticle from "@/pages/account/center/components/MyFavor";

const operationTabList = [
  {
    key: 'myFavorCourse',
    tab: (
      <span>
        我的课程 <span style={{ fontSize: 14 }} />
      </span>
    ),
  },
  {
    key: 'myArticle',
    tab: (
      <span>
        我发布的文章 <span style={{ fontSize: 14 }} />
      </span>
    ),
  },
  {
    key: 'myFavorArticle',
    tab: (
      <span>
        我收藏的文章 <span style={{ fontSize: 14 }} />
      </span>
    ),
  },
  // myFavorArticle
];

const Center: React.FC<RouteChildrenProps> = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('myFavorCourse');

  //  获取用户信息
  const { initialState, loading } = useModel('@@initialState');

  //  渲染用户信息
  const renderUserInfo = ({ access, name, phone }: Partial<API.CurrentUser>) => {

    return (
      <div className={styles.detail}>

        <p>
          <RadarChartOutlined
            style={{
              marginRight: 8,
            }}
          />
          名称: {name}
        </p>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          用户角色: {access}
        </p>
        <p>
          <PhoneOutlined
            style={{
              marginRight: 8,
            }}
          />
          手机号: {phone}
        </p>
      </div>
    );
  };

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'myFavorCourse') {
      return <MyCourse key="myFavorCourse" />;
    }
    if (tabValue === 'myArticle') {
      return <MyPublish key="myArticle" />;
    }
    if (tabValue === 'myFavorArticle') {
      return <MyFavorArticle key="myFavorArticle" />;
    }
    return null;
  };

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && initialState?.currentUser && (
              <div>
                <div className={styles.avatarHolder}>
                  <img alt="" src={initialState.currentUser.picImg || "https://ts1.cn.mm.bing.net/th/id/R-C.1bd4619895b23e93c14ead740b9524ec?rik=IoGxECWc4wUyLA&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20181216%2f5ac69ccd7a5747c3896f3f6d08eebb88.jpeg&ehk=%2bRuckXoyVFZA0NqvaFYN4N83C9u%2bvU5PsizwK1It2Eg%3d&risl=&pid=ImgRaw&r=0"} />
                  <div className={styles.name}>{initialState.currentUser.name}</div>
                </div>
                {renderUserInfo(initialState.currentUser)}
                <Divider dashed />
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
            onTabChange={(_tabKey: string) => {
              setTabKey(_tabKey as tabKeyType);
            }}
          >
            {renderChildrenByTabKey(tabKey)}
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};
export default Center;
