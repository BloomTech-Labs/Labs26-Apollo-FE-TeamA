import React, { useContext, useState } from "react";
import { TopicListContext } from "../../state/contexts/TopicListContext";
import axios from "axios";

const TopicsList = () => {
  const { topics } = useContext(TopicListContext);

  return (
    <>
      {topics.map(item => (
        <div>
          <h3>{item.topicname}</h3>
          <h6>Updated: {item.updated_at}</h6>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
