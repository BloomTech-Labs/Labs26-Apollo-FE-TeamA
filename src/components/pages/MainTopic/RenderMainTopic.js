import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import Requests from "../../home_components/Requests";
import EditDetails from "./EditComponents/EditDetails";
import EditContext from "./EditComponents/EditContext";
import EditContextQ from "./EditComponents/EditContextQ";
import EditContextR from "./EditComponents/EditContextR";
import EditRequestQ from "./EditComponents/EditRequestQ";
import { TopicListContext } from "../../../state/contexts/TopicListContext";
import { TopicQuestionsContext } from "../../../state/contexts/TopicQuestionsContext";
import { QuestionsContext } from "../../../state/contexts/QuestionsContext";
import { ResponsesContext } from "../../../state/contexts/ResponsesContext";
import { Button, message, Dropdown, Menu, Modal, Form } from "antd";
import { SettingFilled } from "@ant-design/icons";
import {
  getTopic,
  getContextByID,
  createResponse,
  createTopicQuestion,
  editTopic,
  editTopicQuestion,
  editResponse,
  deleteTopic,
  deleteTopicQuestion,
  deleteResponse
} from "../../../api/index";

const RenderMainTopic = ({ topicID, reset, user }) => {
  const textAreaRef = useRef();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);

  const { topics } = useContext(TopicListContext);
  const { topicQuestions } = useContext(TopicQuestionsContext);
  const { questions } = useContext(QuestionsContext);
  const { responseList } = useContext(ResponsesContext);

  const [topic, setTopic] = useState({});
  const [context, setContext] = useState({});
  const [topicResponses, setTopicResponses] = useState([]);
  const [contextQ, setContextQ] = useState([]);
  const [requestQ, setRequestQ] = useState([]);
  let cQ = [];
  let rQ = [];

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
            handleResponses().then(responses => {
              setTopicResponses(responses);
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, [topicID]);

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
    console.log("hQ:", q);
    return q;
  };

  const handleResponses = async () => {
    let contextQ = handleQuestions(
      questions.filter(q => q.type === "Context Questions")
    );
    let r = [];
    for (let i = 0; i < contextQ.length; i++) {
      for (let j = 0; j < responseList.length; j++) {
        if (
          contextQ[i][0].id === responseList[j].questionid &&
          responseList[j].topicid === topicID
        ) {
          r.push(responseList[j]);
        }
      }
    }
    console.log("hR:", r);
    return r;
  };

  const saveTopic = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        editMainTopic(values)
          .then(res => {
            console.log(res);
            handleContextQuestions(values);
            handleRequestQuestions(values);
            handleOldResponses(values).then(res => {
              handleNewResponses(values);
              if (values.newCQ) {
                submitNewCQuestion(values);
              }
              if (values.newRQ) {
                submitNewRQuestion(values);
              }
            });
            setVisible(false);
            reset();
          })
          .catch(err => console.log("Edit topic error", err));
      })
      .catch(err => console.log("Form validation error", err));
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

  const handleContextQuestions = values => {
    let allContextQ = [];
    Object.values(values.oldCQ).map((q, index) => {
      let temp = Object.assign({}, contextQ[0][1]);
      temp.topicid = contextQ[0][1].topicid;
      temp.questionid = q[1];
      temp.id = contextQ[index][1].id;
      allContextQ.push(temp);
      console.log("handleCQ:", temp);
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
      console.log("submitCQ:", temp);
    });

    return axios.all(
      newCQuestions.map(q => {
        deleteTopicQuestion(q).then(res => {
          createTopicQuestion(q);
        });
      })
    );
  };

  const handleOldResponses = values => {
    console.log("contextR:", topicResponses);
    let oldR = [];
    let allOldCQ = Object.values(values.oldCQ);
    let allResponses = Object.values(values.responses);
    let oldResponses = allResponses.slice(0, allOldCQ.length);
    oldResponses.map((res, index) => {
      let temp = Object.assign({}, topicResponses[0]);
      temp.response = res;
      temp.id = topicResponses[index].id;
      temp.questionid = allOldCQ[index][1];
      temp.respondedby = topic.leaderid;
      temp.topicid = topicID;
      oldR.push(temp);
      console.log("handleOR:", temp, oldR);
    });

    return axios.all(
      oldR.map(r => {
        editResponse(r);
      })
    );
  };

  const handleNewResponses = values => {
    let newR = [];
    let newResponses = Object.values(values.responses).slice(
      Object.values(values.oldCQ).length
    );
    newResponses.map((res, index) => {
      let temp = Object.assign({}, topicResponses[0]);
      temp.response = res;
      temp.questionid = values.newCQ[index].question[1];
      temp.respondedby = topic.leaderid;
      temp.topicid = topicID;
      newR.push(temp);
      console.log("handleNR:", temp, newR);
    });

    return axios.all(
      newR.map(r => {
        deleteResponse(r).then(res => {
          createResponse(r);
        });
      })
    );
  };

  const handleRequestQuestions = values => {
    let allRequestQ = [];
    Object.values(values.oldRQ).map((q, index) => {
      let temp = Object.assign({}, requestQ[0][1]);
      temp.topicid = topicID;
      temp.questionid = q[1];
      temp.id = requestQ[index][1].id;
      allRequestQ.push(temp);
      console.log("handleRQ:", temp);
    });

    return axios.all(
      allRequestQ.map(q => {
        editTopicQuestion(q);
      })
    );
  };

  const submitNewRQuestion = values => {
    let newRQuestions = [];
    values.newRQ.map((q, index) => {
      let temp = Object.assign({}, requestQ[0][1]);
      temp.topicid = topicID;
      temp.questionid = q.question[1];
      newRQuestions.push(temp);
      console.log("submitRQ:", temp);
    });

    return axios.all(
      newRQuestions.map(q => {
        deleteTopicQuestion(q).then(res => {
          createTopicQuestion(q);
        });
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
        {context.contextoption} |{" "}
        {topic.topicfrequency === "Off"
          ? null
          : `Occurs ${topic.topicfrequency}`}
      </h2>

      <Button
        className="join-code"
        type="dashed"
        size="large"
        onClick={copyJoinCode}
      >
        Join Code:
        <textarea disabled readonly ref={textAreaRef} value={topic.joincode}>
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

      <div className="requests-container">
        <div className="requests-list">
          <h2 className="requests-list-title">Responses</h2>
          <Requests />
        </div>
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
            {page === 4 ? (
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
            <EditContextR form={form} page={page} contextR={topicResponses} />
          </div>
          <div className={page === 4 ? null : "closed"}>
            <EditRequestQ requestQ={requestQ} />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RenderMainTopic;
