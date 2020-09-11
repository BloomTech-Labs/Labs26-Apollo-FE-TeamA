import React from "react";
import { Button } from "antd";
import NewTopicContainer from "../NewTopic/NewTopicContainer";

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <div className="home">
      <h1>Hi {userInfo.name}, Welcome to Apollo!</h1>
      {/* PASS IN USER ID TO LINK TOPIC LEADER TO USER */}
      <NewTopicContainer />

      <Button type="secondary" onClick={() => authService.logout()}>
        Log Out
      </Button>
    </div>
  );
}
export default RenderHomePage;
