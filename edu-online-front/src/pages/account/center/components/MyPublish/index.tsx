import {Avatar, Button, Card, Form, Input, List, Select, Tag, Typography} from 'antd';
import { useRequest, Link } from 'umi';
import React, { useState } from 'react';
import styles from './index.less';
import {ArticleVO} from "@/pages/forum/articles/data";
import {EditOutlined, LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
import {PageContainer} from "@ant-design/pro-layout";
import StandardFormRow from "@/pages/forum/articles/components/StandardFormRow";
import TagSelect from "@/pages/forum/articles/components/TagSelect";
import ArticleListContent from "../ArticleListContent";
import FormItem from "antd/es/form/FormItem";
import {queryMyFavorCourse, queryMyPublishArticle} from "@/pages/account/center/service";
import {useModel} from "@@/plugin-model/useModel";

const { Paragraph } = Typography;

const MyPublish: React.FC = () => {
  const [form] = Form.useForm();

  const [articleVOList, setArticleVOList] = useState<ArticleVO[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [name,setName] = useState<string>('');
  const {initialState, setInitialState} = useModel('@@initialState');
  const {loading, loadMore, loadingMore} = useRequest(
    () => {
      const result = queryMyPublishArticle({userId: initialState?.currentUser.id, current: currentPage, pageSize: pageSize});
      return result;
    },
    {
      onSuccess: (result) => {
        setTotalNum(result.totalNum);
        setArticleVOList(result.articleVOList);
      },
    },
  );

  function changePage(_page: number, _pageSize: number) {
    queryMyPublishArticle({userId: initialState?.currentUser.id, current: _page, pageSize: _pageSize})
        .then((result) => {
          setArticleVOList(result.data.articleVOList);
          setTotalNum(result.data.totalNum);
        })
    // setListData(result.courseVOList);
    setCurrentPage(_page);
    setPageSize(_pageSize);
  }

  function showTotal(total: number, range: [number, number]) {
    return `${range[0]}-${range[1]} 共 ${total} 篇文章`;
  }

  const paginationProps = {
    onChange: changePage,
    showSizeChanger: true,
    showQuickJumper: true,
    currentPage: currentPage,
    pageSize: pageSize,
    total: totalNum,
    showTotal: showTotal,
    pageSizeOptions: [8, 16, 24, 36],
  };


  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({type, text}) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{marginRight: 8}}/>
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{marginRight: 8}}/>
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{marginRight: 8}}/>
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const formItemLayout = {
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 24},
      md: {span: 12},
    },
  };

  return (
    <PageContainer>
      <Card
        style={{marginTop: 24}}
        bordered={false}
        bodyStyle={{padding: '8px 32px 32px 32px'}}
      >
        <List<ArticleVO>
          size="large"
          loading={loading}
          rowKey="articleId"
          itemLayout="vertical"
          pagination={paginationProps}
          dataSource={articleVOList}
          renderItem={(item) => (
            <List.Item
              key={item.articleId}
              actions={[
                <IconText key="like" type="like-o" text={item.praiseNum}/>,
                <IconText key="message" type="message" text={item.commentNum}/>,
              ]}
              extra={<div className={styles.listItemExtra}/>}
            >
              <Link to={`/profile/article-info/${item.articleId}`}>
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.img_url}>
                      {item.title}
                    </a>
                  }
                  description={
                    <span>
                    <Tag>{item.keyWord}</Tag>
                  </span>
                  }
                />
                <ArticleListContent data={item}/>
              </Link>
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default MyPublish;
