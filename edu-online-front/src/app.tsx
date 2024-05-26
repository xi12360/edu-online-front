import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import { RequestOptionsInit, ResponseError } from 'umi-request';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser} from './services/ant-design-pro/api';
import defaultSettings from '../config/defaultSettings';
import type { RequestConfig } from 'umi';
import {useModel} from "@@/plugin-model/useModel";



export const request: RequestConfig = {
  //prefix: 'http://123.60.24.195', // 指定API后端服务器地址
  // prefix: 'http://192.168.61.222:8081',
  errorConfig: {
    adaptor: (resData) => {
      return {
        ...resData,
        success: resData.code === 0,
        errorMessage: resData.message,
      };
    },
  },
};

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const loginCodePath = '/user/loginUseCode';
const registerPath = '/user/register';
const adminPath = '/admin/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  token?: string;
  unReadMsg?: number;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {

  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser(initialState.token);
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath && history.location.pathname !== loginCodePath &&
    history.location.pathname !== registerPath && history.location.pathname !== adminPath) {
    const currentUser = fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };

  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath && history.location.pathname !== loginCodePath &&
        history.location.pathname !== registerPath && history.location.pathname !== adminPath) {
        history.push(loginPath);
      }
    },
    links: isDev ? [] : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
