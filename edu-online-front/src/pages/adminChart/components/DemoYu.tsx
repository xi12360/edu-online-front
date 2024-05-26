import React, { useEffect, useState } from 'react';
import {listMostClickArticle, listMostClickCourse} from "@/pages/adminChart/service";
import {ArticleClickVO, CourseClickVO} from "@/pages/adminChart/data";
import {Card, Col, PageHeader, Row, Spin} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import { RadialBar } from '@ant-design/charts';
import {useModel} from "@@/plugin-model/useModel";

const CourseClickRadialChart = () => {
  const [data, setData] = useState<CourseClickVO[]>([]);
  const [loading, setLoading] = useState(true);
  const {initialState, setInitialState} = useModel('@@initialState');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await listMostClickCourse(initialState?.token);
        const articleData = result?.data?.courseClickListVO || [];
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
  data: data.map((item) => ({ title: item.title, praiseNum: item.clickNum })),
  xField: 'title',
  yField: 'praiseNum',
  colorField: 'title',
  radius: 0.8,
  label: {
    style: {
      fill: '#fff',
    },
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
              <PageHeader title="最多点击前十课程统计表" />
              <RadialBar {...config}/>
            </Card>
          </Col>
        </Row>
      </Spin>
    </PageContainer>)
};

export default CourseClickRadialChart;
