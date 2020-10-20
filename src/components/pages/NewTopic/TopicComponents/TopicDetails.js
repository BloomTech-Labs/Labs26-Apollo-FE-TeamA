import React from "react";
import { Form, Input, Select, Divider } from "antd";
const { Option } = Select;

const TopicDetails = () => {
  return (
    <div>
      <Divider>Topic Details</Divider>

      <Form.Item
        name={["topic", "topicname"]}
        label="Topic Title"
        required
        rules={[{ required: true, message: "Please provide a topic title." }]}
      >
        <Input placeholder="ex: Daily Stand Up" />
      </Form.Item>

      <Form.Item
        style={{ marginTop: "1rem" }}
        name={["topic", "topicfrequency"]}
        label="How often should the topic surveys occur?"
        required
        rules={[{ required: true, message: "Please set a topic frequency." }]}
      >
        <Select placeholder="Select a frequency">
          <Option value="Off">Off</Option>
          <Option value="Daily">Daily</Option>
          <Option value="Weekly">Weekly</Option>
          <Option value="Monthly">Monthly</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default TopicDetails;
