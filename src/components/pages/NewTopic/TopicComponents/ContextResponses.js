import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const ContextResponses = props => {
  const { form } = Form.useForm();

  const saveResponses = responses => {
    props.onChange(Object.values(responses));
  };

  const getFields = () => {
    const count = props.value.contextQ.length;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <div key={i}>
          <Form.Item
            name={props.value.contextQ[i].id}
            label={props.value.contextQ[i].question}
            rules={[{ required: true, message: "Input something!" }]}
          >
            <Input placeholder="Answer context question" />
          </Form.Item>
        </div>
      );
    }
    return children;
  };

  return (
    <div>
      <Form form={form} name="context_responses" onFinish={saveResponses}>
        {getFields()}

        <Button type="primary" htmlType="submit">
          Save Responses
        </Button>
      </Form>
    </div>
  );
};

export default ContextResponses;
