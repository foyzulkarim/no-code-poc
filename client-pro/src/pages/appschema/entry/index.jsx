import React from 'react';
import { Form, Card, message, Divider, Button, Space, Typography } from 'antd';
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
  const [body, setBody] = React.useState({});

  const [form] = Form.useForm();

  const addField = () => {
    const formValues = form.getFieldsValue();
    const column = { name: formValues.label, type: formValues.type, isSearchable: formValues.isSearchable, isDisplayable: formValues.isDisplayable };
    setFields([...fields, column]);
    let b = {};
    b[column.name] = { ...column };
    setBody({ ...body, ...b });
  }

  const onFinish = async (values) => {
    console.log(values, form);
    const payload = { name: values.name, body };
    const result = await save(payload);
    console.log(result);

    if (result instanceof Error) {
      message.error(result.message);
    }
    else {
      message.success(result.message);
      form.resetFields();
      setFields([]);
      setBody({});
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
          onReset={() => { form.resetFields(); setFields([]); setBody({}); }}
          form={form}
        >
          <ProFormText
            width="md"
            label="Collection name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter collection name',
              },
            ]}
            placeholder="Please enter collection name"
          />
          {/* <pre>
            <code>{JSON.stringify(fields, null, 2)}</code>
          </pre> */}
          <Divider />
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
          <ProFormText
            width="md"
            label="Type"
            name="type"
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormCheckbox name="isSearchable">
            Is searchable
          </ProFormCheckbox>
          <ProFormCheckbox name="isDisplayable">
            Is displayable
          </ProFormCheckbox>
          <Divider plain orientation="left">
            <Button onClick={addField}>Add field <PlusOutlined /></Button>
          </Divider>
          <Typography.Title editable level={5} style={{ margin: 0 }}>
            Fields
          </Typography.Title>
          <ul>
            {Object.keys(body).map((k) => <li>{k}</li>)}
          </ul>
          {/* <pre>
            <code>{JSON.stringify(body, null, 2)}</code>
          </pre> */}
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
