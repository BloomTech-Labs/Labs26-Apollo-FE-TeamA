import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";

import TopicsList from "../../home_components/TopicsList";
import NewTopicContainer from "../NewTopic/NewTopicContainer";
import MainTopic from "../MainTopic/MainTopicContainer";
import { TopicListContext } from "../../../state/contexts/TopicListContext";

function RenderHomePage(props) {
  // state handlers
  const { userInfo, authService } = props;
  const [topics, setTopics] = useState([]);
  const [topicID, setTopicID] = useState(0);
  const userTopics = [];

  // axios auth
  const idToken = JSON.parse(localStorage.getItem("okta-token-storage")).idToken
    .idToken;
  const auth = {
    headers: { Authorization: `Bearer ${idToken}` }
  };

  useEffect(() => {
    axios
      .get("https://apollo-a-api.herokuapp.com/topic", auth)
      .then(res => {
        console.log(res.data);
        getUserTopics(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getUserTopics = topics => {
    topics.forEach(t => {
      if (t.leaderid === userInfo.sub) {
        userTopics.push(t);
      }
    });

    setTopics(userTopics);
  };

  const getTopicID = id => {
    setTopicID(id);
  };

  return (
    <div className="home">
      <div className="nav">
        <h2 className="logo">Apollo</h2>

        <Button type="secondary" onClick={() => authService.logout()}>
          Log Out
        </Button>
      </div>

      <h1>Hi {userInfo.name}, Welcome to Apollo.</h1>

      <NewTopicContainer userInfo={userInfo} />

      <TopicListContext.Provider value={{ topics }}>
        <div className="topics-container">
          <div className="topics-list">
            <TopicsList topicID={getTopicID} />
          </div>

          <div className="main-topic">
            {topicID === 0 ? (
              <h1>Select a topic from the topics list.</h1>
            ) : (
              <MainTopic topicID={topicID} />
            )}
          </div>
        </div>
      </TopicListContext.Provider>
    </div>
  );
}
export default RenderHomePage;
