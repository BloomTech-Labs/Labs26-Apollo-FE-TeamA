import React, { useState, useEffect } from "react";
import { Button, Select, Modal, Form, Input } from "antd";
import axios from "axios";

{
  /*
TO-DO's
------------------------------------------------------------
- set up state for answering context questions
- set up state for selecting response type
- link topic leader id to user id (passed as prop)
- figure out how to generate join code
- create modal for join-code pop-up upon topic creation
*/
}

const newTopicValues = {
  created_at: new Date(),
  updated_at: new Date(),
  topic_name: "",
  topic_frequency: "",
  contextid: "",
  questionid: [],
  leaderid: "", // set to user.id passed down from props
  join_code: "" // generate a code upon creating a topic
};

const NewTopicContainer = () => {
  const [topic, setTopic] = useState(newTopicValues);
  const [contexts, setContexts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;

  const handleTopicInput = e => {
    setTopic({
      ...topic,
      [e.target.name]: e.target.value
    });
  };

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

  useEffect(() => {
    // axios
    //   .get("https://apollo-a-api.herokuapp.com/questions")
    //   .then(res => {
    //     setQuestions(res)
    //     console.log(res);
    //   })
    //   .catch(err => console.log("GET questions:", err));
  }, [topic.contextid]);

  const createTopic = () => {
    console.log(contexts);
    console.log(topic);
    form.resetFields();
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
    setVisible(false);
    form.resetFields();
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
          <Form.Item
            name="topic_name"
            label="Topic Title"
            required
            rules={[
              { required: true, message: "Please provide a topic title." }
            ]}
          >
            <Input
              name="topic_name"
              type="text"
              value={topic.topic_name}
              onChange={handleTopicInput}
              placeholder="ex: Daily Stand Up"
            />
          </Form.Item>

          <Form.Item
            name="topic_frequency"
            label="How often should the topic surveys occur?"
            required
            rules={[
              { required: true, message: "Please set a topic frequency." }
            ]}
          >
            <Select
              placeholder="Select a frequency"
              value={topic.topic_frequency}
              onSelect={frequency => {
                setTopic({ ...topic, topic_frequency: frequency });
              }}
            >
              <Option value="Once">Once</Option>
              <Option value="Daily">Daily</Option>
              <Option value="Weekly">Weekly</Option>
              <Option value="Monthly">Monthly</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="contextid"
            label="What is the context of this topic?"
            required
            rules={[
              { required: true, message: "Please select the context type." }
            ]}
          >
            <Select
              placeholder="Select a context type"
              value={topic.contextid}
              onSelect={id => {
                setTopic({ ...topic, contextid: id });
              }}
            >
              {contexts.map((c, index) => {
                return <Option value={index}>{c}</Option>;
              })}
            </Select>
          </Form.Item>

          {questions ? (
            <Form.Item
              name="questionid"
              label="Select a context question."
              required
              rules={[
                { required: true, message: "Please select a context question." }
              ]}
            >
              <Select
                placeholder="Select a context question"
                value={topic.questionid}
                onSelect={id => {
                  setTopic({ ...topic, contextid: id });
                }}
              >
                {contexts.map((c, index) => {
                  return <Option value={index}>{c}</Option>;
                })}
              </Select>
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};

export default NewTopicContainer;
