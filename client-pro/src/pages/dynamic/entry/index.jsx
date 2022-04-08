import React, { useEffect, useState } from 'react';
import { Form, Card, message } from 'antd';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { save, getById } from '../service';

const EntryForm = (props) => {

  const [inputFields, setInputFields] = useState([]);

  useEffect(() => {
    const load = async () => {
      console.log(props.params)
      const { id } = props.match.params;
      if (id) {
        const result = await getById(id);
        if (result instanceof Error) {
          message.error(result.message);
        }
        else {
          console.log('result', result);
          // const fields = []
          const fields = Object.keys(result.body).map(key => {
            return {
              name: key,
              value: result.body[key],
            }
          });
          setInputFields(fields);
        }
      }
    }
    load();
    return () => {
      console.log('clean up');
    };
  }, []);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values, form);
    const result = await save(values);
    console.log('resource', result);
    if (result instanceof Error) {
      message.error(result.message);
    }
    else {
      message.success(result.message);
      form.resetFields();
      // setRole(null);
    }
  };

  return (
    <PageContainer content="My amazing resource entry form">
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
          {inputFields.map(field => (<ProFormText
            width="md"
            label={field.name}
            name={field.name}
            rules={[
              {
                required: true,
                message: `Please enter ${field.name}`,
              },
            ]}
            placeholder={`Please enter ${field.name}`}
          />))}

        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EntryForm;
