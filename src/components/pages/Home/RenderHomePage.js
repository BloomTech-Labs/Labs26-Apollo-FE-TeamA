import React from "react";
import TopicsList from "../../home_components/TopicsList";
import { Button } from "antd";
import NewTopicContainer from "../NewTopic/NewTopicContainer";

const RenderHomePage = ({ userInfo, authService }) => {
  return (
    <div className="home">
      <h1>Hi {userInfo.name}, Welcome to Apollo.</h1>

      <div>
        <NewTopicContainer userInfo={userInfo} />

        <Button type="secondary" onClick={() => authService.logout()}>
          Log Out
        </Button>
      </div>
    </div>
  );
};
export default RenderHomePage;
