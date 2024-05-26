import ProCard from '@ant-design/pro-card';
import {
  ProFormInstance,
  ProFormTextArea,
  StepsForm,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-form';
import {Modal, message, Image, List, Checkbox, Radio, Button} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {buyCourse, queryBuy, queryCourseInfo, queryTestList, uploadTest} from "@/pages/profile/CourseInfo/service";
import {useModel} from "@@/plugin-model/useModel";
import Typography from 'antd/lib/typography/Typography';
import {useRequest} from "@@/plugin-request/request";
import {useParams} from "umi";
import {CheckboxValueType} from "antd/es/checkbox/Group";
import Form from 'antd/es/form';
import { Input } from 'antd';
import { ProForm } from '@ant-design/pro-components';
interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courseId?: string;
}

const UploadTestQuestions: React.FC<modalCtrl> = ({ open, setOpen, courseId}) => {
  const formRef = useRef<ProFormInstance>();
  const [show, setShow] = useState(false);
  const {initialState, setInitialState} = useModel('@@initialState');
  const [listData, setListData] = useState<API.CourseTestVO[]>([]);

  const options = [
    { label: 'T', value: 'T' },
    { label: 'F', value: 'F' },
  ];

  async function uploadTestFunction(values) {

    const questions = [];

    for (let i = 1; i <= 5; i++) {
      const question = values['question_' + i];
      const answer = values['answer_' + i];
      questions.push({ question, answer });
    }

    const response = await uploadTest({courseId: courseId, courseTestRequestList: questions});
    if(response) {
      message.success("上传成功");
      setOpen(false);
    } else {
      message.error("上传失败");
    }
  }

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Modal
      title="上传测验"
      width={700}
      open={open}
      okButtonProps={{ style: { display: 'none' } }}
      onCancel={() => {
        setShow(false);
        return true;
      }}
    >
      <ProForm onFinish={uploadTestFunction}>
        {[1, 2, 3, 4, 5].map((index) => (
          <ProForm.Group key={index}>
            <ProFormTextArea
              label={'问题' +index+ '描述'}
              name={'question_' + index}
              rules={[{ required: true, message: '请输入问题描述' }]}
              colProps={{ span: 24 }}
              width={400}
            />

            <ProFormRadio.Group
              label={'问题' +index+ '答案'}
              name={'answer_' + index}
              rules={[{ required: true, message: '请选择答案' }]}
              options={[
                { label: 'T', value: 1 },
                { label: 'F', value: 0 },
              ]}
            />
          </ProForm.Group>
        ))}
      </ProForm>
    </Modal>
  );
};
export default UploadTestQuestions;


