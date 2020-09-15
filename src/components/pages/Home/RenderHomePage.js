import React from "react";
import TopicsList from "../../home_components/TopicsList";
import { Button } from "antd";
import NewTopicContainer from "../NewTopic/NewTopicContainer";

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <div className="home">
      <h1>Hi {userInfo.name} Welcome to Labs Basic SPA</h1>
      <div>
        {/* <TopicsList /> */}
        <NewTopicContainer />
        <p>
          <Button
            handleClick={() => authService.logout()}
            buttonText="Logout"
          />
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
