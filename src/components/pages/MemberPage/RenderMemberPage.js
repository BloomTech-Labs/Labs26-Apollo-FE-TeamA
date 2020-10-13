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

import {
  getAllRequestResponses,
  getAllTopicMembers,
  getTopic
} from "../../../api";

function RenderMemberPage(props) {
  // state handlers
  const { userInfo, authService } = props;
  const [memberTopics, setMemberTopics] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicID, setTopicID] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [topicQuestions, setTopicQuestions] = useState([]);
  const [responseList, setResponses] = useState([]);
  const [threads, setThreads] = useState([]);
  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    getAllTopicMembers()
      .then(res => {
        let userTopicsID = res.filter(
          member => member.memberid == userInfo.sub
        );
        setMemberTopics(userTopicsID);

        console.log("userTopicsID: ", userTopicsID);
        console.log("getAllTopicMembers -> memberTopics", memberTopics);
      })
      .catch(err => console.log("getAllTopicMembers", err));

    memberTopics.map(item => {
      getTopic(item.topicid)
        .then(res => {
          console.log("getTopic", res);

          setTopics(...TopicsList, res);
        })
        .catch(err => console.log("getTopic", err));
    });
  }, []);
  // for selecting a specific topic
  const getTopicID = id => {
    setTopicID(id);
  };

  // used when deleting a topic
  const resetTopicID = () => {
    setTopicID(0);
  };

  const getSurveyRequests = id => {
    getAllRequestResponses()
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
      <div className="nav">
        <h2 className="logo">Apollo</h2>
        <Button type="text" href="/">
          Owner
        </Button>

        <Button type="primary">Member</Button>

        <Button type="secondary" onClick={() => authService.logout()}>
          Log Out
        </Button>
      </div>

      <h1>Hi {userInfo.name}, Welcome to Apollo.</h1>

      {/* <NewTopicContainer userInfo={userInfo} /> */}

      <TopicListContext.Provider value={{ topics }}>
        <TopicQuestionsContext.Provider value={{ topicQuestions }}>
          <QuestionsContext.Provider value={{ questions }}>
            <RequestsContext.Provider value={{ requestsList }}>
              <ResponsesContext.Provider value={{ responseList }}>
                <ThreadsContext.Provider value={{ threads }}>
                  <div className="topics-container">
                    <div className="topics-list">
                      <h2 className="topics-list-title">My Topics</h2>
                      <TopicsList
                        topicID={getTopicID}
                        getSurveyList={getSurveyRequests}
                      />
                    </div>
                    <div className="main-topic-container">
                      {topicID === 0 ? (
                        <h2>Select a topic from the topics list.</h2>
                      ) : (
                        <MainTopic topicID={topicID} reset={resetTopicID} />
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
export default RenderMemberPage;
