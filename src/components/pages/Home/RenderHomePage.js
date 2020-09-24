import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Requests from "../../home_components/Requests";
import { RequestsContext } from "../../../state/contexts/RequestsContext";
import TopicsList from "../../home_components/TopicsList";
import NewTopicContainer from "../NewTopic/NewTopicContainer";
import MainTopic from "../MainTopic/MainTopicContainer";
import { TopicListContext } from "../../../state/contexts/TopicListContext";
import Responses from "../../home_components/Responses";
import { ResponsesContext } from "../../../state/contexts/ResponsesContext";
import ThreadsList from "../../home_components/ThreadsList";
import { ThreadsContext } from "../../../state/contexts/ThreadsContext";
import { QuestionsContext } from "../../../state/contexts/QuestionsContext";
import { TopicQuestionsContext } from "../../../state/contexts/TopicQuestionsContext";

import {
  getAllResponses,
  getAllTopics,
  getAllThreads,
  getAllQuestions,
  getQuestions
} from "../../../api";

function RenderHomePage(props) {
  // state handlers
  const { userInfo, authService } = props;
  const [topics, setTopics] = useState([]);
  const [topicID, setTopicID] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [topicQuestions, setTopicQuestions] = useState([]);
  const [requestList, setRequests] = useState([]);
  const [responseList, setResponses] = useState([]);
  const [threads, setThreads] = useState([]);
  localStorage.setItem("page_view", '{"value":"owner"}');

  // for selecting a specific topic
  const getTopicID = id => {
    setTopicID(id);
  };

  // used when deleting a topic
  const resetTopicID = () => {
    setTopicID(0);
  };

  useEffect(() => {
    getAllTopics()
      .then(res => {
        let userTopics = res.filter(topic => topic.leaderid == userInfo.sub);
        setTopics(userTopics);
      })
      .catch(err => console.log(err));

    getQuestions()
      .then(res => {
        setQuestions(res);
      })
      .catch(err => console.log(err));

    getAllQuestions()
      .then(res => {
        setTopicQuestions(res);
      })
      .catch(err => console.log(err));

    getAllResponses()
      .then(res => {
        console.log(res);
        setResponses(res);
        setRequests(res);
      })
      .catch(err => console.log(err));

    getAllThreads()
      .then(res => {
        setThreads(res);
      })
      .catch(err => console.log(err));
  }, [topicID]);

  const pageView = JSON.parse(localStorage.getItem("page_view")).value;

  return (
    <div className="home">
      <div className="nav">
        <h2 className="logo">Apollo</h2>

        <Button
          type={pageView === "owner" ? "primary" : "text"}
          name="ownerButton"
          onClick={() => {
            localStorage.setItem("page_view", "owner");
            console.log("owner button pressed, pageview: ", pageView);
          }}
        >
          Owner
        </Button>

        <NewTopicContainer reset={resetTopicID} userInfo={userInfo} />

        <Button type="secondary" onClick={() => authService.logout()}>
          Log Out
        </Button>
      </div>

      <TopicListContext.Provider value={{ topics }}>
        <TopicQuestionsContext.Provider value={{ topicQuestions }}>
          <QuestionsContext.Provider value={{ questions }}>
            <RequestsContext.Provider value={{ requestList }}>
              <ResponsesContext.Provider value={{ responseList }}>
                <ThreadsContext.Provider value={{ threads }}>
                  <div className="topics-container">
                    <div className="topics-list">
                      <h2 className="topics-list-title">Your Topics</h2>
                      <TopicsList topicID={getTopicID} />
                    </div>

                    <div className="main-topic-container">
                      {topicID === 0 ? (
                        <h2>Select a topic from the topics list.</h2>
                      ) : (
                        <MainTopic topicID={topicID} reset={resetTopicID} />
                      )}
                    </div>
                  </div>

                  <div className="requests-container">
                    <div className="requests-list">
                      <h2 className="requests-list-title">
                        Responses made from the topic {topics.name}
                      </h2>
                      <Requests />
                    </div>
                  </div>

                  <Responses />
                  <ThreadsList />
                </ThreadsContext.Provider>
              </ResponsesContext.Provider>
            </RequestsContext.Provider>
          </QuestionsContext.Provider>
        </TopicQuestionsContext.Provider>
      </TopicListContext.Provider>
    </div>
  );
}
export default RenderHomePage;
