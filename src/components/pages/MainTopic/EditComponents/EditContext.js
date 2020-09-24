import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { getAllContexts } from "../../../../api";

const ContextType = props => {
  const [contexts, setContexts] = useState([]); // load in contexts from API
  const { Option } = Select;

  useEffect(() => {
    getAllContexts()
      .then(res => {
        setContexts(res.slice(0, 6));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Topic Context</h2>

      <Form.Item
        name={["topic", "contextid"]}
        label="What is the context of this topic?"
        required
        rules={[{ required: true, message: "Please select the context type." }]}
        initialValue={props.context.id}
      >
        <Select
          defaultValue={props.context.id}
          placeholder={props.context.contextoption}
        >
          {contexts.map((c, index) => {
            return (
              <Option key={index} value={index + 1}>
                {c.contextoption}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </div>
  );
};

export default ContextType;
