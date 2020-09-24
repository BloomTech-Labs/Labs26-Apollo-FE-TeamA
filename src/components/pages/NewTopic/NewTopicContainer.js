import React from "react";
import RenderNewTopic from "./RenderNewTopic";

function NewTopicContainer({ userInfo, reset }) {
  return (
    <>
      <RenderNewTopic reset={reset} user={userInfo} />
    </>
  );
}

export default NewTopicContainer;
