import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'GOAT在线教育',
  pwa: false,
  logo: 'https://edu-online-james.oss-cn-beijing.aliyuncs.com/image/2023/09/07/64DEF3C%24M1N%24DAMEX%60_MF%24U.jpg'
};

export default Settings;
