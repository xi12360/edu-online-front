import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormGroup,
  ProFormMoney,
} from '@ant-design/pro-form';
import { Modal, message, Form, Upload, Button } from 'antd';
import { useEffect, useState } from 'react';
import { request } from 'umi';
import { ItemData } from '../../data';
import {DownloadOutlined, UploadOutlined} from '@ant-design/icons';
import {SizeType} from "@ant-design/pro-form/es/BaseForm";

interface modalCtrl {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemPara?: ItemData;
}

const MaterialsForm: React.FC<modalCtrl> = ({ open, setOpen, itemPara }) => {
  const [show, setShow] = useState(false);
  const [size, setSize] = useState<SizeType>('large');
  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Modal>
  <ProFormGroup>

  </ProFormGroup>
  </Modal>
);
};
export default MaterialsForm;
