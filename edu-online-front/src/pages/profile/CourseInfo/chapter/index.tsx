import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, List, message, Typography} from 'antd';
import {courseInfoVO} from "@/pages/profile/CourseInfo/data";
import {useRequest} from "@@/plugin-request/request";
import {queryCourseChapterInfo, queryCourseInfoList} from "@/pages/profile/CourseInfo/service";
import {useHistory, useLocation, useParams} from "umi";
import {DownloadOutlined} from "@ant-design/icons";
import {Link} from "umi";

const {Title, Paragraph} = Typography;


interface RouteParams {
  courseInfoId: string;
}
const App: React.FC = () => {

  const {courseInfoId} = useParams<RouteParams>();
  const [videoLink, setVideoLink] = useState<string>('');
  const [list, setList] = useState<courseInfoVO[]>([]);
  const [infoTotalNum, setInfoTotalNum] = useState(0);
  const [data, setData] = useState<courseInfoVO>();
  const { loading} = useRequest(async () => {
      const res = await queryCourseChapterInfo(courseInfoId);
      const vo = await res.data;
      setData(vo);
    }
  );

  useEffect(() => {
    // 模拟异步获取视频链接的过程
    setTimeout(async () => {
      setVideoLink(data?.videoLink);
      const res = await queryCourseInfoList(data?.courseId);
      const vo = await res.data;
      setList(vo.courseInfoVOList);
    }, 100); // 假设0.1秒后获取到视频链接的数据
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const msg = await queryCourseChapterInfo(courseInfoId);
      const vo = await msg.data;
      setData(vo);
    };
    fetchData();
  }, [courseInfoId]);

  return (
    <Typography>
      <div style={{ position: "absolute", top: 0, right: 0, width: "25%" }}>
        <Card>
            {/* 文件下载按钮 */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Button type="primary" icon={<DownloadOutlined />} size="middle">
              下载课程章节资料
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Title level={2}>课程章节一览</Title>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                  title={(
                    <Link
                      to={`/profile/course-chapter-info/${item.id}`}
                      style={{ color: 'blue', fontWeight: 'bold', fontSize: '14px' }}
                    >
                      {item.title}
                    </Link>
                  )}
                  description={item.intro}
                />
              </List.Item>
              )}
          />
        </Card>
      </div>
      <Card style={{ width: '70%' }}>
        <Title>{data?.title}</Title>
        <Title level={3}>章节简介:</Title>
        <Paragraph style={{ fontSize: "1em", fontWeight: "bold" }}>
          <pre>{data?.intro}</pre>
        </Paragraph >
        <Title level={3}>章节内容:</Title>
        <Paragraph style={{ fontSize: "1em", fontWeight: "bold" }}>
          <pre>{data?.content}</pre>
        </Paragraph>
        <Title level={2}>课程视频</Title>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card style={{ width: '70%' }}>
          {/* 视频播放框 */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <video src={videoLink} controls style={{ width: '90%', height: '90%' }}>
              <source type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </Card>

      </div>
    </Typography>
  )
};

export default App;
