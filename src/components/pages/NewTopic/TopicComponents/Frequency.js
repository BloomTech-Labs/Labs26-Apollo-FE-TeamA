import React from "react";
import { Select, Form } from "antd";

const Frequency = props => {
  const handleTopicFrequency = frequency => {
    props.onChange(frequency);
  };

  return (
    <Form.Item
      name="topic_frequency"
      label="How often should the topic surveys occur?"
      required
      rules={[{ required: true, message: "Please set a topic frequency." }]}
    >
      <Select
        placeholder="Select a frequency"
        value={props.topic_frequency}
        onChange={handleTopicFrequency}
      >
        <Select.Option value="Off">Off</Select.Option>
        <Select.Option value="Daily">Daily</Select.Option>
        <Select.Option value="Weekly">Weekly</Select.Option>
        <Select.Option value="Monthly">Monthly</Select.Option>
      </Select>
    </Form.Item>
  );
};

export default Frequency;
