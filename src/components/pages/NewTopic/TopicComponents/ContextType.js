import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import axios from "axios";

const ContextType = props => {
  const [contexts, setContexts] = useState([]); // load in contexts from API
  const { Option } = Select;

  useEffect(() => {
    const idToken = JSON.parse(localStorage.getItem("okta-token-storage"))
      .idToken.idToken;

    axios
      .get("https://apollo-a-api.herokuapp.com/context", {
        headers: { Authorization: `Bearer ${idToken}` }
      })
      .then(res => {
        setContexts(res.data);
      })
      .catch(err => console.log(`GET to /context:`, err));
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
