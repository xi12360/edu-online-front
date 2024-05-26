import React, { useEffect, useState } from 'react';
import {Card, Col, PageHeader, Row, Spin} from 'antd';
import {Pie, Radar} from '@ant-design/charts';
import {listMostFavorArticle, listMostFavorCourse} from "@/pages/adminChart/service";
import {PageContainer} from "@ant-design/pro-layout";
import {useModel} from "@@/plugin-model/useModel";
import {CourseFavorVO} from "@/pages/adminChart/data";

interface ArticleFavorVO {
  articleId: string;
  praiseNum: number;
  title: string;
}

export default function MostFavorArticlesStatistic() {
  const [data, setData] = useState<CourseFavorVO[]>([]);
  const [loading, setLoading] = useState(true);
  const {initialState, setInitialState} = useModel('@@initialState');
  useEffect(() => {
    async function fetchData() {
      const result = await listMostFavorCourse(initialState?.token);
      setData(result.data.courseFavorListVO.slice(0, 10));
      setLoading(false);
    }
    fetchData();
  }, []);

  const config = {
    data: data.map((item) => ({ category: item.title, value: item.praiseNum })),
    xField: 'category',
    yField: 'value',
    lineConfig: {
      smooth: true,
    },
    point: {
      shape: 'circle',
    },
  };

  return (
    <>
      <PageContainer title="" header={{
        title: ''
      }}>
        <Spin spinning={loading}>
          <Row gutter={16}>
            <Col span={24}>
              <Card>
                <PageHeader title="最多购买前十课程统计表" />
                <Radar {...config} />
              </Card>
            </Col>
          </Row>
        </Spin>
      </PageContainer>
    </>
  );
}
