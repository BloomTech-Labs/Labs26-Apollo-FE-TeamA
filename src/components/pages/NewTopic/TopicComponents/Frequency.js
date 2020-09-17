import React from "react";
import { Select, Form } from "antd";

const Frequency = props => {
  const handleTopicInput = frequency => {
    props.onChange("topicfrequency", frequency);
  };

  return (
    <div>
      <h2>Topic Frequency</h2>

      <Form.Item
        name="topic_frequency"
        label="How often should the topic surveys occur?"
        required
        rules={[{ required: true, message: "Please set a topic frequency." }]}
      >
        <Select
          placeholder="Select a frequency"
          value={props.topic_frequency}
          onChange={value => {
            handleTopicInput(value);
          }}
        >
          <Select.Option value="Off">Off</Select.Option>
          <Select.Option value="Daily">Daily</Select.Option>
          <Select.Option value="Weekly">Weekly</Select.Option>
          <Select.Option value="Monthly">Monthly</Select.Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default Frequency;
