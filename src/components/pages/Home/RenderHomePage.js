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
  const [responseList, setResponses] = useState([]);
  const [threads, setThreads] = useState([]);
  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    getAllTopics()
      .then(res => {
        let userTopics = res.filter(topic => topic.leaderid == userInfo.sub);
        setTopics(userTopics);
      })
      .catch(err => console.log(err));
  }, []);
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

    getAllThreads()
      .then(res => {
        setThreads(res);
      })
      .catch(err => console.log(err));
  }, [topicID]);
  const getSurveyRequests = id => {
    getAllResponses()
      .then(res => {
        let TopicRequest = res.filter(req => req.topicid === id);
        setRequestsList(TopicRequest);
        console.log("getAllResponses", res);
        console.log("getAllResponses -> requestsList", requestsList);
      })
      .catch(err => console.log("getAllResponses", err));
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
                        />
                      )}
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
