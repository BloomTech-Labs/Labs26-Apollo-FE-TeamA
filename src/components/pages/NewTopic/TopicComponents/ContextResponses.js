import React, { useState, useEffect } from "react";
import { Select, Form, Space, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import ContextQuestions from "./ContextQuestions";

const ContextResponses = props => {
  return (
    <div>
      <Form.Item
        name="response"
        rules={[{ required: true, message: "Please respond to the question" }]}
      >
        <Input placeholder="Your Response" />
      </Form.Item>
    </div>
  );
};

export default ContextResponses;
