import {Col, Divider, Image, Row} from "antd";
import BankTwoTone from "@ant-design/icons/lib/icons/BankTwoTone";
import React from "react";
import styles from "/src/pages/HomePage/components/SchoolImage.less"
import PageHead from "@/pages/HomePage/components/PageHead";


const SchoolImage: React.FC=()=>{
  return(
    <>
      <Divider className={styles.DividerStyle} style={{marginTop: '40px'}} orientation="left">
        <BankTwoTone style={{fontSize:"26px"}}/>
        <p>合作高校: </p>
      </Divider>
      <Row style={{marginTop: '20px'}} gutter={16}>
        <Col span={1}>
        </Col>
        <Col span={3}>
        </Col>
        <Col  span={4}>
          <Image height="100%" src={require('@/pages/HomePage/components/Photo/SEU.png')}  />
        </Col>
        <Col  span={4}>
          <Image height="100%" src={require('@/pages/HomePage/components/Photo/TJU.jpg')} />
        </Col>
        <Col span={4}>
          <Image height="100%" src={require('@/pages/HomePage/components/Photo/NJU.png')} />
        </Col>
        <Col  span={4}>
          <Image height="100%" src={require('@/pages/HomePage/components/Photo/NKU.png')} />
        </Col>
        <Col span={3}></Col>
        <Col span={1}>
        </Col>
      </Row>
    </>
  )
}
export default SchoolImage;
