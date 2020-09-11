import React, { useState, useEffect } from "react";
import { Button, Select, Modal, Form, Input } from "antd";
import TopicTitle from "./TopicComponents/TopicTitle";
import Frequency from "./TopicComponents/Frequency";
import ContextType from "./TopicComponents/ContextType";
import ContextQuestions from "./TopicComponents/ContextQuestions";
import generator from "generate-password";
import axios from "axios";

const newTopicValues = {
  created_at: new Date(),
  updated_at: new Date(),
  topic_name: "",
  topic_frequency: "",
  contextid: "",
  questionid: [],
  leaderid: 1, // get from home component as a prop
  join_code: generator.generate({
    length: 6,
    numbers: true,
    excludeSimilarCharacters: true
  })
};

const RenderNewTopic = () => {
  const [topic, setTopic] = useState(newTopicValues);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleTopicFrequency = frequency => {
    setTopic({
      ...topic,
      topic_frequency: frequency
    });
  };

  const handleTopicTitle = title => {
    setTopic({
      ...topic,
      topic_name: title
    });
  };

  const handleContextType = type => {
    setTopic({
      ...topic,
      contextid: type
    });
  };

  const createTopic = () => {
    console.log(topic);
    form.resetFields();
    setVisible(false);
  };

  // const createTopic = () => {
  //   form
  //     .validateFields()
  //     .then(values => {
  //       axios
  //         .post("http://localhost:3000", topic)
  //         .then((res) => {
  //           console.log("POST to topics", values, res);
  //           form.resetFields();
  //           setVisible(false);
  //         })
  //         .catch((err) => {
  //           console.log("POST to topics", err, topic);
  //           alert("There was an error creating the topic. Please try again.");
  //         });
  //     })
  //     .catch(info => {
  //       console.log("Validate Failed:", info);
  //     });
  // };

  const cancelTopic = () => {
    form.resetFields();
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Topic
      </Button>

      <Modal
        visible={visible}
        title="New Topic"
        okText="Create Topic"
        cancelText="Cancel"
        onCancel={cancelTopic}
        onOk={createTopic}
      >
        <Form form={form} layout="vertical" name="newTopicForm">
          {/* TOPIC NAME */}
          <TopicTitle value={topic} onChange={handleTopicTitle} />

          {/* TOPIC FREQUENCY */}
          <Frequency value={topic} onChange={handleTopicFrequency} />

          {/* TOPIC CONTEXT TYPE */}
          <ContextType value={topic} onChange={handleContextType} />
        </Form>
      </Modal>
    </div>
  );
};

export default RenderNewTopic;
