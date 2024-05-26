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
import {queryUserMsgNum} from "@/pages/user/service";

const Login: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const [loginRole, setLoginRole] = useState<number>(1);
  const [form] = ProForm.useForm();
  const [mobile, setMobile] = useState<string>('');
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
    } else if (value == '3') {
      setLoginRole(3);
    } 
  };

  const fetchUserInfo = async (value: string) => {
    const userInfo = await getLoginUserUsingGET(value);
    if (userInfo) {
      const msgNum = await queryUserMsgNum(userInfo.data.id);
      await setInitialState({
        ...initialState,
        currentUser: userInfo.data,
        unReadMsg: msgNum.data,
      });
    }
  };

  const setToken = async (token: string) => {
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
      if (type === 'account') {
        if (loginRole == 1) {
          msg = await studentLoginUsingPOST({
            ...values,
          });
          if (msg.data) {
            console.log(msg);
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
            history.push('/homePage' || redirect);

            // window.location.href = '/';
            return;
          }
        } else if (loginRole == 2) {
          msg = await teacherLoginUsingPOST({
            ...values,
          });
          if (msg.data) {
            console.log(msg);
            const defaultLoginSuccessMessage = '登录成功！';
            message.success(defaultLoginSuccessMessage);
            await setToken(msg.data);
            await fetchUserInfo(msg.data);
            // await getLoginTeacherUsingGET();
            if (!history) return;
            const {query} = history.location;
            const {redirect} = query as {
              redirect: string;
            };
            history.push(redirect || '/homePage');
            // window.location.href = '/';
            return;
          }
        } else if (loginRole == 3) {
          msg = await adminLoginUsingPOST({
            ...values,
          });
          if (msg.data) {
            const defaultLoginSuccessMessage = '登录成功！';
            message.success(defaultLoginSuccessMessage);
            await setToken(msg.data);
            await fetchUserInfo(msg.data);
            /** 此方法会跳转到 redirect 参数所在的位 置 */
            if (!history) return;
            const {query} = history.location;
            const {redirect} = query as {
              redirect: string;
            };
            history.push(redirect || '/homePage');
            // window.location.href = '/';
            return;
          }
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
            <Tabs.TabPane key="account" tab={'账号密码登录'}/>
          </Tabs>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/user/loginUseCode">手机验证码登录</Link>
          </div>
          {type === 'account' && (
            <>
              <ProFormText
                name="phone"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'账号: '}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'密码: '}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <Space wrap>
                <Select
                  defaultValue="1"
                  style={{width: 120}}
                  onChange={handleChange}
                  options={[
                    {value: '1', label: '学生'},
                    {value: '2', label: '教师'},
                    //{value: '3', label: '管理员'}
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
            </>
          )}
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
