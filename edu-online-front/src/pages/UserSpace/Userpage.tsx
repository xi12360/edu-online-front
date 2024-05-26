import { SmileOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProLayout,
} from '@ant-design/pro-components';
import { Card } from 'antd';

export default () => {
  return (
      <ProLayout
          fixSiderbar
          fixedHeader
          breakpoint={false}
          defaultCollapsed
          pageTitleRender={false}
          menuDataRender={() => [
            {
              path: '/one', //一级标题地址
              icon: <SmileOutlined />,
              name: '个人中心',
              children: [
                {
                  path: 'two', //二级标题地址
                  name: '修改账户信息',
                },
              ],
            },
          ]}
          layout="mix"
          location={{
            pathname: '/one/two',
          }}
      >
        <PageContainer title="输入表单">
          <Card>
            <ProForm
                submitter={{
                  render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                }}
                onFinish={async (values) => console.log(values)}
            >
              <ProForm.Group>
                <ProFormText
                    name="phone"
                    label="手机号"
                    tooltip="最长为 11 位"
                    disabled
                />
                <ProFormText
                    width="md"
                    name="email"
                    label="邮箱"
                    disabled
                />
              </ProForm.Group>
              <ProForm.Group>
                <ProFormSelect
                    options={[
                      {
                        value: 'cs',
                        label: '计算机科学与技术',
                      },
                      {
                        value: 'software',
                        label: '软件工程'
                      },
                      {
                        value: 'ai',
                        label: '人工智能'
                      },
                      {
                        value: 'netsec',
                        label: '网络安全'
                      }
                    ]}
                    width="xs"
                    name="major"
                    label="专业"
                />
                <ProFormRadio.Group
                    label="身份类型"
                    name="identifyType"
                    initialValue="学生"
                    options={['学生', '在职', '其他']}
                />
              </ProForm.Group>
              <ProFormUploadButton
                  extra="支持扩展名：.jpg .zip .doc .wps"
                  label="倒签报备附件"
                  name="file"
                  title="上传文件"
              />
              <ProFormDigit
                  width="xs"
                  name="num"
                  label="合同份数"
                  initialValue={5}
              />
              <ProFormTextArea width="xl" label="合同备注说明" name="remark" />
            </ProForm>
          </Card>
        </PageContainer>
      </ProLayout>
  );
};
