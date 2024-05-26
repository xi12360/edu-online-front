import React, {useState} from 'react';
import styles from './style.less'
import {ArticleClickVO} from "@/pages/adminChart/data";
import {useRequest} from "@@/plugin-request/request";
import {listMostClickArticle} from "@/pages/adminChart/service";
import {Column} from "@ant-design/plots";
import {Card, message} from 'antd';
import ArticleClickChart from "@/pages/adminChart/components/DemoColumn";
import FavorPie from "@/pages/adminChart/components/DemoPie";
import DemoRadius from "@/pages/adminChart/components/DemoRadius";
import DemoYu from "@/pages/adminChart/components/DemoYu";
import ArticleClickRadialChart from "@/pages/adminChart/components/DemoYu";
import {useModel} from "@@/plugin-model/useModel";
import CourseClickRadialChart from '@/pages/adminChart/components/DemoYu';

const Page: React.FC = () => {

  const [articleClickVOData, setArticleClickVOData] = useState<ArticleClickVO[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const {initialState, setInitialState} = useModel('@@initialState');

  const {loading} = useRequest(
    () => {
      const result = listMostClickArticle(initialState?.token);
      return result;
    },
    {
      onSuccess: (result) => {
        message.success(result?.totalNum);
        setArticleClickVOData(result?.articleVOList);
        setTotalNum(result?.totalNum);
      },
    },
  );


  const config = {
    locale:'zh-CN',
    articleClickVOData,
    xField: 'title',
    yField: 'praiseNum',
    title: '点赞最高文章柱状图',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      title: {
        alias: '文章标题',
      },
      praiseNum: {
        alias: '点赞量',
      },
    },
  };


  return (
    // <div className={styles.TotalChart}>
    //   <div className={styles.ChartItem}>
    //     {/*<Column {...config} />*/}
    //   </div>
    // </div>
  <div>
    <Card>
      <ArticleClickChart />
      <FavorPie/>
      <DemoRadius />
      <CourseClickRadialChart />
    </Card>
  </div>
  )
};
export default Page;
