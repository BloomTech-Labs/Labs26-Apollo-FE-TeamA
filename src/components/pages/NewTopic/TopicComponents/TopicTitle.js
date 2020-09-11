import React from "react";
import { Form, Input } from "antd";

const TopicTitle = props => {
  const handleTopicTitle = e => {
    props.onChange(e.target.value);
  };

  return (
    <Form.Item
      name="topic_name"
      label="Topic Title"
      required
      rules={[{ required: true, message: "Please provide a topic title." }]}
    >
      <Input
        name="topic_name"
        type="text"
        value={props.topic_name}
        onChange={e => {
          handleTopicTitle(e);
        }}
        placeholder="ex: Daily Stand Up"
      />
    </Form.Item>
  );
};

export default TopicTitle;
