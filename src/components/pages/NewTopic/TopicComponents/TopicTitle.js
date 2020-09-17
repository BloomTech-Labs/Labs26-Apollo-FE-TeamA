import React from "react";
import { Form, Input } from "antd";

const TopicTitle = props => {
  const handleTopicInput = e => {
    let title = e.target.value;
    props.onChange("topicname", title);
  };

  return (
    <div>
      <h2>Topic Title</h2>

      <Form.Item
        name="topic_name"
        label="Give your topic a title."
        required
        rules={[{ required: true, message: "Please provide a topic title." }]}
      >
        <Input
          name="topic_name"
          type="text"
          value={props.topicname}
          onChange={e => {
            handleTopicInput(e);
          }}
          placeholder="ex: Daily Stand Up"
        />
      </Form.Item>
    </div>
  );
};

export default TopicTitle;
