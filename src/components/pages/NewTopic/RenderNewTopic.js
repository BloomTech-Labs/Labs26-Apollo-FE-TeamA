import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Steps, message } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import TopicDetails from "./TopicComponents/TopicDetails";
import ContextType from "./TopicComponents/ContextType";
import ContextQuestions from "./TopicComponents/ContextQuestions";
import RequestQuestions from "./TopicComponents/RequestQuestions";
import generator from "generate-password";
import axios from "axios";
import {
  getCQ,
  getRQ,
  createCQ,
  createRQ,
  createTopic,
  createTopicCQ,
  createTopicRQ
} from "../../../api/index";

const RenderNewTopic = props => {
  // state variables
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [presetCQ, setPresetCQ] = useState([]);
  const [presetRQ, setPresetRQ] = useState([]);

  // fetch default context questions
  useEffect(() => {
    getCQ()
      .then(res => {
        console.log("CQ:", res);
        const cleanCQ = res.map(({ id, ...attributes }) => attributes);
        setPresetCQ(cleanCQ);
      })
      .catch(err => console.log(err));
  }, []);

  // fetch default request questions
  useEffect(() => {
    getRQ()
      .then(res => {
        console.log("RQ:", res);
        const cleanRQ = res.map(({ id, ...attributes }) => attributes);
        setPresetRQ(cleanRQ);
      })
      .catch(err => console.log(err));
  }, []);

  // preset context/request questions and their ids'
  const presetID = {
    "What is your current priority?": 1,
    "Do you have any key learnings to share with the team from stakeholders or customers?": 2,
    "What upcoming demos or events should the team be aware of?": 3,
    "What are you working on today?": 1,
    "Are there any monsters in your path?": 2,
    "What is your favorite dessert?": 3
  };

  // set the JOIN CODE
  const joinCode = generator.generate({
    length: 6,
    numbers: true,
    excludeSimilarCharacters: true
  });

  // display Join code on submit
  const showJoinCode = values => {
    return Modal.confirm({
      title: "Here is your join code: ",
      icon: <InfoCircleTwoTone />,
      content: values.topic.joincode,
      okText: "Ok"
    });
  };

  // create context questions and topic context questions
  const handleCQ = (topic, values) => {
    let newCQ = Object.values(values.cQ);
    console.log(newCQ);
    return axios.all(
      newCQ.map(q => {
        // if the question is a preset, don't POST it again
        if (presetID[q.question]) {
          let newTopicCQ = {
            topicid: topic.id,
            contextquestionid: presetID[q.question]
          };
          createTopicCQ(newTopicCQ);
        } else {
          // else if the question is new, POST it to /contextquestion
          createCQ(q)
            .then(res => {
              let newTopicCQ = {
                topicid: topic.id,
                contextquestionid: res.question.id
              };
              createTopicCQ(newTopicCQ);
            })
            .catch(err => console.log(err));
        }
      })
    );
  };

  // create request questions and topic request questions
  const handleRQ = (topic, values) => {
    let newRQ = Object.values(values.rQ);
    console.log(newRQ);
    return axios.all(
      newRQ.map(q => {
        // if the question is a preset, don't POST it again
        if (presetID[q.question]) {
          let newTopicRQ = {
            topicid: topic.id,
            requestquestionid: presetID[q.question]
          };
          createTopicRQ(newTopicRQ);
        } else {
          // else if the question is new, POST it to /requestquestion
          createRQ(q)
            .then(res => {
              let newTopicRQ = {
                topicid: topic.id,
                requestquestionid: res.question.id
              };
              createTopicRQ(newTopicRQ);
            })
            .catch(err => console.log(err));
        }
      })
    );
  };

  // create topic
  const onCreate = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        createTopic(values.topic)
          .then(res => {
            let newTopic = res.topic;
            handleCQ(newTopic, values);
            handleRQ(newTopic, values);
            showJoinCode(values);
            form.resetFields();
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
        err.errorFields.map(err => {
          return message.error(`${err.errors[0]}`, 10);
        });
      });
  };

  // cancel topic creation
  const onCancel = () => {
    form.resetFields();
    setVisible(false);
    setPage(0);
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
        centered
        width="50%"
        bodyStyle={{
          width: "60%",
          height: "60vh",
          overflow: "auto",
          overflowX: "hidden",
          margin: "0 auto"
        }}
        title="New Topic"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onCreate}
        maskClosable={false}
        footer={
          <>
            {page === 0 ? null : (
              <Button
                style={{ width: "15%" }}
                type="secondary"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Back
              </Button>
            )}
            {page === 3 ? (
              <Button
                type="primary"
                style={{ width: "30%" }}
                onClick={onCreate}
              >
                Create Topic
              </Button>
            ) : (
              <Button
                style={{ width: "15%" }}
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
        <Steps
          className="progress-bar"
          progressDot
          size="small"
          current={page}
          style={{ marginBottom: "1rem" }}
        >
          <Steps.Step />
          <Steps.Step />
          <Steps.Step />
          <Steps.Step />
        </Steps>

        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ cQ: presetCQ, rQ: presetRQ }}
        >
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
            <RequestQuestions />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RenderNewTopic;
