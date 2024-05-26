import React, {useEffect, useState} from "react";
import {Button,  Drawer, List} from 'antd';
import {DescriptionItemProps, UserMessageData} from "@/pages/UserMessage/components/data";
import {useModel} from "@@/plugin-model/useModel";
import {useRequest} from "@@/plugin-request/request";
import {queryArticleLikeUsingGET} from "@/pages/forum/articles/service";
import {queryUserMessage} from "@/pages/UserMessage/components/service";

import {UserOutlined} from "@ant-design/icons";



const DemoMessage: React.FC=()=>{
  const {initialState} = useModel('@@initialState');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<UserMessageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryUserMessage(initialState.currentUser.id);
        const MessageData = result?.data || []
        if(result.data=[]){console.log("data is empty!!!!")}
        setData(MessageData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Open
      </Button>
      <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
        <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          System Message
        </p>
        <List
          className="comment-list"
          header={`${data.length} messages`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <li>
              <Comment author={item.id} avatar={UserOutlined} content={item.content} datetime={item.addTime}/>
            </li>
          )}
        />
      </Drawer>
      <div></div>

    </>
  );
}

export default DemoMessage;


