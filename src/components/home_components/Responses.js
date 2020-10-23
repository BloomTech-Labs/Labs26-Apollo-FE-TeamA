import React, { useState, useEffect } from "react";
import { Divider, Drawer } from "antd";
import ResponseForm from "../pages/Responses/ResponseForm";
import {
  getTopic,
  getAllRequestQuestions,
  getAllRequestResponses,
  getAllThreads
} from "../../api/index";

const Responses = props => {
  const [topic, setTopic] = useState({});
  const [responses, setResponses] = useState([]);
  const [responseID, setResponseID] = useState(0);
  const [threads, setThreads] = useState([]);
  const [showThread, setShowThread] = useState(false);

  useEffect(() => {
    getTopic(props.topicID)
      .then(res => {
        setTopic(res);
      })
      .catch(err => console.log(err));
  }, [props.topicID]);

  useEffect(() => {
    getAllThreads().then(res => {
      let tempThreads = res.filter(t => t.responseid === responseID);
      setThreads(tempThreads);
    });
  }, [responseID]);

  // CURRENTLY GRABS TOPIC REQUEST QUESTIONS, NOT SURVEY REQUEST QUESTIONS
  // THE SURVEY REQUEST QUESTIONS ENDPOINT IS MISSING

  useEffect(() => {
    let tempR = [];
    getAllRequestQuestions().then(rQ => {
      getAllRequestResponses().then(rR => {
        for (let i = 0; i < rQ.length; i++) {
          for (let j = 0; j < rR.length; j++) {
            if (
              rQ[i].id === rR[j].requestquestionid &&
              rR[j].surveyrequestid === props.requestID &&
              rR[j].id !== 4 &&
              rR[j].id !== 5
            ) {
              rR[j].requestquestionid = rQ[i].question;
              tempR.push(rR[j]);
            }
          }
        }
        setResponses(tempR);
      });
    });
  }, [props.requestID]);

  const selectThread = id => {
    setResponseID(id);
    setShowThread(true);
  };

  return (
    <>
      <h2>Responses</h2>

      <div className="response-card">
        {responses.length > 0 ? (
          <div>
            <h3 style={{ fontWeight: "bold", opacity: "60%" }}>
              {props.user.name}
            </h3>
            {responses.map((response, index) => {
              return (
                <div className="response">
                  <h3 style={{ color: "#7F64FF" }}>
                    {index + 1}. {response.requestquestionid}
                  </h3>
                  <button
                    className="response-answer"
                    onClick={() => {
                      selectThread(response.id);
                    }}
                  >
                    {response.response}
                  </button>

                  <Drawer
                    title="Thread"
                    placement="right"
                    closable={false}
                    onClose={() => {
                      setShowThread(false);
                    }}
                    visible={showThread}
                    width="40%"
                    maskStyle={{ opacity: "0.5" }}
                  >
                    {threads.map(t => {
                      return <p>{t.reply}</p>;
                    })}
                  </Drawer>
                </div>
              );
            })}
          </div>
        ) : (
          <p>There are no responses for this survey request.</p>
        )}
      </div>

      <Divider />

      <ResponseForm questions={responses} user={props.user} topic={topic} />
    </>
  );
};
export default Responses;
