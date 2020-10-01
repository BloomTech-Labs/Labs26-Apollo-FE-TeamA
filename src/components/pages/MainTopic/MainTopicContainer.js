import React from "react";
import RenderMainTopic from "./RenderMainTopic";

function MainTopicContainer(props) {
  return (
    <RenderMainTopic
      topicID={props.topicID}
      user={props.user}
      reset={props.reset}
    />
  );
}

export default MainTopicContainer;
