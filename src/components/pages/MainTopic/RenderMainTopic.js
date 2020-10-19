import React, { useState, useEffect, useRef } from "react";
import { Button, message, Dropdown, Menu } from "antd";
import { SettingFilled, UserOutlined } from "@ant-design/icons";
import Responses from "../../home_components/Responses";
import {
  getTopic,
  getContextByID,
  deleteTopic,
  getAllTopicMembers
} from "../../../api/index";
import Requests from "../../home_components/Requests";

const RenderMainTopic = ({
  topicID,
  reset,
  getResponseList,
  requestID,
  getThreadList,
  user
}) => {
  const textAreaRef = useRef();
  const [topic, setTopic] = useState({});
  const [members, setMembers] = useState([]);
  const [context, setContext] = useState({});

  const deleteMainTopic = () => {
    deleteTopic(topicID);
    reset();
  };

  const copyJoinCode = e => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    message.info("Copied Join Code");
  };

  const settingsMenu = (
    <Menu className="settings-menu">
      <Menu.Item>
        <button onClick={deleteMainTopic}>Delete</button>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    getTopic(topicID)
      .then(res => {
        setTopic(res);
        getContextByID(res.contextid)
          .then(res => {
            setContext(res);
            getAllTopicMembers().then(res => {
              let topicMembers = res.filter(m => m.topicid === topicID);
              setMembers(topicMembers);
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, [topicID]);

  return (
    <div className="main-topic">
      <div className="topic-title-content">
        <h1 className="topic-name">{topic.topicname}</h1>

        <Dropdown
          className={user.sub === topic.leaderid ? "" : "hidden-edit"}
          overlay={settingsMenu}
        >
          <button className="settings-button">
            <SettingFilled />
          </button>
        </Dropdown>
      </div>

      <div className="main-topic-extra-details">
        <h2>{context.contextoption}</h2>

        {members.length > 1 ? (
          <h3>
            {members.length + 1} <UserOutlined />
          </h3>
        ) : (
          <h3>
            1 <UserOutlined />
          </h3>
        )}
      </div>

      <Button
        className={user.sub === topic.leaderid ? "join-code" : "hidden-edit"}
        type="dashed"
        size="large"
        onClick={copyJoinCode}
      >
        Join Code:
        <textarea readonly ref={textAreaRef} value={topic.joincode}>
          {topic.joincode}
        </textarea>
      </Button>

      <div className="survey-requests">
        <h3>Survey Requests</h3>

        <Requests getResponseList={getResponseList} />

        {requestID !== 0 ? <Responses getThreadList={getThreadList} /> : null}
      </div>
    </div>
  );
};

export default RenderMainTopic;
