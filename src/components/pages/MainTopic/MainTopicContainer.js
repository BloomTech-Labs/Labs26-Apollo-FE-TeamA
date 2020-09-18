import React from "react";
import RenderMainTopic from "./RenderMainTopic";

function MainTopicContainer(props) {
  return <RenderMainTopic topicID={props.topicID} />;
}

export default MainTopicContainer;
