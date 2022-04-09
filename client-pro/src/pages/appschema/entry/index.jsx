import React from 'react';
import { Form, Card, message, Divider, Button, Space } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { save } from '../service';

const EntryForm = (props) => {

  const [fields, setFields] = React.useState([]);

  const [form] = Form.useForm();

  const addField = () => {

  }

  const { run } = useRequest(save, {
    manual: true,
    onSuccess: (x) => {
      message.success('Role is saved', x);
      form.resetFields();
    },
    onError: (e) => {
      console.log(e);
      message.error('Error happened ', e);
    },
  });

  const onFinish = async (values) => {
    console.log(values, form);
    //  run(values);
    const result = await save(values);
    console.log(result);

    if (result instanceof Error) {
      message.error(result.message);
    }
    else {
      message.success(result.message);
      form.resetFields();
    }
  };

  return (
    <PageContainer content="My amazing role entry form">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            margin: 'auto',
            marginTop: 8,
            maxWidth: 600,
          }}
          name="basic"
          layout="vertical"
          onFinish={(v) => onFinish(v)}
          form={form}
        >
          <ProFormText
            width="md"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter role name',
              },
            ]}
            placeholder="Please enter role name"
          />
          <Divider plain orientation="left">
            <Button onClick={addField}>Add field <PlusOutlined /></Button>
          </Divider>

          <ProFormText
            width="md"
            label="Label"
            name="label"
            rules={[
              {
                required: true,
              },
            ]}
          />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
