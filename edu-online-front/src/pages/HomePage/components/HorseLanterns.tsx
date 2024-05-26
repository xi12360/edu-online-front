import React from "react";
import {Carousel, Divider, Image} from "antd";
import styles from "./HorseLaterns.less"
import HeartOutlined from "@ant-design/icons/lib/icons/HeartOutlined";
import {history} from "umi";



const contentStyle: React.CSSProperties = {
  maxHeight: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
const LanternImageStyle: React.CSSProperties ={

    width: 'auto',
    height: 'auto',
  objectFit: "cover"
}
const HorseLanterns: React.FC=()=>{
  return (
    <>
      <Carousel autoplay>
       <div style={LanternImageStyle} onClick={()=>{
           history.push(
               {
                   pathname: '/profile/course-info/course_gt8struhos3g636lqdijozljx2i5ru',
                   query:{

                   }
               }
           )
       }

       }>
        <Image height="500px" src="https://img.book118.com/sr1/M00/15/37/wKh2Al5nyrSIGKObAAEeVVi-B2gAAiNcQGmRKAAAR5t935.jpg"></Image>
       </div>
      <div style={LanternImageStyle} onClick={()=>{history.push({pathname: '/profile/course-info/course_i8e1bijjr2xfohtbvsn6z87vd3wdcl', query:{}})}}>
        <Image height="500px" src="https://th.bing.com/th/id/R.7317941f83790c0d45f034494d533a92?rik=U5JD7ryKC0TrUQ&riu=http%3a%2f%2fwww.a-eye.cn%2fuploads%2fimg1%2f20200821%2f5f3f386772e32.jpg&ehk=CdwXKNBDzTGHx0GfrU3RYFNr639MIBdMWA8FWXhoyJ8%3d&risl=&pid=ImgRaw&r=0"></Image>
      </div>
      <div style={LanternImageStyle} onClick={()=>{history.push({pathname: '/profile/course-info/course_mpv0yxl5jyr7vodw4v8xp4s2tg4h3m', query:{}})}}>
        <Image height="500px" src="https://px.thea.cn/Public/Upload/Uploadfiles/image/20150523/20150523151616_36803.png"></Image>
      </div>
     </Carousel>
    </>
  );

}
export default HorseLanterns;
