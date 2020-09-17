import React from "react";
import RenderNewTopic from "./RenderNewTopic";

function NewTopicContainer({ userInfo }) {
  return (
    <>
      <RenderNewTopic user={userInfo} />
    </>
  );
}

export default NewTopicContainer;
