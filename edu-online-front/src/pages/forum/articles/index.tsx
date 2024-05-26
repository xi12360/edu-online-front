import {LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined,EditOutlined,EyeOutlined} from '@ant-design/icons';
import {Button, Card, Col, Form, List, Row, Select, Tag,Input,} from 'antd';
import type {FC} from 'react';
import React, {useState} from 'react';
import {Link,useRequest} from 'umi';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type {ArticleVO,} from './data.d';
import {queryArticleLikeUsingGET,queryByTypeUsingGET,queryMostClickUsingGET,queryByTimeUsingGET,queryArticleByAuthor} from './service';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';
import { Radio } from 'antd';
import initialState from '@/.umi/plugin-initial-state/models/initialState';

const {Option} = Select;
const FormItem = Form.Item;

const Articles: FC = () => {
  const [form] = Form.useForm();

  const [articleVOList, setArticleVOList] = useState<ArticleVO[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalNum, setTotalNum] = useState<number>(0);
  const [showNum, setShowNum] = useState<number>(0);
  const [name,setName] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('最热');
  const [searchType,setSearchType] = useState<string>('name')


  const {loading, loadMore, loadingMore} = useRequest(
    () => {
      const result = queryArticleLikeUsingGET({name: "", current: currentPage, pageSize: pageSize, status: 0});

      // if (data) {
      //   setTotalNum(data.totalNum);
      //   setListData(data.courseVOList);
      // }
      return result;
    },
    {
      onSuccess: (result) => {
        setTotalNum(result.totalNum);
        setArticleVOList(result.articleVOList);
      },
    },
  );

  const handleFormSubmit = async(value: string) => {
    setName(value);
    if(searchType==="name"){
    const result = await queryArticleLikeUsingGET({name: value, current: currentPage, pageSize: pageSize});
    setArticleVOList(result.data.articleVOList || []);
    setTotalNum(result.data.totalNum || 0);
    console.log(articleVOList)
    }
    if(searchType==="author"){
      const result = await queryArticleByAuthor({name: value, current: currentPage, pageSize: pageSize});
      setArticleVOList(result.data.articleVOList || []);
      setTotalNum(result.data.totalNum || 0);
      console.log(articleVOList)
    }
  };




  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({type, text}) => {
    switch (type) {
      case 'click-o':
        return (
          <span>
            <EyeOutlined style={{marginRight: 8}}/>
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

  const handleSearchType = (e) => {
    setSearchType(e.target.value);
  }

  const handleTypeChange = async(e) => {
    setSelectedType(e.target.value); // 更新选择的类型
    if(e.target.value==="最热"){
      const result = await queryMostClickUsingGET({ current: currentPage, pageSize: pageSize});
      setArticleVOList(result.data.articleVOList || []);
      setTotalNum(result.data.totalNum || 0);
    }
    else if(e.target.value==="最新"){
    const result = await queryByTimeUsingGET({ current: currentPage, pageSize: pageSize});
      setArticleVOList(result.data.articleVOList || []);
      setTotalNum(result.data.totalNum || 0);
    }
    else{
      const result = await queryByTypeUsingGET({ type: e.target.value,current: currentPage, pageSize: pageSize});
      setArticleVOList(result.data.articleVOList || []);
      setTotalNum(result.data.totalNum || 0);
    }
    
  };

  const formItemLayout = {
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 24},
      md: {span: 12},
    },
  };
    function changePage(_page: number, _pageSize: number) {
      queryArticleLikeUsingGET({name: name, current: _page, pageSize: _pageSize})
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


  return (
    <PageContainer
    content={
      <div style={{ textAlign: 'center' }}>
        <Radio.Group defaultValue="name" buttonStyle="solid" size='large' onChange={handleSearchType}>
      <Radio.Button value="name" >按标题</Radio.Button>
      <Radio.Button value="author">按作者</Radio.Button>
    </Radio.Group>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={handleFormSubmit}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>
    }
    header={{
      extra: [
        <Link to='/forum/publish'>
          <Button type="primary" icon={<EditOutlined/>} size={'large'}>
          发布文章
        </Button>
        </Link>
      ]
    }}
    >
       <Card bordered={false}>
        
      <div className={styles.articleNavigationContainer}>
        <span>文章类型:  </span>
        <br/><br/>
      <Radio.Group defaultValue="最热" buttonStyle="solid" onChange={handleTypeChange} >
       <Radio.Button value="最热" className={styles.antRadioButtonWrapper}>最热</Radio.Button>
       <Radio.Button value="最新" className={styles.antRadioButtonWrapper}>最新</Radio.Button>
       <Radio.Button value="经验分享" className={styles.antRadioButtonWrapper}>经验分享</Radio.Button>
       <Radio.Button value="前端开发" className={styles.antRadioButtonWrapper}>前端开发</Radio.Button>
       <Radio.Button value="后端开发" className={styles.antRadioButtonWrapper}>后端开发</Radio.Button>
       <Radio.Button value="大数据" className={styles.antRadioButtonWrapper}>大数据</Radio.Button>
       <Radio.Button value="人工智能" className={styles.antRadioButtonWrapper}>人工智能</Radio.Button>
       <Radio.Button value="考研指导" className={styles.antRadioButtonWrapper}>考研指导</Radio.Button>
       <Radio.Button value="数据结构与算法" className={styles.antRadioButtonWrapper}>数据结构与算法</Radio.Button>
       <Radio.Button value="云计算" className={styles.antRadioButtonWrapper}>云计算</Radio.Button>
       <Radio.Button value="数学" className={styles.antRadioButtonWrapper}>数学</Radio.Button>
       <Radio.Button value="英语" className={styles.antRadioButtonWrapper}>英语</Radio.Button>
      </Radio.Group>
      </div>  
        
      </Card>
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
                <IconText key="click" type="click-o" text={item.clickNum}/>,
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
                    <Tag>{item.articleType}</Tag>
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
}
  ;

  export default Articles;
