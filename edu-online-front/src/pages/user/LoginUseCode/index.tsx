import {LockOutlined, MailTwoTone, MobileTwoTone, UserOutlined} from '@ant-design/icons';
import {Form, message, Select, Tabs} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import ProForm, {ProFormText, LoginForm, ProFormCaptcha} from '@ant-design/pro-form';
import {history, useModel} from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import {Space} from 'antd';
import {Link} from "@umijs/preset-dumi/lib/theme";
import {studentLoginUsingPOST} from "@/services/ant-design-pro/studentController";
import {
  teacherLoginUsingPOST
} from "@/services/ant-design-pro/teacherController";
import {
  adminLoginUsingPOST, getLoginUserUsingGET,
} from "@/services/ant-design-pro/adminController";
import {
  sendStudentVerifiedCode,
  sendTeacherVerifiedCode,
  studentVerifiedCodeLogin,
  teacherVerifiedCodeLogin
} from "@/pages/user/service";

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const [loginRole, setLoginRole] = useState<number>(1);
  const [countDown, setCountDown] = useState<number>(60);
  const [form] = ProForm.useForm();
  const [mobile, setMobile] = useState<string>('');
  const phoneRef = useRef<any>();
  const formRef = useRef();
  // const { dispatch } = props;
  useEffect(() => {
    console.log(initialState.token); // 打印最新的 token 值
    // 进行其他操作
  }, [initialState]);

  const handleChange = (value: string) => {
    if (value == '1') {
      setLoginRole(1);
    } else if (value == '2') {
      setLoginRole(2);
    }
  };

  const fetchUserInfo = async (value: string) => {
    const userInfo = await getLoginUserUsingGET(value);
    if (userInfo) {
      await setInitialState({
        ...initialState,
        currentUser: userInfo.data,
      });
    }
  };

  const setToken = async (token: string) => {
    message.success(token)
    await setInitialState((s) => ({
      ...s,
      token: token,
    }));
  }

  const handleValuesChange = (values: any) => {
    // const phone = phoneRef.current.getFieldValue('phone');
    const phone = values.phone;
    if (phone) {
      setMobile(phone);
      message.success(phone);
    }
  };

  const handleSubmit = async (values: API.StudentLoginRequest) => {
    try {
      // 登录
      let msg;
      const phone = form.getFieldValue('phone');
      const code = form.getFieldValue('password');
      console.log(phone);
      if (loginRole == 1) {
        msg = await studentVerifiedCodeLogin({phone: phone, password: code});
        if(msg.data) {
          const defaultLoginSuccessMessage = '登录成功！';
          message.success(defaultLoginSuccessMessage);
          await setToken(msg.data);
          await fetchUserInfo(msg.data);
          // message.success(initialState.currentUser.access + "1");
          // await getLoginStudentUsingGET();
          /** 此方法会跳转到 redirect 参数所在的位 置 */
          if (!history) return;
          const {query} = history.location;
          const {redirect} = query as {
            redirect: string;
          };
          history.push('/course' || redirect);
          // window.location.href = '/';
          return;
        }
      } else if (loginRole == 2) {
        msg = await teacherVerifiedCodeLogin({phone: phone, password: code});
        if(msg.data) {
          const defaultLoginSuccessMessage = '登录成功！';
          message.success(defaultLoginSuccessMessage);
          await setToken(msg.data);
          await fetchUserInfo(msg.data);
          // message.success(initialState.currentUser.access + "1");
          // await getLoginStudentUsingGET();
          /** 此方法会跳转到 redirect 参数所在的位 置 */
          if (!history) return;
          const {query} = history.location;
          const {redirect} = query as {
            redirect: string;
          };
          history.push('/course' || redirect);
          // window.location.href = '/';
          return;
        }
      }

    } catch (error) {
      // const defaultLoginFailureMessage = '登录失败，请重试！';
      // message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.ico"/>}
          title="GOAT在线教育"
          subTitle="在线教育平台"
          onFinish={async (values) => {
            await handleSubmit(values as API.StudentLoginRequest);
          }}
          form={form}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="verify" tab={'手机号验证码登录'}/>
          </Tabs>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Link to="/user/login">账号密码登录</Link>
          </div>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileTwoTone/>,
            }}
            name="phone"
            placeholder="请输入手机号"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: new RegExp(/^1[3-9]\d{9}$/, 'g'),
                message: '手机号格式不正确',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <MailTwoTone/>,
            }}
            countDown={countDown}
            captchaProps={{
              size: 'large',
            }}
            name="password"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            placeholder="请输入验证码"
            onGetCaptcha={async (mobile) => {
              // message.success(form.getFieldValue('mobile'))
              if (!form.getFieldValue('phone')) {
                message.error('请先输入手机号');
                return;
              }
              let m = form.getFieldsError(['phone']);
              if (m[0].errors.length > 0) {
                message.error(m[0].errors[0]);
                return;
              }
              if(loginRole == 1) {
                let response = await sendStudentVerifiedCode(form.getFieldValue('phone'));
                setMobile(form.getFieldValue('phone'));
                if (response.code === 0) message.success('验证码发送成功!');
                else message.error(response.message);
              } else if(loginRole == 2) {
                let response = await sendTeacherVerifiedCode(form.getFieldValue('phone'));
                setMobile(form.getFieldValue('phone'));
                if (response.code === 0) message.success('验证码发送成功!');
                else message.error(response.message);
              }
            }}
          />
          {/*</ProForm>*/}
          <Space wrap>
            <Select
              defaultValue="1"
              style={{width: 120}}
              onChange={handleChange}
              options={[
                {value: '1', label: '学生'},
                {value: '2', label: '教师'},
              ]}
            />
          </Space>
          <br/>
          <Link to="/user/register">新用户注册</Link>
          <a
            style={{
              float: 'right',
              marginBottom: 10,
            }}
          >
            忘记密码 ?
          </a>
          <div
            style={{
              marginBottom: 24,
            }}
          />

        </LoginForm>
      </div>
      <Footer/>
    </div>
  )
    ;
};
export default Login;
