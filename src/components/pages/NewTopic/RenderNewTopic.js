import React, { useState } from "react";
import { Button, Modal, Form, Steps } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import TopicTitle from "./TopicComponents/TopicTitle";
import Frequency from "./TopicComponents/Frequency";
import ContextType from "./TopicComponents/ContextType";
import ContextQuestions from "./TopicComponents/ContextQuestions";
import ContextResponses from "./TopicComponents/ContextResponses";
import RequestQuestions from "./TopicComponents/RequestQuestions";
import generator from "generate-password";
import axios from "axios";

// TO DO's ----------------
// - IMPLEMENT SELECTING RESPONSE TYPE FUNCTIONALITY

const RenderNewTopic = props => {
  // set the JOIN CODE
  const joinCode = generator.generate({
    length: 6,
    numbers: true,
    excludeSimilarCharacters: true
  });

  // initialize a new topic object
  const newTopicValues = {
    topicname: "",
    topicfrequency: "",
    contextid: "",
    leaderid: props.user.sub,
    joincode: joinCode
  };

  // initialize a collection of all questions
  const newTopicQuestions = {
    contextQ: [],
    requestQ: []
  };

  // initialize a question object
  const newQuestion = {
    topicid: "",
    questionid: ""
  };

  // initialize a response object
  const newResponse = {
    questionid: "",
    response: "",
    respondedby: "",
    topicid: ""
  };

  // state variables
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [topic, setTopic] = useState(newTopicValues);
  const [question, setQuestion] = useState(newQuestion);
  const [topicQuestions, setTopicQuestions] = useState(newTopicQuestions);
  const [response, setResponse] = useState(newResponse);
  const [responses, setResponses] = useState([]);
  let allQuestions = [];
  let allTopicQuestions = [];
  let allResponses = [];

  // axios authentication
  const idToken = JSON.parse(localStorage.getItem("okta-token-storage")).idToken
    .idToken;
  const auth = { headers: { Authorization: `Bearer ${idToken}` } };

  // handle state for topic
  const handleTopicInput = (name, value) => {
    setTopic({
      ...topic,
      [name]: value
    });
  };

  // handle state for all questions
  const handleQuestions = (name, q) => {
    setTopicQuestions({
      ...topicQuestions,
      [name]: q
    });
  };

  // handle state for all responses
  const handleResponses = r => {
    setResponses(r);
  };

  // map all question ids to question state
  const handleAllQuestions = topic => {
    return allQuestions.map(q => {
      let temp = Object.assign({}, question);
      temp.topicid = topic.id;
      temp.questionid = q.id;
      allTopicQuestions.push(temp);
      return temp;
    });
  };

  // map all context responses to response state
  const handleAllResponses = topic => {
    return responses.map((r, index) => {
      let temp = Object.assign({}, response);
      temp.topicid = topic.id;
      temp.questionid = allQuestions[index].id;
      temp.response = r;
      temp.respondedby = topic.leaderid;
      allResponses.push(temp);
      return temp;
    });
  };

  // display Join code on submit
  const showJoinCode = () => {
    return Modal.confirm({
      title: "Here is your join code: ",
      icon: <InfoCircleTwoTone />,
      content: topic.joincode,
      okText: "Ok"
    });
  };

  // submitting topics
  const createTopic = () => {
    allQuestions = topicQuestions.contextQ.concat(topicQuestions.requestQ);
    console.log("allQuestions:", allQuestions);

    axios
      .post("https://apollo-a-api.herokuapp.com/topic", topic, auth)
      .then(res => {
        console.log("POST to /topic", res.data.topic);
        let createdTopic = res.data.topic;
        handleAllQuestions(createdTopic);
        console.log("allTopicQuestions:", allTopicQuestions);

        axios
          .all(
            allTopicQuestions.map(q =>
              axios.post(
                "https://apollo-a-api.herokuapp.com/topicquestion",
                q,
                auth
              )
            )
          )
          .then(res => {
            console.log("POST to /topicquestion", res);
            handleAllResponses(createdTopic);
            console.log("allResponses:", allResponses);

            axios
              .all(
                allResponses.map(r =>
                  axios.post(
                    "https://apollo-a-api.herokuapp.com/response",
                    r,
                    auth
                  )
                )
              )
              .then(res => {
                console.log("POST to /response", res);
                setTopic(newTopicValues);
                setVisible(false);
                setPage(0);
                showJoinCode();
              })
              .catch(err => {
                console.log("POST to /response", err, topic);
                alert(
                  "There was an error creating the topic. Please try again."
                );
              });
          })
          .catch(err => {
            console.log("POST to /topicquestion", err, topic);
            alert("There was an error creating the topic. Please try again.");
          });
      })
      .catch(err => console.log("POST to /topic: ", err, topic));
  };

  // cancel topic creation
  const cancelTopic = () => {
    setTopic(newTopicValues);
    setVisible(false);
    setPage(0);
  };

  const paginate = p => {
    setPage(p);
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
        maskClosable={false}
        footer={
          <>
            {page === 0 ? null : (
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
        <Steps progressDot size="small" current={page}>
          <Steps.Step title="Topic Info" />
          <Steps.Step title="Context" />
          <Steps.Step title="Context Questions" />
          <Steps.Step title="Context Responses" />
          <Steps.Step title="Response Questions" />
        </Steps>

        <Form form={form} layout="vertical" name="newTopicForm">
          {page === 0 ? (
            <div>
              <TopicTitle value={topic} onChange={handleTopicInput} />
              <Frequency
                page={paginate}
                value={topic}
                onChange={handleTopicInput}
              />
            </div>
          ) : null}
          {page === 1 ? (
            <ContextType
              page={paginate}
              value={topic}
              onChange={handleTopicInput}
            />
          ) : null}
          {page === 2 ? (
            <ContextQuestions page={paginate} onChange={handleQuestions} />
          ) : null}
          {page === 3 ? (
            <ContextResponses
              page={paginate}
              value={topicQuestions}
              onChange={handleResponses}
            />
          ) : null}
          {page === 4 ? (
            <RequestQuestions
              page={paginate}
              value={topic}
              onChange={handleQuestions}
            />
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};

export default RenderNewTopic;
