import React, { useState, useEffect, useRef } from "react";
import { Button, message, Dropdown, Menu, Modal } from "antd";
import { SettingFilled } from "@ant-design/icons";
import {
  getTopic,
  getContextByID,
  getAllQuestions,
  getAllTopicQuestions,
  getAllResponses,
  deleteTopic
} from "../../../api/index";

const RenderMainTopic = ({ topicID, reset }) => {
  const [topic, setTopic] = useState({});
  const [context, setContext] = useState({});
  const [contextQuestions, setContextQuestions] = useState([]);
  const [requestQuestions, setRequestQuestions] = useState([]);
  const [topicResponses, setTopicResponses] = useState([]);
  const [visible, setVisible] = useState(false);
  const textAreaRef = useRef();

  useEffect(() => {
    getTopic(topicID)
      .then(res => {
        setTopic(res);
        getContextByID(res.contextid)
          .then(res => {
            setContext(res);
            getAllQuestions()
              .then(res => {
                let questions = res.filter(q => q.topicid === topicID);
                getAllTopicQuestions(questions)
                  .then(res => {
                    let cQ = res.filter(
                      q => q.data.type === "Context Questions"
                    );
                    let rQ = res.filter(
                      q => q.data.type === "Request Questions"
                    );
                    setContextQuestions(cQ);
                    setRequestQuestions(rQ);
                    getAllResponses()
                      .then(res => {
                        let responses = res.filter(r => r.topicid === topicID);
                        setTopicResponses(responses);
                      })
                      .catch(err => console.log("repsonses:", err));
                  })
                  .catch(err => console.log("questions:", err));
              })
              .catch(err => console.log("topicquestions:", err));
          })
          .catch(err => console.log("context:", err));
      })
      .catch(err => console.log("topic:", err));
  }, [topicID]);

  const copyJoinCode = e => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    message.info("Copied Join Code!");
  };

  const saveTopic = () => {};

  const deleteMainTopic = () => {
    deleteTopic(topicID);
    reset();
  };

  const settingsMenu = (
    <Menu className="settings-menu">
      <Menu.Item>
        <button onClick={() => setVisible(true)}>Edit</button>
      </Menu.Item>

      <Menu.Item>
        <button onClick={deleteMainTopic}>Delete</button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="main-topic">
      <div className="topic-title-content">
        <h1 className="topic-name">{topic.topicname}</h1>

        <Dropdown overlay={settingsMenu}>
          <button className="settings-button">
            <SettingFilled />
          </button>
        </Dropdown>
      </div>

      <h2>
        {context.contextoption} | Occurs {topic.topicfrequency}
      </h2>

      <Button type="dashed" size="large" onClick={copyJoinCode}>
        Join Code:
        <textarea disabled readonly ref={textAreaRef} value={topic.joincode}>
          {topic.joincode}
        </textarea>
      </Button>

      <Modal
        visible={visible}
        width={700}
        title="Edit Topic"
        okText="Save"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={saveTopic}
        maskClosable={false}
      ></Modal>
    </div>
  );
};

export default RenderMainTopic;
