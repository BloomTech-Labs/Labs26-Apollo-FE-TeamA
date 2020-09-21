import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import { getContext } from "../../../../api";

const ContextType = props => {
  const [contexts, setContexts] = useState([]); // load in contexts from API
  const { Option } = Select;

  useEffect(() => {
    getContext()
      .then(res => {
        setContexts(res);
      })
      .catch(err => console.log(err));
  }, []);

  const handleTopicInput = type => {
    props.onChange("contextid", type);
  };

  return (
    <div>
      <h2>Topic Context</h2>

      <Form.Item
        name="contextid"
        label="What is the context of this topic?"
        required
        rules={[{ required: true, message: "Please select the context type." }]}
      >
        <Select
          placeholder="Select a context type"
          value={props.contextid}
          onChange={value => {
            handleTopicInput(value);
          }}
        >
          {contexts.map((c, index) => {
            return (
              <Option key={index} value={index}>
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
