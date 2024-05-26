import {Drawer, Button, List, message} from 'antd';
import React, { useState} from "react";
import {courseInfoVO} from "@/pages/profile/CourseInfo/data";
import {useRequest} from "@@/plugin-request/request";
import {queryCourseInfoList} from "@/pages/profile/CourseInfo/service";
import {Link} from "umi";
interface CourseChapterDrawerProps {
  courseId: string; // 根据实际类型设定
}
const CourseChapterDrawer: React.FC<CourseChapterDrawerProps> = (props) => {
  const [list, setList] = useState<courseInfoVO[]>([]);
  const [visible, setVisible] = useState(false);
  const [infoTotalNum, setInfoTotalNum] = useState(0);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useRequest(() => {
    const vo = queryCourseInfoList(props.courseId);
    return vo;
  }, {
    onSuccess(vo) {
      setList(vo?.courseInfoVOList);
      setInfoTotalNum(vo?.totalNum);
    },
  })

  const handleItemClick = (item: courseInfoVO) => {
    // 处理点击列表项的逻辑
    console.log('跳转到：', item);
  };

  // message.success("listNum" + list.length || 0)
  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        学习课程
      </Button>
      <Drawer
        title="课程目录"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <List
          dataSource={list}
          renderItem={item => (
            <List.Item
              onClick={() => handleItemClick(item)}
              style={{cursor: 'pointer'}}
            >
              <Link
                to={`/profile/course-chapter-info/${item.id}`}
                style={{ color: 'black', fontWeight: 'bold' }}
              >
                {item.title}
              </Link>
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );

}

export default CourseChapterDrawer;
