import MyEditor from "./components/myEditor";
import type {FC} from 'react';
import {useState, useEffect} from "react";
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Card, message, Form, Col, Row, Button} from 'antd';
import styles from './style.less';
import React from 'react';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import {Input,Checkbox,Select} from 'antd';
import {history, request, useModel, useParams, useRequest} from 'umi';
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {IDomEditor, IEditorConfig, IToolbarConfig} from '@wangeditor/editor'

const {TextArea} = Input;
import {publishArticle} from "./service";
import {InboxOutlined} from "@ant-design/icons";
import Dragger from "antd/lib/upload/Dragger";



const Publish: FC = () => {

  const [getArticleTitle, setArticleTitle] = useState<string>('');
  const [getArtKey, setArtKey] = useState<string>('');
  const [getSummary, setSummary] = useState<string>('');
  const [getImageUrl, setImageUrl] = useState<string>('');
  const [getArtType, setArtType] = useState<any>('');
  const {initialState} = useModel('@@initialState');
  const [showTitle,setShowTitle] = useState<boolean>(false);
  const [showSummary,setShowSummary] = useState<boolean>(false);
  const [showKey,setShowKey] = useState<boolean>(false);


  const getTitleValue = (event: { target: { value: any } }) => {
    setArticleTitle(event.target.value);
    setShowTitle(event.target.value === "");
  }

  const getSummaryValue = (event: { target: { value: any } }) => {
    setSummary(event.target.value);
    setShowSummary(event.target.value === "");
  };

  const getKeyValue = (event: { target: { value: any } }) => {
    setArtKey(event.target.value);
    setShowKey(event.target.value === "");
  };

  const getTypeValue = (value: string) => {
    setArtType(value);

  };

  const getImageUrlValue = (event: { target: { value: any } }) => {
    setImageUrl(event.target.value);
  };

  const [text, setText] = useState<string>("")



  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState('')

  // 模拟 ajax 请求，异步设置 html
  /* useEffect(() => {
      setTimeout(() => {
          setHtml('<p>hello world</p>')
      }, 1500)
  }, []) */

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '文章内容',
  }


  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)

    }
  }, [editor])

  async function publishArt() {
    if(!getArticleTitle||!getArtType||!getArtKey||!getSummary){
      alert("请完整输入文章信息")
    }
    else{
    const Response = await publishArticle({
      articleType: getArtType,
      authorId: initialState.currentUser.id || "",
      imageUrl: getImageUrl,
      keyWord: getArtKey,
      role: initialState?.currentUser.access == 'canStudent' ? 0 : 1,
      source: "no",
      summary: getSummary,
      title: getArticleTitle,
      content: text,
    });
    if (Response) {
      message.success("发布成功");
      history.push("/forum/article");
    }
  }
  }


  return (
    <div>
      <Input placeholder="标题" onChange={getTitleValue} addonBefore="文章标题" size="large" maxLength={20}
      className={showTitle?styles.redBorder:""}
      />
      {showTitle&&(
        <p style={{color:"red"}}>必须输入标题</p>
      )}
      <br/>
      <br/>

      <Input placeholder="关键词" onChange={getKeyValue} addonBefore="文章关键词" size="large" maxLength={15}
             style={{width: "48%", display: "inline-flex"}}
             className={showKey?styles.redBorder:""}/>

      <Select
        size="large"
        placeholder="文章类型"
        style={{width: "48%", display: 'inline-flex', float: 'right'}}
        onChange={getTypeValue}
        options={[
          {value: '学习经验', label: '学习经验'},
          {value: '前端开发', label: '前端开发'},
          {value: '后端开发', label: '后端开发'},
          {value: '大数据', label: '大数据'},
          {value: '人工智能', label: '人工智能'},
          {value: '考研指导', label: '考研指导'},
          {value: '数据结构与算法', label: '数据结构与算法'},
          {value: '云计算', label: '云计算'},
          {value: '英语', label: '英语'},
          {value: '数学', label: '数学'},
        ]}
      />
      {showKey&&(
        <p style={{color:"red"}}>必须输入关键词</p>
      )}
      <br/>
      <br/>
      <Dragger
        accept="image/*"
        customRequest={async (options: any) => {
          const data = new FormData();
          data.append('file', options.file);
          try {
            const response = await fetch('/api/upload/image', {
              method: 'POST',
              body: data,
            });
            if (response.ok) {
              response.json().then((res: any) => {
                options.onSuccess({url: res.data}, new Response());
                setImageUrl(res.data);
              });
            } else {
              options.onError(new Error('上传失败'));
            }
          } catch (error) {
            console.error('上传图片出错:', error);
            options.onError(error);
          }
        }}
        onChange={async (info) => {
          if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
          }
        }}
        onDrop={(e) => {
          console.log('Dropped files', e.dataTransfer.files);
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text" style={{width: 'md', margin: 20}}>
          上传文章图片
        </p>
      </Dragger>
      <br/>
      <br/>
      <TextArea rows={4}
                placeholder="文章概要"
                maxLength={100}
                onChange={getSummaryValue}
                showCount
                className={showSummary?styles.redBorder:""}
      />
      {showSummary&&(
        <p style={{color:"red"}}>必须输入概要</p>
      )}
      <br/>
      <br/>
      <div style={{border: '1px solid #ccc', zIndex: 100}}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{borderBottom: '1px solid #ccc'}}
        />
        <Editor
          defaultConfig={editorConfig}
          value={text}
          onCreated={setEditor}
          onChange={editor => setText(editor.getText())}
          mode="default"
          style={{height: '500px', overflowY: 'hidden'}}
        />
      </div>
      <Button type="primary" onClick={publishArt} style={{float: "right"}} size={"large"}
      disabled={!getArticleTitle||!getArtKey||!getArtType||!getSummary||!text}
      >发布</Button>
    </div>
  )

}

export default Publish;

