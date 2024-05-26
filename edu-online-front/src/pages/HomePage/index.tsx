import React, {useEffect, useState} from "react";
import HorseLanterns from "@/pages/HomePage/components/HorseLanterns";
import styles from "@/pages/HomePage/Styles.less"
import HeadLogo from "@/pages/HomePage/components/PageHead"
import {Col, Divider, message, Row} from "antd";
import SchoolImage from "@/pages/HomePage/components/SchoolImage";
import {HeartTwoTone} from "@ant-design/icons";
import PageTail from "@/pages/HomePage/components/PageTail";
import StudentComment from "@/pages/HomePage/components/StudentComment";

const HomePage: React.FC=()=>{

    return(
      <div className={styles.earlyMorning}>
      <HeadLogo  />
      <Divider className={styles.DividerStyle} style={{marginTop: '40px'}} orientation="left">
        <HeartTwoTone twoToneColor="#eb2f96" style={{fontSize: '26px'}}/>
        <p>热门课程: </p>
      </Divider>
      <Row>
        <Col span={1}>
        </Col>
        <Col span={3}>
        </Col>
        <Col span={16}>
          <div className={styles.LanternBackground}>
            <HorseLanterns />
          </div>
        </Col>
        {/*<Col span={4}>col-4</Col>*/}
        <Col span={3}>
        </Col>
        <Col span={1}>
        </Col>
      </Row>
      <SchoolImage/>
        <div>
          <StudentComment />
        </div>
      <div>
        <PageTail />
      </div>
      </div>
  );
}
export default HomePage;
