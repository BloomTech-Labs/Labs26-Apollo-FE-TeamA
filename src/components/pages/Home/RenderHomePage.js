import React, { useState } from "react";
import { Link } from "react-router-dom";
import Requests from "../../home_components/Requests";
import { RequestsContext } from "../../../state/contexts/RequestsContext";
import TopicsList from "../../home_components/TopicsList";
import { Button } from "antd";
import NewTopicContainer from "../NewTopic/NewTopicContainer";
import { TopicListContext } from "../../../state/contexts/TopicListContext";
import axios from "axios";

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  const [topics, setTopics] = useState([]);
  const [requests, setRequests] = useState([]);
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

  axios
    .get("https://apollo-a-api.herokuapp.com/", {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    .then(res => {
      console.log(res);
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
          <NewTopicContainer userInfo={userInfo} />
        </TopicListContext.Provider>

        <RequestsContext.Provider value={{ requests }}>
          <Requests />
        </RequestsContext.Provider>

        <p>
          <Button onClick={() => authService.logout()}>Log Out</Button>
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
