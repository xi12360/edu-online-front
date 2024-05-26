import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Upload, message } from 'antd';
import ProForm, {ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { useModel } from 'umi';

import styles from './BaseView.less';
import {ProFormSelect} from "@ant-design/pro-components";
import {studentModify, teacherModify} from "@/pages/user/service";

//专业的不同选项
const major_select = [
    {
        value: 'cs',
        label: '计算机科学与技术'
    },
    {
        value:'software',
        label: '软件工程'
    },
    {
        value:'ai',
        label: '人工智能'
    },
    {
        value: 'net_sec',
        label: '网络安全'
    },
    {
        value: 'else',
        label: '其他'
    }
]

const BaseView: React.FC = () => {
  const [form] = Form.useForm<{
    name: string;
    phone: string;
    imgUrl: string;
    sex: number[];
    major: string;
    email: string;
    id: string;
  }>();

  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload
        showUploadList={false}
        accept="image/*"  //接收文件类型
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
                options.onSuccess({ url: res.data }, new Response());
                form.setFieldsValue({ imgUrl: res.data });
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
      >
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );

  //  获取用户信息
  const { initialState, loading } = useModel('@@initialState');
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm<{
              name: string;
              phone: string;
              imgUrl: string;
              sex: number[];
              major: string;
              email: string;
              id: string;
            }>
              form={form}
              layout="vertical"
              onFinish={async (values) => {
                try {
                  // 发送表单数据到服务器
                  let response;
                  if(initialState?.currentUser.access == 'canStudent') {
                    response = await studentModify({
                      id: values.id,
                      imgUrl: values.imgUrl,
                      phone: values.phone,
                      name: values.name,
                      major: values.major,
                      email: values.email,
                      sex: initialState?.currentUser.sex || 0,
                    })
                  } else if(initialState?.currentUser.access == 'canTeacher') {
                    response = await teacherModify({
                      id: values.id,
                      imgUrl: values.imgUrl,
                      phone: values.phone,
                      name: values.name,
                      major: values.major,
                      email: values.email,
                      sex: initialState?.currentUser.sex || 0,
                    })
                  }
                  if (response.data) {
                    message.success('提交成功');
                  } else {
                    message.error('提交失败');
                  }
                } catch (error) {
                  message.error('提交出错');
                }
              }}
              submitter={{
                searchConfig: {
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                id: initialState?.currentUser?.id,
                imgUrl: initialState?.currentUser?.picImg,
                phone: initialState?.currentUser?.phone,
                name: initialState?.currentUser?.name,
                major: initialState?.currentUser?.major,
                email: initialState?.currentUser?.email,
                sex: initialState?.currentUser?.sex,
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="id"
                label="用户id"
                disabled={true}
                initialValue={initialState?.currentUser.id}
              />
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormText
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的电话!',
                  },
                ]}
               />
              <ProFormText name="imgUrl" hidden />
              <ProFormText
              width="md"
              name="email"
              label="邮箱"
              rules={[
                {
                  required: true,
                  message: '请填写邮箱',
                },
              ]}
              placeholder={form.getFieldValue('email')}
              initialValue={initialState?.currentUser.email}
            />
              <ProFormSelect
                options={major_select}
                width="sm"
                name="major"
                label="专业"
                rules={[
                  {
                    required: true,
                    message: '请选择专业',
                  },
                ]}
                placeholder={form.getFieldValue('major')}
                initialValue={initialState?.currentUser.major}
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={form.getFieldValue('imgUrl')} />
          </div>

        </>
      )}
    </div>
  );
};

export default BaseView;
