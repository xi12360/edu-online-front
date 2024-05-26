import React from "react";
import {Divider, Image} from "antd";
import styles from "@/pages/HomePage/components/StudentComment.less";
import { FireTwoTone } from "@ant-design/icons/lib/icons";


const PageTail: React.FC=()=>{
  return(
    <>
      <Divider className={styles.DividerStyle} style={{marginTop: '40px'}} orientation="left">
        <FireTwoTone twoToneColor="#52c41a"/>
        <p>寄语</p>
      </Divider>
      <div style={{fontSize: "30px",fontFamily: "微软雅黑", textAlign: "center"}}>每个人心中都有个GOAT，我的GOAT就是默默付出的你</div>
    </>
  )
}
export default PageTail;
