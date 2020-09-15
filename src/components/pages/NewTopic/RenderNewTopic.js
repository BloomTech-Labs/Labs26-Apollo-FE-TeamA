import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "antd";
import TopicTitle from "./TopicComponents/TopicTitle";
import Frequency from "./TopicComponents/Frequency";
import ContextType from "./TopicComponents/ContextType";
import ContextQuestions from "./TopicComponents/ContextQuestions";
import RequestQuestions from "./TopicComponents/RequestQuestions";
import generator from "generate-password";
import axios from "axios";

// TO DO's ----------------
// - MAP AND LINK QUESTION ID'S TO NEW TOPIC OBJECTS
// - POST NEW TOPIC TO /topic
// - CONNECT LEADERID to USERID (PASSED AS PROP/CONTEXT)
// - IMPLEMENT SELECTING RESPONSE TYPE FUNCTIONALITY

const RenderNewTopic = () => {
  // setting JOIN CODE using a PUT later on
  const joinCode = generator.generate({
    length: 6,
    numbers: true,
    excludeSimilarCharacters: true
  });

  // initializing a new topic object
  const newTopicValues = {
    created_at: new Date(),
    updated_at: new Date(),
    topic_name: "",
    topic_frequency: "",
    contextid: "",
    questionid: "",
    leaderid: 1,
    join_code: joinCode
  };

  // initializing a collection of all questions
  const newQuestions = {
    contextQ: [],
    requestQ: []
  };

  // state variables
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState(newTopicValues);
  const [questions, setQuestions] = useState(newQuestions);
  let allQuestions = [];
  let allTopics = [];

  // topic state-handling function
  const handleTopicInput = (name, value) => {
    console.log("CALLED");
    setTopic({
      ...topic,
      [name]: value
    });
  };

  // question state-handling function
  const handleQuestions = (name, q) => {
    setQuestions({
      ...questions,
      [name]: q
    });
  };

  const createTopic = () => {
    allQuestions = questions.contextQ.concat(questions.requestQ);
    console.log(allQuestions);
    setSubmit(true);
    form.resetFields();
    setVisible(false);
    setPage(1);
  };

  useEffect(() => {
    console.log("submitted");

    let allTopics = allQuestions.map(q => {
      setTopic({
        ...topic,
        questionid: q.id
      });
      return topic;
    });

    console.log(allTopics);
  }, [submit]);

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
    setTopic(newTopicValues);
    setVisible(false);
    setPage(1);
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
        width={700}
        title="New Topic"
        okText="Create Topic"
        cancelText="Cancel"
        onCancel={cancelTopic}
        onOk={createTopic}
        footer={
          <>
            {page === 1 ? null : (
              <Button
                type="secondary"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Back
              </Button>
            )}
            {page === 4 ? (
              <Button type="primary" onClick={createTopic}>
                Create Topic
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next
              </Button>
            )}
          </>
        }
      >
        <div>
          <Button
            style={{ border: "none", fontWeight: "bold" }}
            onClick={() => {
              setPage(1);
            }}
          >
            1
          </Button>
          <Button
            style={{ border: "none", fontWeight: "bold" }}
            onClick={() => {
              setPage(2);
            }}
          >
            2
          </Button>
          <Button
            style={{ border: "none", fontWeight: "bold" }}
            onClick={() => {
              setPage(3);
            }}
          >
            3
          </Button>
          <Button
            style={{ border: "none", fontWeight: "bold" }}
            onClick={() => {
              setPage(4);
            }}
          >
            4
          </Button>
        </div>

        <Form form={form} layout="vertical" name="newTopicForm">
          {page === 1 ? (
            <div>
              <TopicTitle value={topic} onChange={handleTopicInput} />
              <Frequency value={topic} onChange={handleTopicInput} />
            </div>
          ) : null}
          {page === 2 ? (
            <ContextType value={topic} onChange={handleTopicInput} />
          ) : null}
          {page === 3 ? (
            <ContextQuestions value={topic} onChange={handleQuestions} />
          ) : null}
          {page === 4 ? (
            <RequestQuestions value={topic} onChange={handleQuestions} />
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};

export default RenderNewTopic;

// OLD PAGINATION ATTEMPT
// {/* TOPIC NAME */}
// <TopicTitle page={page} value={topic} onChange={handleTopicInput} />

// {/* TOPIC FREQUENCY */}
// <Frequency page={page} value={topic} onChange={handleTopicInput} />

// {/* TOPIC CONTEXT TYPE */}
// <ContextType page={page} value={topic} onChange={handleTopicInput} />

// {/* TOPIC CONTEXT QUESTIONS */}
// <ContextQuestions page={page} value={topic} onChange={handleTopicInput} />

// {/* TOPIC CONTEXT RESPONSES */}
// <ContextResponses page={page} value={topic} onChange={handleTopicInput} />
