import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import NewTopicForm from "../NewTopic/NewTopicContainer";

function RenderHomePage(props) {
  const { userInfo, authService } = props;
  return (
    <div className="home">
      {/* PASS IN USER ID TO LINK TOPIC LEADER TO USER */}
      <NewTopicForm />

      <h1>Hi {userInfo.name}, Welcome to Apollo!</h1>
      <div>
        <p>
          This is an example of a common example of how we'd like for you to
          approach components.
        </p>
        <p>
          <Link to="/profile-list">Profiles Example</Link>
        </p>
        <p>
          <Link to="/example-list">Example List of Items</Link>
        </p>
        <p>
          <Link to="/datavis">Data Visualizations Example</Link>
        </p>
        <p>
          <Button type="secondary" onClick={() => authService.logout()}>
            Log Out
          </Button>
        </p>
      </div>
    </div>
  );
}
export default RenderHomePage;
