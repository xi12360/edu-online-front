import styles from "/src/pages/HomePage/components/PageHead.less"
import React from "react";


const PageHead: React.FC=()=>{
  return (
    <>
      <div style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',marginTop: "30px"}}>
        <h1 className={styles.logo}></h1>
        <p style={{alignSelf: 'flex-end',fontWeight: 'bold'}}>--您的定制教育品牌</p>
      </div>
    </>
  )
}
export default PageHead;
