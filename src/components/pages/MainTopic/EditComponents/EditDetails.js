import React from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;

const TopicDetails = props => {
  let topic = props.topics.filter(t => t.id === props.topicID)[0];

  return (
    <>
      <Form.Item
        name={["topic", "topicname"]}
        label="Give your topic a title."
        required
        rules={[{ required: true, message: "Please provide a topic title." }]}
        initialValue={topic.topicname}
      >
        <Input placeholder={topic.topicname} />
      </Form.Item>

      <Form.Item
        name={["topic", "topicfrequency"]}
        label="How often should the topic surveys occur?"
        required
        rules={[{ required: true, message: "Please set a topic frequency." }]}
        initialValue={topic.topicfrequency}
      >
        <Select>
          <Option value="Off">Off</Option>
          <Option value="Daily">Daily</Option>
          <Option value="Weekly">Weekly</Option>
          <Option value="Monthly">Monthly</Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default TopicDetails;
