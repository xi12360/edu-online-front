import ProCard from '@ant-design/pro-card';
import {
  ProFormInstance,
  ProFormTextArea,
  StepsForm,
  ProFormSelect,
} from '@ant-design/pro-form';
import {Modal, message, Image} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {buyCourse} from "@/pages/profile/CourseInfo/service";
import {useModel} from "@@/plugin-model/useModel";

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  courseId?: string;
  buy: number;
  setBuy: React.Dispatch<React.SetStateAction<number>>;
}

const OrderForm: React.FC<modalCtrl> = ({ open, setOpen, courseId, buy, setBuy}) => {
  const formRef = useRef<ProFormInstance>();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [show, setShow] = useState(false);
  const {initialState, setInitialState} = useModel('@@initialState');


  const changePaymentMethod = (e: any) => {
    setPaymentMethod(e);
  };


  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setBuy(buy);
  }, [buy]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Modal
      title="购买课程"
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
            try {
              // 发送表单数据到服务器
              const response = await buyCourse(initialState.currentUser.id, courseId);
              if (response.data) {
                message.success('提交成功');
                setShow(false);
                setBuy(1);
                // 执行其他操作...
              } else {
                message.error('提交失败');
              }
            } catch (error) {
              message.error('提交出错');
              console.error(error);
            }
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
        >
          <StepsForm.StepForm<{
            name: string;
          }>
            name="buyer"
            title="确认信息"
          >
            <ProFormSelect
              name="name"
              label="支付方式"
              width="md"
              placeholder="请选择支付方式"
              options={[
                { value: 'alipay', label: '支付宝' },
                { value: 'wechatpay', label: '微信' },
                // { value: 'bank', label: '银行' },
                { value: 'other', label: '其他', disabled: true },
              ]}
              rules={[{ required: true }]}
              onChange = {changePaymentMethod}
            />
            <ProFormTextArea name="remark" label="备注" width="lg" placeholder="请输入备注" />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="pay" title="支付">
            {paymentMethod === 'wechatpay' && (
              <Image
                src="https://ts1.cn.mm.bing.net/th/id/R-C.2dc72cde17461a681f72a880ee9549c8?rik=a%2fYD%2b2baznstnQ&riu=http%3a%2f%2fimg.zcool.cn%2fcommunity%2f0177ba55346fc7000000c500d0dadb.jpg%40900w_1l_2o_100sh.jpg&ehk=gkI6lpTb2BWeoUOkAdn79MhI7HkfFMsvy36jhLJhxaQ%3d&risl=&pid=ImgRaw&r=0"
                alt="微信付款码"
                style={{ width: '200px', height: '200px' }}
              />
            )}
            {paymentMethod === 'alipay' && (
              <Image
                src="https://ts1.cn.mm.bing.net/th/id/R-C.bbd7f982815f833cb7ca0dd2bad225ea?rik=7ZACV5JJopTCug&riu=http%3a%2f%2fwww.szquanli.com%2fuploads%2fallimg%2f200313%2f2-200313092Z3-51.png&ehk=CMQBThlNBi4WvlPCGojZrvk9U9R1T3rvTX%2bAKTqKERE%3d&risl=&pid=ImgRaw&r=0"
                alt="支付宝付款码"
                style={{ width: '200px', height: '200px' }}
              />
            )}
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </Modal>
  );
};
export default OrderForm;
