import React, { useState } from "react";
import { Button, Modal, Form, Steps } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import TopicDetails from "./TopicComponents/TopicDetails";
import ContextType from "./TopicComponents/ContextType";
import ContextQuestions from "./TopicComponents/ContextQuestions";
import ContextResponses from "./TopicComponents/ContextResponses";
import RequestQuestions from "./TopicComponents/RequestQuestions";
import generator from "generate-password";
import {
  createTopic,
  createTopicQuestion,
  createResponse
} from "../../../api/index";
import axios from "axios";

const RenderNewTopic = props => {
  // set the JOIN CODE
  const joinCode = generator.generate({
    length: 6,
    numbers: true,
    excludeSimilarCharacters: true
  });

  // initialize a question object
  const newTopicQuestion = {
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
  const [topicQuestion, setTopicQuestion] = useState(newTopicQuestion);
  const [response, setResponse] = useState(newResponse);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  let allTopicQuestions = [];
  let allResponses = [];

  // cancel topic creation
  const onCancel = () => {
    form.resetFields();
    setVisible(false);
    setPage(0);
  };

  // display Join code on submit
  const showJoinCode = values => {
    return Modal.confirm({
      title: "Here is your join code: ",
      icon: <InfoCircleTwoTone />,
      content: values.topic.joincode,
      okText: "Ok"
    });
  };

  // submit handler for new topic form
  const onCreate = () => {
    form
      .validateFields()
      .then(values => {
        // create a new topic
        createTopic(values.topic)
          .then(res => {
            let topicID = res.topic.id;
            handleTopicQuestions(values, topicID);
            // create topic questions
            submitTopicQuestions(allTopicQuestions)
              .then(() => {
                handleResponses(topicID, values);
                // create responses
                submitResponses(allResponses);
              })
              .then(() => {
                form.resetFields();
                setVisible(false);
                showJoinCode(values);
              });
          })
          .catch(err => console.log("Creating topic error", err));
      })
      .catch(info => console.log("Validating the form:", info));
  };

  // creating topic questions for all selected questions
  const handleTopicQuestions = (values, topicID) => {
    values.contextQuestions.map(q => {
      let temp = Object.assign({}, topicQuestion);
      temp.topicid = topicID;
      temp.questionid = q.question[1];
      allTopicQuestions.push(temp);
    });

    values.requestQuestions.map(q => {
      let temp = Object.assign({}, topicQuestion);
      temp.topicid = topicID;
      temp.questionid = q.question;
      allTopicQuestions.push(temp);
    });
  };

  const submitTopicQuestions = questions => {
    return axios.all(
      questions.map(q => {
        createTopicQuestion(q);
      })
    );
  };

  // creating responses to context questions
  const handleResponses = (topicID, values) => {
    values.contextQuestions.map(q => {
      let temp = Object.assign({}, response);
      temp.questionid = q.question[1];
      temp.response = values.responses[q.question[1]];
      temp.respondedby = props.user.sub;
      temp.topicid = topicID;
      allResponses.push(temp);
    });
  };

  const submitResponses = responses => {
    return axios.all(
      responses.map(r => {
        createResponse(r);
      })
    );
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
        title="Create a new topic"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onCreate}
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
              <Button type="primary" onClick={onCreate}>
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

        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            className="closed"
            name={["topic", "joincode"]}
            initialValue={joinCode}
          ></Form.Item>

          <Form.Item
            className="closed"
            name={["topic", "leaderid"]}
            initialValue={props.user.sub}
          ></Form.Item>

          <div className={page === 0 ? null : "closed"}>
            <TopicDetails />
          </div>
          <div className={page === 1 ? null : "closed"}>
            <ContextType />
          </div>
          <div className={page === 2 ? null : "closed"}>
            <ContextQuestions />
          </div>
          <div className={page === 3 ? null : "closed"}>
            <ContextResponses form={form} page={page} />
          </div>
          <div className={page === 4 ? null : "closed"}>
            <RequestQuestions />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RenderNewTopic;
