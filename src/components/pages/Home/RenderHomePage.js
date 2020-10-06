import React, { useState, useEffect } from "react";
import { Button } from "antd";
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
import { RequestsContext } from "../../../state/contexts/RequestsContext";
import JoinTopic from "./JoinTopic";
import axios from "axios";

import {
  getAllRequestResponses,
  getAllResponses,
  getAllTopics,
  getAllThreads,
  getAllQuestions,
  getQuestions,
  getAllSurveyRequest,
  getToken
} from "../../../api";

function RenderHomePage(props) {
  // state handlers
  const { userInfo, authService } = props;
  const [topics, setTopics] = useState([]);
  const [topicID, setTopicID] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [topicQuestions, setTopicQuestions] = useState([]);
  const [responseList, setResponses] = useState([]);
  const [threads, setThreads] = useState([]);
  const [requestsList, setRequestsList] = useState([]);
  const [requestID, setRequestID] = useState(0);
  const [responseID, setResponseID] = useState(0);

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

    getAllThreads()
      .then(res => {
        setThreads(res);
      })
      .catch(err => console.log(err));
  }, [topicID]);

  // for selecting a specific topic
  const getTopicID = id => {
    setTopicID(id);
  };

  // used when deleting a topic
  const resetTopicID = () => {
    setTopicID(0);
    setRequestID(0);
  };
  const getSurveyRequests = id => {
    getAllSurveyRequest()
      .then(res => {
        let TopicRequest = res.filter(req => req.topicid == id);
        setRequestsList(TopicRequest);
        console.log("getAllSurveyRequests", res);
        console.log("getAllSurveyRequests -> requestsList", requestsList);
      })
      .catch(err => console.log("getAllResponses", err));
  };

  const resetReqAndResID = () => {
    setResponseID(0);
    setRequestID(0);
  };

  const getResponseList = id => {
    // setResponseID(id);
    getAllRequestResponses()
      .then(res => {
        setRequestID(id);
        let RequestResponses = res.filter(
          response => response.surveyrequestid == id
        );
        setResponses(RequestResponses);
        console.log("getResponseList", res);
        console.log("getResponseList -> RequestReponses", responseList);
      })
      .catch(err => console.log("getResponseList", err));
  };

  const getThreadList = id => {};

  const resetThreadList = () => {
    setResponseID(0);
    getThreadList(0);
  };

  return (
    <div className="home">
      <TopicListContext.Provider value={{ topics }}>
        <TopicQuestionsContext.Provider value={{ topicQuestions }}>
          <QuestionsContext.Provider value={{ questions }}>
            <RequestsContext.Provider value={{ requestsList }}>
              <ResponsesContext.Provider value={{ responseList }}>
                <ThreadsContext.Provider value={{ threads }}>
                  <div className="nav">
                    <h2 className="logo">Apollo</h2>

                    <Button type="primary" href="/">
                      Owner
                    </Button>
                    <Button type="secondary" href="/member">
                      Member
                    </Button>

                    <NewTopicContainer
                      reset={resetTopicID}
                      userInfo={userInfo}
                    />
                    <JoinTopic user={userInfo} topicID={topicID} />

                    <Button
                      type="secondary"
                      onClick={() => authService.logout()}
                    >
                      Log Out
                    </Button>
                  </div>

                  <div className="topics-container">
                    <div className="topics-list">
                      <h2 className="topics-list-title">Your Topics</h2>
                      <TopicsList
                        topicID={getTopicID}
                        getSurveyList={getSurveyRequests}
                        resetReqAndResID={resetReqAndResID}
                      />
                    </div>
                    <div className="main-topic-container">
                      {topicID === 0 ? (
                        <h2>Select a topic from the topics list.</h2>
                      ) : (
                        <MainTopic
                          topicID={topicID}
                          user={userInfo}
                          reset={resetTopicID}
                          getResponseList={getResponseList}
                          requestID={requestID}
                        />
                      )}
                    </div>
                  </div>
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
