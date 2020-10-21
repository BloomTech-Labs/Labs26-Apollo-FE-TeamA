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
import { SurveyRequestsContext } from "../../../state/contexts/SurveyRequestsContext";
import SurveyRequest from "../SurveyRequest/SurveyRequestContainer";
import { SurveyContextContext } from "../../../state/contexts/SurveyContextContext";
import JoinTopic from "./JoinTopic";
import axios from "axios";

import {
  getAllRequestResponses,
  getAllTopics,
  getAllThreads,
  getAllSurveyRequest,
  getAllTopicMembers,
  getAllTopicRequestQuestions,
  getAllTopicContextQuestions,
  getContextQuestionByID,
  getRequestQuestionByID,
  getProfile
} from "../../../api/index";

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
  const [surveyContextForm, setSurveyContextForm] = useState([]);
  const [surveyRequestForm, setSurveyRequestForm] = useState([]);
  const [joined, setJoined] = useState(false);
  const page = 1;

  useEffect(() => {
    getAllTopics()
      .then(t => {
        let leaderTopics = t.filter(topic => topic.leaderid === userInfo.sub);
        setTopics(leaderTopics);
      })
      .catch(err => console.log(err));
  }, [topicID, joined]);

  // for selecting a specific topic
  const getTopicID = id => {
    setTopicID(id);
    console.log(topics);
  };

  // used when deleting a topic
  const resetTopicID = () => {
    setTopicID(0);
    setRequestID(0);
    setResponseID(0);
  };

  const resetReqAndResID = () => {
    setResponseID(0);
    setRequestID(0);
  };

  const refreshTopics = () => {
    setJoined(true);
  };

  const getSurveyRequests = id => {
    getAllSurveyRequest()
      .then(res => {
        let TopicRequest = res.filter(req => req.topicid === id);
        setRequestsList(TopicRequest);
      })
      .catch(err => console.log("getAllResponses", err));
  };

  useEffect(() => {
    getAllRequestResponses()
      .then(res => {
        //RequestResponses takes
        let RequestResponses = res.filter(
          response => response.surveyrequestid === requestID
        );
        // console.log("getAllRequestResponses -> requestID", requestID);
        // console.log("getResponseList -> res", res);
        // console.log("getResponseList -> RequestResponses", RequestResponses);
        let temp = [];
        axios
          .all(
            RequestResponses.map(item => {
              getRequestQuestionByID(item.requestquestionid)
                .then(res => {
                  item.requestquestionid = res;

                  getProfile(item.respondedby)
                    .then(res => {
                      item.respondedby = res;
                      temp.push(item);
                      console.log(
                        "axios.all(RequestResponse) -> getRequestQuestion -> getProfile -> temp: ",
                        temp
                      );
                    })
                    .catch(err =>
                      console.log(
                        "axios.all() -> getProfile -> responseList",
                        err.response
                      )
                    );
                })
                .catch(err =>
                  console.log(
                    "axios.all() -> getRequestQuestionByID -> responseList",
                    err.response
                  )
                );
            })
          )
          .then(res => {
            console.log("axios.all(RequestResponses) -> res", res);
            setResponses(temp);
          })
          .catch(err => console.log("axios.all(RequestResponses)", err));

        console.log("getResponseList -> RequestReponses", responseList);
      })
      .catch(err => console.log("getResponseList", err));
  }, []);

  const getThreadList = id => {
    getAllThreads()
      .then(res => {
        setResponseID(id);
        let ResponseThread = res.filter(thrd => thrd.responseid === id);
        setThreads(ResponseThread);

        // console.log("getThreadList -> ResponseID", responseID);
        // console.log("getThreadList", res);
        // console.log("getThreadList -> threads", threads);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="home">
      <TopicListContext.Provider value={{ topics }}>
        <TopicQuestionsContext.Provider value={{ topicQuestions }}>
          <QuestionsContext.Provider value={{ questions }}>
            <RequestsContext.Provider value={{ requestsList }}>
              <ResponsesContext.Provider value={{ responseList }}>
                <ThreadsContext.Provider value={{ threads }}>
                  <SurveyRequestsContext.Provider value={{ surveyRequestForm }}>
                    <SurveyContextContext.Provider
                      value={{ surveyContextForm }}
                    >
                      <div className="topics-container">
                        <div className="topics-list">
                          <TopicsList
                            leader={userInfo.sub}
                            topicID={getTopicID}
                            getSurveyList={getSurveyRequests}
                            resetReqAndResID={resetReqAndResID}
                          />
                        </div>

                        <div className="topics-list-bg"></div>

                        <div className="topic-content-container">
                          <div className="nav">
                            <h2 className="logo">Apollo</h2>

                            <Button type="primary" href="/">
                              Owner
                            </Button>
                            <Button type="secondary" href="/member">
                              Member
                            </Button>

                            <div className="nav-buttons">
                              <NewTopicContainer
                                reset={resetTopicID}
                                userInfo={userInfo}
                              />
                              <JoinTopic
                                user={userInfo}
                                topicID={topicID}
                                joined={refreshTopics}
                              />
                            </div>

                            <Button
                              type="secondary"
                              onClick={() => authService.logout()}
                            >
                              Log Out
                            </Button>
                          </div>

                          <div className="main-topic-container">
                            <div className="main-topic">
                              {topicID === 0 ? (
                                <div>
                                  <h2>Welcome, {userInfo.name}.</h2>
                                  <h2 style={{ opacity: "60%" }}>
                                    Select a topic from the topics list.
                                  </h2>
                                </div>
                              ) : (
                                <MainTopic
                                  topicID={topicID}
                                  user={userInfo}
                                  reset={resetTopicID}
                                  requestID={setRequestID}
                                  getThreadList={getThreadList}
                                />
                              )}
                            </div>

                            <div className="response-list">
                              {requestID != 0 ? (
                                <Responses getThreadList={getThreadList} />
                              ) : null}

                              {responseID != 0 ? <ThreadsList /> : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </SurveyContextContext.Provider>
                  </SurveyRequestsContext.Provider>
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
