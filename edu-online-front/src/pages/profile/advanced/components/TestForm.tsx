import ProCard from '@ant-design/pro-card';
import {
  ProFormInstance,
  ProFormTextArea,
  StepsForm,
  ProFormSelect,
} from '@ant-design/pro-form';
import {Modal, message, Image, List, Checkbox, Radio} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {buyCourse, queryBuy, queryCourseInfo, queryTestList} from "@/pages/profile/CourseInfo/service";
import {useModel} from "@@/plugin-model/useModel";
import Typography from 'antd/lib/typography/Typography';
import {useRequest} from "@@/plugin-request/request";
import {useParams} from "umi";
import {CheckboxValueType} from "antd/es/checkbox/Group";

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courseId?: string;
}

const TestForm: React.FC<modalCtrl> = ({ open, setOpen, courseId}) => {
  const formRef = useRef<ProFormInstance>();
  const [show, setShow] = useState(false);
  const [totalNum, setTotalNum] = useState(0);
  const {initialState, setInitialState} = useModel('@@initialState');
  const [listData, setListData] = useState<API.CourseTestVO[]>([]);

  const options = [
    { label: 'T', value: 'T' },
    { label: 'F', value: 'F' },
  ];

  async function queryTestFunction() {
    const response = await queryTestList(courseId);
    message.success(response.data.totalNum)
    // 在这里使用 isBuy 的结果
    setListData(response.data.courseTestVOList);
    setTotalNum(response.data.totalNum);
  }
  const { loading} = useRequest(() => {
    queryTestFunction();
  });

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Modal
      title="测验"
      width={700}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => {
        setShow(false);
        return true;
      }}
    >
      <ProCard>
        <StepsForm<{
          name: string;
        }>
          formRef={formRef}
          onFinish={async (values) => {
            setShow(false);
            return true;
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
        >
          <StepsForm.StepForm>
            <List
              header={<div>在线测试</div>}
              footer={<div>end</div>}
              bordered
              dataSource={listData}
              renderItem={(item) => <List.Item>{item.question}  请选择答案：
                <Radio.Group options={options} />
              </List.Item>}

            />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="pay" title="查看答案">
            <List
              header={<div>在线测试</div>}
              footer={<div>end</div>}
              bordered
              dataSource={listData}
              renderItem={(item) => <List.Item>{item.question}  答案：
                <Checkbox.Group options={options} value={(item.answer === 1) ? ['T'] : ['F']} disabled/>
              </List.Item>}
            />
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </Modal>
  );
};
export default TestForm;
