// import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
const Footer: React.FC = () => {
  //const intl = useIntl();
  // const defaultMessage = intl.formatMessage({
  //   id: 'app.copyright.producedByUndefined',
  //   defaultMessage: '东南大学Undefined小组出品',
  // });

  //const defaultMessage = '东南大学有请下一组';
  const defaultMessage ='软件工程课程设计';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      // links={[
      //   {
      //     key: 'edu-online',
      //     title: 'edu-online',
      //     href: 'https://gitee.com/yyq123321',
      //     blankTarget: true,cd
      //   },
      //   {
      //     key: 'github',
      //     title: <GithubOutlined />,
      //     href: 'https://gitee.com/yyq123321',
      //     blankTarget: true,
      //   },
      // ]}
    />
  );
};
export default Footer;
