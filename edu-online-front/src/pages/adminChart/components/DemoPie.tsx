import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {Row, Col, Card, Spin, PageHeader} from 'antd';
import { Pie } from '@ant-design/charts';
import {listMostFavorArticle} from "@/pages/adminChart/service";
import {ArticleFavorVO} from "@/pages/adminChart/data";
import {useModel} from "@@/plugin-model/useModel";

const FavorPie = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ArticleFavorVO[]>([]);
  const {initialState, setInitialState} = useModel('@@initialState');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listMostFavorArticle(initialState?.token);
        const articleData = result?.data?.articleVOList || [];
        setData(articleData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pieConfig = {
    data: data.slice(0, 10),
    angleField: 'praiseNum',
    colorField: 'title',
    radius: 0.8,
    label: {
      type: 'spider',
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };

  return (
    <PageContainer title="" header={{
      title: ''
    }}>
      <Spin spinning={loading}>
        <Row gutter={16}>
          <Col span={24}>
            <Card>
              <PageHeader title="最多点赞前十文章统计表" />
              <Pie {...pieConfig} />
            </Card>
          </Col>
        </Row>
      </Spin>
    </PageContainer>
  );
};

export default FavorPie;
