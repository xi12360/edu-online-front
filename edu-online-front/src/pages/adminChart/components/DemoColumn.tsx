import React, { useEffect, useState } from 'react';
import {listMostClickArticle} from "@/pages/adminChart/service";
import {ArticleClickVO} from "@/pages/adminChart/data";
import {Column} from "@ant-design/plots";
import {Card, Col, PageHeader, Row, Spin} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {useModel} from "@@/plugin-model/useModel";

const ArticleClickChart = () => {
  const [data, setData] = useState<ArticleClickVO[]>([]);
  const [loading, setLoading] = useState(true);
  const {initialState, setInitialState} = useModel('@@initialState');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listMostClickArticle(initialState?.token);
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

  const config = {
    xField: 'title',
    yField: 'clickNum',
    seriesField: 'title',
    legend: { position: 'top' },
    title: {
      visible: true,
      text: '点击数量统计',
    },
  };

  // @ts-ignore
  return (
    <PageContainer title="" header={{
      title: ''
    }}>
    <Spin spinning={loading}>
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <PageHeader title="最多点击前十文章统计表" />
            <Column {...config} data={data} />
          </Card>
        </Col>
      </Row>
    </Spin>
  </PageContainer>
  )
};

export default ArticleClickChart;
