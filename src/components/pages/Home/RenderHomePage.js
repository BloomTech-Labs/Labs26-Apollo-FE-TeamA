import React, { useState } from "react";
import { Link } from "react-router-dom";

import TopicsList from "../../home_components/TopicsList";
import { Button } from "antd";
import NewTopicContainer from "../NewTopic/NewTopicContainer";
import { TopicListContext } from "../../../state/contexts/TopicListContext";
import axios from "axios";

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const [topics, setTopics] = useState([]);
  const idToken = JSON.parse(localStorage.getItem("okta-token-storage")).idToken
    .idToken;

  axios
    .get("https://apollo-a-api.herokuapp.com/topic", {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    .then(res => {
      console.log(res.data);
      setTopics(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <div className="home">
      <h1>Hi {userInfo.name}, Welcome to Apollo.</h1>

      <div>
        <TopicListContext.Provider value={{ topics }}>
          <TopicsList />
        </TopicListContext.Provider>
        <NewTopicContainer userInfo={userInfo} />

        <p>
          <Button onClick={() => authService.logout()}>Log Out</Button>
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
