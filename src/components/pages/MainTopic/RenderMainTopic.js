import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import SelectedRequest from "../../selectedRequests/MainSelectRequestContainer";
import EditDetails from "./EditComponents/EditDetails";
import EditContext from "./EditComponents/EditContext";
import EditContextQ from "./EditComponents/EditContextQ";
import EditRequestQ from "./EditComponents/EditRequestQ";
import { TopicListContext } from "../../../state/contexts/TopicListContext";
import { TopicQuestionsContext } from "../../../state/contexts/TopicQuestionsContext";
import { QuestionsContext } from "../../../state/contexts/QuestionsContext";
import { Button, message, Dropdown, Menu, Modal, Form } from "antd";
import { SettingFilled } from "@ant-design/icons";

import {
  getTopic,
  getContextByID,
  getTopicMembers,
  createTopicQuestion,
  editTopic,
  editTopicQuestion,
  deleteTopic
} from "../../../api/index";

const RenderMainTopic = ({ topicID, reset, user }) => {
  const textAreaRef = useRef();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);

  const { topics } = useContext(TopicListContext);
  const { topicQuestions } = useContext(TopicQuestionsContext);
  const { questions } = useContext(QuestionsContext);

  const [topic, setTopic] = useState({});
  const [members, setMembers] = useState([]);
  const [context, setContext] = useState({});
  const [contextQ, setContextQ] = useState([]);
  const [requestQ, setRequestQ] = useState([]);

  let cQ = [];
  let rQ = [];

  const handleQuestions = questions => {
    let q = [];
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < topicQuestions.length; j++) {
        if (
          questions[i].id === topicQuestions[j].questionid &&
          topicQuestions[j].topicid === topicID
        ) {
          q.push([questions[i], topicQuestions[j]]);
        }
      }
    }
    return q;
  };

  const editMainTopic = async values => {
    let temp = Object.assign({}, topic);
    temp.id = topic.id;
    temp.leaderid = topic.leaderid;
    temp.joincode = topic.joincode;
    temp.topicname = values.topic.topicname;
    temp.topicfrequency = values.topic.topicfrequency;
    temp.contextid = values.topic.contextid;
    return editTopic(temp);
  };

  const handleContextQuestions = async values => {
    let allContextQ = [];
    Object.values(values.oldCQ).map((q, index) => {
      let temp = Object.assign({}, contextQ[0][1]);
      temp.topicid = contextQ[0][1].topicid;
      temp.questionid = q[1];
      temp.id = contextQ[index][1].id;
      allContextQ.push(temp);
    });

    return axios.all(
      allContextQ.map(q => {
        editTopicQuestion(q);
      })
    );
  };

  const submitNewCQuestion = values => {
    let newCQuestions = [];
    values.newCQ.map((q, index) => {
      let temp = Object.assign({}, contextQ[0][1]);
      temp.topicid = topicID;
      temp.questionid = q.question[1];
      newCQuestions.push(temp);
    });

    return axios.all(
      newCQuestions.map(q => {
        createTopicQuestion(q);
      })
    );
  };

  const handleRequestQuestions = async values => {
    let allRequestQ = [];
    Object.values(values.oldRQ).map((q, index) => {
      let temp = Object.assign({}, requestQ[0][1]);
      temp.topicid = topicID;
      temp.questionid = q[1];
      temp.id = requestQ[index][1].id;
      allRequestQ.push(temp);
    });

    return axios
      .all(
        allRequestQ.map(q => {
          editTopicQuestion(q);
        })
      )
      .then(res => {
        rQ = handleQuestions(
          questions.filter(q => q.type === "Request Questions")
        );
        setRequestQ(rQ);
      })
      .catch(err => console.log(err));
  };

  const submitNewRQuestion = values => {
    let newRQuestions = [];
    values.newRQ.map((q, index) => {
      let temp = Object.assign({}, requestQ[0][1]);
      temp.topicid = topicID;
      temp.questionid = q.question[1];
      newRQuestions.push(temp);
    });

    return axios.all(
      newRQuestions.map(q => {
        createTopicQuestion(q);
      })
    );
  };

  const deleteMainTopic = () => {
    deleteTopic(topicID);
    reset();
  };

  const copyJoinCode = e => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    message.info("Copied Join Code!");
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

  const saveTopic = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        editMainTopic(values)
          .then(res => {
            handleContextQuestions(values).then(res => {
              handleRequestQuestions(values).then(res => {
                if (values.newCQ) {
                  submitNewCQuestion(values);
                }
                if (values.newRQ) {
                  submitNewRQuestion(values);
                }
                setVisible(false);
                reset();
              });
            });
          })
          .catch(err => console.log("Edit topic error", err));
      })
      .catch(err => console.log("Form validation error", err));
  };

  useEffect(() => {
    getTopic(topicID)
      .then(res => {
        setTopic(res);
        getContextByID(res.contextid)
          .then(res => {
            setContext(res);
            cQ = handleQuestions(
              questions.filter(q => q.type === "Context Questions")
            );
            setContextQ(cQ);
            rQ = handleQuestions(
              questions.filter(q => q.type === "Request Questions")
            );
            setRequestQ(rQ);
            getTopicMembers().then(res => {
              let tM = res.filter(m => m.topicid === topicID);
              setMembers(tM);
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

      <h2>{context.contextoption}</h2>
      <h3>
        {members.length > 1 ? `${members.length + 1} Members` : `1 Member`}
      </h3>

      <Button
        className="join-code"
        type="dashed"
        size="large"
        onClick={copyJoinCode}
      >
        Join Code:
        <textarea readonly ref={textAreaRef} value={topic.joincode}>
          {topic.joincode}
        </textarea>
      </Button>
      <div className="context-questions-container">
        <h2>Context</h2>
        {contextQ.map((q, index) => {
          return (
            <div key={index}>
              <h3 className="context-question">{q[0].question}</h3>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Responses</h3>
        <SelectedRequest />
      </div>
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
            {page === 3 ? (
              <Button type="primary" onClick={saveTopic}>
                Save Topic
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
        <Form form={form} layout="vertical" name="edit-topic">
          <div className={page === 0 ? null : "closed"}>
            <EditDetails topics={topics} topicID={topicID} />
          </div>

          <div className={page === 1 ? null : "closed"}>
            <EditContext topics={topics} topicID={topicID} context={context} />
          </div>

          <div className={page === 2 ? null : "closed"}>
            <EditContextQ contextQ={contextQ} />
          </div>

          <div className={page === 3 ? null : "closed"}>
            <EditRequestQ requestQ={requestQ} />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RenderMainTopic;
