import React, { useState, useEffect } from "react";
import {
  getTopics,
  getContext,
  getAllQuestions,
  getAllTopicQuestions,
  getAllResponses
} from "../../../api/index";
import axios from "axios";

const RenderMainTopic = ({ topicID }) => {
  const [topic, setTopic] = useState({});
  const [context, setContext] = useState({});
  const [contextQuestions, setContextQuestions] = useState([]);
  const [requestQuestions, setRequestQuestions] = useState([]);
  const [topicResponses, setTopicResponses] = useState([]);
  let allQuestions = [];

  useEffect(() => {
    getTopics(topicID)
      .then(res => {
        setTopic(res);
        getContext(res.contextid)
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
                        console.log("cQ:", contextQuestions);
                        console.log("rQ:", requestQuestions);
                        console.log("responses:", topicResponses);
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

  // let pairs = {};

  // const mapQR = () => {
  //   contextQuestions.forEach((k, i) => {
  //     pairs[k.data.question] = topicResponses[i];
  //   })
  //   console.log("pairs:", pairs)
  // };

  return (
    <div>
      <h1>{topic.topicname}</h1>
      <h3>Occurs {topic.topicfrequency}</h3>
      <h3>Context: {context.contextoption}</h3>
      <h3>Join Code: {topic.joincode}</h3>

      <div>
        <h2>Context Questions</h2>
        {contextQuestions.map(q => {
          return <h3>{q.data.question}</h3>;
        })}
      </div>

      <div>
        <h2>Request Questions</h2>
        {requestQuestions.map(q => {
          return <h3>{q.data.question}</h3>;
        })}
      </div>
    </div>
  );
};

export default RenderMainTopic;
