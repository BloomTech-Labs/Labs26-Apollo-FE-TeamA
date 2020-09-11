import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";

const ContextType = props => {
  const [contexts, setContexts] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    setContexts([
      "Product Leadership",
      "Delivery Management",
      "Project Management",
      "Design Leadership",
      "Engineering Leadership"
    ]);
    // axios
    //   .get("https://apollo-a-api.herokuapp.com/context")
    //   .then(res => {
    //     setContexts(res);
    //     console.log(res);
    //   })
    //   .catch(err => console.log("GET contexts:", err));
  }, []);

  const handleContextType = type => {
    props.onChange(type);
  };

  return (
    <Form.Item
      name="contextid"
      label="What is the context of this topic?"
      required
      rules={[{ required: true, message: "Please select the context type." }]}
    >
      <Select
        placeholder="Select a context type"
        value={props.contextid}
        onChange={handleContextType}
      >
        {contexts.map((c, index) => {
          return (
            <Option key={index} value={index}>
              {c}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};

export default ContextType;
