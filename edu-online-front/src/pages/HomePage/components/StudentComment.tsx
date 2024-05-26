import {Card, Col, Divider, message, Row} from "antd";
import styles from "./StudentComment.less"
import React, {useEffect, useState} from "react";
import {LikeOutlined,LikeTwoTone} from "@ant-design/icons";
import { Link } from "umi";

const { Meta } = Card;

const StudentComment = () => {

    return(
      <>
        <Divider className={styles.DividerStyle} style={{marginTop: '40px'}} orientation="left">
        <LikeTwoTone twoToneColor="#eb2f96" style={{fontSize:"26px"}}/>
            <p>精彩文章</p>
        </Divider>
      <Row>
        <Col span={3}></Col>
        <Col span={6}>
        <Link to={`/profile/article-info/article_4kco8lisarlr2w3c9tkyzic0jav6bv`}>
          <Card hoverable style={{ width: 240 }}  cover={<img alt="example" src="https://edu-online-james.oss-cn-beijing.aliyuncs.com/image/2023/09/07/%25EY%7E0GSU0VQIH562644H1I5.jpg" width={100} height={300}/>}>
            <Meta title="一文读懂神经网络"
                  description={<div style={{ maxHeight: 100, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>一、什么是神经网络？相信大家在各种教程都能看的上面的神经网络，这是一个最简单的网络或者说是感知机，X输入，红色的input layer是输入层，hidden layer是隐藏层，output layer是输出层。神经网络是有多个隐藏层，也就是多层感知机（MLP）。
            </div>}
            />
          </Card>
          </Link>
        </Col>
        <Col span={6}>
        <Link to={`/profile/article-info/article_f49oabgugq6yfcij9hasnsz8uj8dpm`}>
          <Card hoverable style={{ width: 240 }}  cover={<img alt="example" src="https://edu-online-james.oss-cn-beijing.aliyuncs.com/image/2023/09/07/_J8P3N%25XXIA13FE4Z%29IWQSF.jpg" width={100} height={300}/>}>
            <Meta title="一文看懂决策树"
                  description={<div style={{ maxHeight: 100, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>决策树是一个预测模型，它代表的是对象属性与对象值之间的一种映射关系。树中每个节点表示某个对象，而每个分叉路径则代表某个可能的属性值，而每个叶节点则对应从根节点到该叶节点所经历的路径所表示的对象的值。从数据产生决策树的机器学习技术叫做决策树学习，通俗说就是决策树。
                  </div>}
            />
          </Card>
          </Link>
        </Col>
        <Col span={6}>
        <Link to={`/profile/article-info/article_k5g4gvctxyy6r23fj2fbe7rhw0yyja`}>
          <Card hoverable style={{ width: 240 }}  cover={<img alt="example" src="https://edu-online-james.oss-cn-beijing.aliyuncs.com/image/2023/09/07/%E6%8F%90%E5%8D%87%E6%88%90%E7%BB%A9.jpg" width={100} height={300} />}>
            <Meta title="提高学习成绩的8个方法"
                  description={<div style={{ maxHeight: 100, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>每个孩子都是一颗花的种子，只不过每个人的花期不同。有的花，一开始就会很灿烂地绽放，有的花，需要漫长的等待。不要看着别人怒放了，自己的那颗还没动静就着急，相信是花，都有自己的花期。细心地，呵护自己的花，慢慢地看着长大，陪着他沐浴阳光风雨，这何尝不是一种幸福。也许你的种子永远不会开花，因为他是参天大树
                  </div>}
            />
          </Card>
          </Link>
        </Col>
        <Col span={3}></Col>

      </Row>
      </>


    )
}
export default StudentComment;
