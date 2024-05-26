import {InboxOutlined} from '@ant-design/icons';
import {
  ModalForm,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import {Form, Upload, message} from 'antd';
import {request} from 'umi';
import React, {useEffect} from "react";

const {Dragger} = Upload;

interface formButton {
  btn?: JSX.Element;
  courseId?: string;
  upload: number;
  setUploadForm: React.Dispatch<React.SetStateAction<number>>;
}

const UploadChapterForm: React.FC<formButton> = ({btn, courseId, upload, setUploadForm}) => {
  const [form] = Form.useForm<{
    videoLink: number;
    infoLink: string;
    content: string;
    intro: string;
    title: string;
  }>();

  useEffect(() => {
    setUploadForm(upload);
  }, [upload]);


  return (
    <ModalForm<{
      videoLink: number;
      infoLink: string;
      content: string;
      intro: string;
      title: string;
    }>
      title="上传课程章节"
      trigger={btn}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        try {
          const response = await request<{
            data: boolean;
          }>('/api/course/upload/courseInfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              courseId: courseId,
              videoLink: values.videoLink,
              infoLink: values.infoLink,
              content: values.content,
              intro: values.intro,
              title: values.title,
            }
          });
          if (response.data) {
            message.success('提交成功');
            setUploadForm(1);
            return true;
          } else {
            message.error('提交失败，请重试');
            return false;
          }
        } catch (error) {
          message.error('提交失败，请重试');
          return false;
        }
      }}
      onFinishFailed={(errorInfo: any) => {
        console.log('提交失败:', errorInfo);
      }}
    >
      <ProFormGroup>
        <ProFormText
          style={{width: '50%'}}
          width="md"
          name="title"
          label="课程章节名称"
          tooltip="将作为标题用于展示，请尽量准确"
          placeholder="请输入课程章节名称"
          rules={[{required: true}]}
        />
        <ProFormTextArea
          style={{width: '50%'}}
          width="md"
          name="intro"
          label="课程章节简介"
          tooltip="将作为课程章节简介，请尽量准确"
          placeholder="请输入课程章节简介"
          rules={[{required: true}]}
        />
        <ProFormTextArea
          style={{ width: 'md' }}
          width="md"
          name="content"
          label="课程章节内容"
          placeholder="请输入课程章节内容"
          tooltip="请写明课程章节内容"
          rules={[{ required: true }]}
        />
      </ProFormGroup>
      <ProFormGroup>
        <Form.Item name="infoLink" label="课程章节资料上传" >
          <Dragger
            customRequest={async (options: any) => {
              const data = new FormData();
              data.append('file', options.file);
              try {
                const response = await fetch('/api/upload/file', {
                  method: 'POST',
                  body: data,
                });
                if (response.ok) {
                  response.json().then((res: any) => {
                    options.onSuccess({url: res.data}, new Response());
                    form.setFieldsValue({infoLink: res.data});
                  });
                } else {
                  options.onError(new Error('上传失败'));
                }
              } catch (error) {
                console.error('上传文件出错:', error);
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
              点击或拖动文件以上传
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item name="videoLink" label="课程章节视频" rules={[{ required: true, message: '请上传课程章节视频' }]}>
          <Dragger
            accept=".mp4"
            customRequest={async (options: any) => {
              const data = new FormData();
              data.append('file', options.file);
              try {
                const response = await fetch('/api/upload/file', {
                  method: 'POST',
                  body: data,
                });
                if (response.ok) {
                  response.json().then((res: any) => {
                    options.onSuccess({url: res.data}, new Response());
                    form.setFieldsValue({videoLink: res.data});
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
              点击或拖动文件以上传
            </p>
          </Dragger>
        </Form.Item>
      </ProFormGroup>
    </ModalForm>
  );
};
export default UploadChapterForm;
