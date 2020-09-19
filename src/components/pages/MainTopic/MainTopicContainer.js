import React from "react";
import RenderMainTopic from "./RenderMainTopic";

function MainTopicContainer(props) {
  return <RenderMainTopic topicID={props.topicID} reset={props.reset} />;
}

export default MainTopicContainer;
