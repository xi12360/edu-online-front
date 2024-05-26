import {message, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {useModel, useRequest} from 'umi';
// import { SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import {MsgSystemVO, UserMessageData} from "@/components/RightContent/data";
import {queryUserMessage} from "@/components/RightContent/service";
import NoticeIcon from '../NoticeIcon/NoticeIcon';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }
  const {navTheme, layout} = initialState.settings;
  let className = styles.right;
  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<UserMessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState<MsgSystemVO[]>([]);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [count, setCount] = useState<number>(initialState?.unReadMsg);
  // const [noticeList, setNoticeList] = useState<API.NoticeIconItem[]>([]);
  const handleClear = () => {
    setCount(0);
  };

  const noticeList: API.NoticeIconItem[] = listData.map((item) => ({
    id: item.id,
    title: item.content,
    datetime: new Date(item.addTime).toISOString(),
    read: Boolean(item.status),
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
  }));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await queryUserMessage(initialState.currentUser.id);
        console.log(data)
        setListData(result.data.msgSystemVOList);
        setTotalNum(result.data.totalNum);

        setLoading(false);

        message.success("1")
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const showNotice = () => {
    setOpen(true)
  }

  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
      />
      <span
        className={styles.action}
        onClick={() => {
          // window.open('https://pro.ant.design/docs/getting-started');
          message.success("系统消息");
          showNotice();

          // showDrawer();
        }}
      >
        {/*<MessageOutlined />*/}
        <NoticeIcon
          count={count}
          onItemClick={(item) => {
            message.info(`已读`);
          }}
          loading={false}
          clearText="清空"
          viewMoreText="查看更多"
          onViewMore={() => {
            message.info('点击了查看更多');
          }}
          clearClose={true}
        >
          {[
            <NoticeIcon.Tab
              key="notification"
              tabKey="notification"
              count={count}
              list={noticeList}
              title="通知"
              emptyText="你已查看所有通知"
              showViewMore={true}
              onClick={(item) => {
                message.info(`已读`);
              }}
              onClear={handleClear}
            />
          ]}
        </NoticeIcon>
      </span>
      <Avatar menu/>
      {/* <SelectLang className={styles.action} /> */}
    </Space>
  );
};
export default GlobalHeaderRight;
