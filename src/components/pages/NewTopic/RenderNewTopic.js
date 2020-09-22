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
  createQuestion,
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

  const newQuestion = {
    id: "",
    type: "",
    style: "",
    question: ""
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
  const [question, setQuestion] = useState(newQuestion);
  const [topicQuestion, setTopicQuestion] = useState(newTopicQuestion);
  const [response, setResponse] = useState(newResponse);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const contextQuestions = [];
  let requestIDs = [];
  let allTopicIDs = [];
  let allTopicQuestions = [];
  let allResponses = [];

  // cancel topic creation
  const onCancel = () => {
    form.resetFields();
    setVisible(false);
    setPage(0);
  };

  // handling pagination
  const paginate = p => {
    setPage(p);
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

  const onCreate = () => {
    form
      .validateFields()
      .then(values => {
        console.log("Received values of form: ", values);
        createTopic(values.topic)
          .then(res => {
            let createdTopic = res.topic;
            handleContextQuestions(values);
            axios
              .all(
                values.requestQuestions.map(rq => {
                  console.log(rq);
                  createQuestion(rq)
                    .then(res => {
                      console.log("RES:", res);
                      requestIDs.push(res.id);
                    })
                    .catch(err =>
                      console.log("getting request question ids", err)
                    );
                })
              )
              .then(res => {
                handleTopicQuestions(createdTopic.id);
                axios
                  .all(
                    allTopicQuestions.map(q => {
                      createTopicQuestion(q);
                    })
                  )
                  .then(res => {
                    handleResponses(createdTopic.id, values);
                    axios.all(
                      allResponses.map(r => {
                        createResponse(r).then(res => {
                          form.resetFields();
                          setVisible(false);
                          showJoinCode(values);
                        });
                      })
                    );
                  })
                  .catch(err => console.log("creating topic questions", err));
              })
              .catch(err => console.log("Creating questions", err));
          })
          .catch(err => console.log("Creating a topic", err));
      })
      .catch(info => {
        console.log("Validating the form:", info);
      });
  };

  // creating context questions
  const handleContextQuestions = values => {
    values.contextQuestions.map(q => {
      let temp = Object.assign({}, question);
      temp.id = q.question[1];
      temp.type = q.type;
      temp.style = q.style;
      temp.question = q.question[0];
      contextQuestions.push(temp);
    });
  };

  // creating all topic questions
  const handleTopicQuestions = topicID => {
    console.log("cQ:", contextQuestions);
    console.log("rID:", requestIDs);
    allTopicIDs = contextQuestions.map(q => q.id).concat(requestIDs);
    console.log("aT:", allTopicIDs);

    allTopicIDs.map(id => {
      let temp = Object.assign({}, topicQuestion);
      temp.topicid = topicID;
      temp.questionid = id;
      allTopicQuestions.push(temp);
    });
  };

  // creating responses to context questions
  const handleResponses = (topicID, values) => {
    contextQuestions.map(q => {
      let temp = Object.assign({}, response);
      temp.questionid = q.id;
      temp.response = values.responses[q.id];
      temp.respondedby = props.user.sub;
      temp.topicid = topicID;
      allResponses.push(temp);
    });
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
