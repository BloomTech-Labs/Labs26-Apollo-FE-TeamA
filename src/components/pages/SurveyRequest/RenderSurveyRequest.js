import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Steps } from "antd";
import SurveyContextQuestions from "./SurveyComponents/SurveyContextQuestions";
import SurveyContextResponses from "./SurveyComponents/SurveyContextResponses";
import SurveyRequestQuestions from "./SurveyComponents/SurveyRequestQuestions";
import axios from "axios";
import {
  getContextQuestionByID,
  getAllTopicContextQuestions,
  getRequestQuestionByID,
  getAllTopicRequestQuestions,
  createRequest,
  createCQ,
  createContextResponse,
  createRQ
  // createSurveyRequestQuestion,
} from "../../../api/index";

const RenderSurveyRequest = props => {
  const [topicCQ, setTopicCQ] = useState([]);
  const [topicRQ, setTopicRQ] = useState([]);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [form] = Form.useForm();

  // preset context/request questions and their ids'
  const presetID = {
    "What is your current priority?": 1,
    "Do you have any key learnings to share with the team from stakeholders or customers?": 2,
    "What upcoming demos or events should the team be aware of?": 3,
    "What are you working on today?": 1,
    "Are there any monsters in your path?": 2,
    "What is your favorite dessert?": 3
  };

  useEffect(() => {
    const tempCQ = [];
    getAllTopicContextQuestions().then(res => {
      const tCQ = res.filter(question => question.topicid === props.topicID);
      axios.all(
        tCQ.map(cq => {
          getContextQuestionByID(cq.contextquestionid).then(res => {
            tempCQ.push(res);
            setTopicCQ(tempCQ);
          });
        })
      );
    });
  }, []);

  useEffect(() => {
    const tempRQ = [];
    getAllTopicRequestQuestions().then(res => {
      const tRQ = res.filter(question => question.topicid === props.topicID);
      axios.all(
        tRQ.map(cq => {
          getRequestQuestionByID(cq.requestquestionid).then(res => {
            tempRQ.push(res);
            setTopicRQ(tempRQ);
          });
        })
      );
    });
  }, []);

  const handleContext = (requestID, values) => {
    let cQ = Object.values(values.cQ);
    let cR = Object.values(values.cR);

    for (let i = 0; i < cQ.length; i++) {
      if (cQ[i].id === null) {
        createCQ(cQ[i])
          .then(res => {
            if (cR[res.question]) {
              let tempCR = {
                surveyrequestid: requestID,
                contextquestionid: res.id,
                response: cR[res.question].response
              };
              createContextResponse(tempCR);
            }
          })
          .catch(err => console.log("handleContext:", err));
      } else {
        let tempCR = {
          surveyrequestid: requestID,
          contextquestionid: cR[cQ[i].id],
          response: cR[cQ[i]].response
        };
        createContextResponse(tempCR);
      }
    }
  };

  const handleRQ = (requestID, values) => {
    let rQ = Object.values(values.rQ);

    return axios
      .all(
        rQ.map(question => {
          if (question.id === null) {
            createRQ(question)
              .then(res => {
                // REQUIRES A SURVEY REQUEST QUESTION ENDPOINT TO POST TO
                let tempRQ = {
                  surveyrequestid: requestID,
                  requestquestionid: res.id
                };
                // createSurveyRequestQuestion(tempRQ);
              })
              .catch(err => console.log("Creating new request question:", err));
          } else {
            let tempRQ = {
              surveyrequestid: requestID,
              requestquestionid: question.id
            };
            // createSurveyRequestQuestion(tempRQ);
          }
        })
      )
      .then(res => console.log("handleRQ:", res))
      .catch(err => console.log("handleRQ:", err));
  };

  const onCreate = () => {
    form.validateFields().then(values => {
      console.log(values);
      createRequest(values.surveyrequest).then(res => {
        handleContext(res.id, values);
        handleRQ(res.id, values);
        setVisible(false);
        setPage(0);
        form.resetFields();
      });
    });
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
    setPage(0);
  };

  return (
    <div>
      <Button
        className="new-request-button"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Survey Request
      </Button>

      {visible ? (
        <Modal
          visible={visible}
          centered
          width="50%"
          bodyStyle={{
            width: "70%",
            height: "60vh",
            overflow: "auto",
            overflowX: "hidden",
            margin: "0 auto"
          }}
          title="New Survey Request"
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
              {page === 2 ? (
                <Button
                  type="primary"
                  style={{ width: "30%" }}
                  onClick={onCreate}
                >
                  Create New Request
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
          </Steps>

          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ cQ: topicCQ, rQ: topicRQ }}
          >
            <Form.Item
              className="closed"
              name={["surveyrequest", "topicid"]}
              initialValue={props.topicID}
            ></Form.Item>

            <div className={page === 0 ? null : "closed"}>
              <SurveyContextQuestions />
            </div>

            <div className={page === 1 ? null : "closed"}>
              <SurveyContextResponses form={form} page={page} />
            </div>

            <div className={page === 2 ? null : "closed"}>
              <SurveyRequestQuestions />
            </div>
          </Form>
        </Modal>
      ) : null}
    </div>
  );
};

export default RenderSurveyRequest;
