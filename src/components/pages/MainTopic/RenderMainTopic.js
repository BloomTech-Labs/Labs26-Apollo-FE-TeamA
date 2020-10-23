import React, { useState, useEffect, useRef } from "react";
import { Button, message, Dropdown, Menu, Modal } from "antd";
import { SettingFilled, UserOutlined } from "@ant-design/icons";
import Responses from "../../home_components/Responses";
import {
  getTopic,
  getContextByID,
  deleteTopic,
  getAllTopicMembers,
  getAllCQ,
  getAllContextResponses
} from "../../../api/index";
import Requests from "../../home_components/Requests";
import SurveyRequest from "../SurveyRequest/SurveyRequestContainer";

const RenderMainTopic = ({
  topicID,
  reset,
  getResponseList,
  requestID,
  user
}) => {
  const textAreaRef = useRef();
  const [topic, setTopic] = useState({});
  const [members, setMembers] = useState([]);
  const [context, setContext] = useState({});
  const [surveyRequestContext, setSurveyRequestContext] = useState([]);
  const [visible, setVisible] = useState(false);

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
        <Button
          onClick={() => {
            setVisible(true);
          }}
        >
          Delete
        </Button>

        <Modal
          title="Are you sure you want to delete this topic?"
          visible={visible}
          centered
          onOk={deleteMainTopic}
          onCancel={() => {
            setVisible(false);
          }}
          okText="Delete"
        >
          Deleting this topic will prevent you from accessing any survey
          requests related to this topic. This cannot be undone. Click "Delete"
          to confirm.
        </Modal>
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

  useEffect(() => {
    let tempContext = [];
    getAllCQ().then(cQ => {
      console.log(cQ);
      getAllContextResponses().then(cR => {
        console.log(cR);
        for (let i = 0; i < cQ.length; i++) {
          for (let j = 0; j < cR.length; j++) {
            if (
              cR[j].surveyrequestid === requestID &&
              cR[j].contextquestionid === cQ[i].id
            ) {
              cR[j].contextquestionid = cQ[i];
              tempContext.push(cR[j]);
            }
          }
        }
        setSurveyRequestContext(tempContext);
      });
    });
  }, [requestID]);

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

      <div className="survey-requests">
        <h3>Survey Requests</h3>

        <SurveyRequest user={user} topicID={topicID} />

        <Requests getResponseList={getResponseList} />

        <div className="survey-request-context">
          {surveyRequestContext.length >= 1 ? (
            <h2>{context.contextoption}</h2>
          ) : null}

          {surveyRequestContext
            ? surveyRequestContext.map((c, index) => {
                return (
                  <div>
                    <h3>
                      {index + 1}. {c.contextquestionid.question}
                    </h3>
                    <h4 style={{ textAlign: "left", color: "black" }}>
                      {c.response}
                    </h4>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default RenderMainTopic;
