import {InboxOutlined} from '@ant-design/icons';
import {
  ModalForm, ProFormDateTimePicker,
  ProFormGroup,
  ProFormMoney,
  ProFormText,
} from '@ant-design/pro-form';
import {Form, Upload, message} from 'antd';
import {request} from 'umi';
import {useModel} from "@@/plugin-model/useModel";

const {Dragger} = Upload;

interface formButton {
  btn?: JSX.Element;
  courseId: string,
}

const ModifyForm: React.FC<formButton> = ({btn, courseId}) => {
  const [form] = Form.useForm<{
    itemName: string;
    sourcePrice: number;
    title: string;
    logo: string;
    subjectLink: string;
    endTime: Date;
    teacherId: string;
  }>();


  const {initialState} = useModel('@@initialState');

  return (
    <ModalForm<{
      courseName: string;
      sourcePrice: number;
      title: string;
      logo: string;
      subjectLink: string;
      endTime: Date;
      teacherId: string;
    }>
      title="修改课程"
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
          }>('/api/course/modify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              courseId: courseId,
              courseName: values.courseName,
              sourcePrice: values.sourcePrice,
              title: values.title,
              logo: values.logo || null,
              subjectLink: values.subjectLink || null,
              endTime: values.endTime,
              teacherId: initialState?.currentUser.id,
            }
          });
          if (response.data) {
            message.success('提交成功');
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
          name="courseName"
          label="课程名称"
          tooltip="将作为标题用于搜索，请尽量准确"
          placeholder="请输入课程名称"
          rules={[{required: true}]}
        />
        <ProFormText
          style={{width: '50%'}}
          width="md"
          name="title"
          label="课程标题"
          tooltip="将作为标题用于搜索，请尽量准确"
          placeholder="请输入课程标题"
          rules={[{required: true}]}
        />
        <ProFormMoney
          style={{width: '50%'}}
          width="md"
          name="sourcePrice"
          label="定价"
          locale="zh-CN"
          placeholder="请输入定价"
          min={0}
          rules={[{required: true}]}
        />
        <ProFormDateTimePicker
          style={{width: '50%'}}
          width="md"
          name="endTime"
          label="结束时间"
          placeholder="请输入结束时间"
          rules={[{required: true}]}
        />
      </ProFormGroup>
      <ProFormGroup>
        <Form.Item name="logo" label="课程logo">
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
                    form.setFieldsValue({logo: res.data});
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
        <Form.Item name="subjectLink" label="课程文件">
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
                    form.setFieldsValue({subjectLink: res.data});
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
export default ModifyForm;
