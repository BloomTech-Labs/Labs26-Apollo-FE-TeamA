import React, { useContext, useState } from "react";
import { TopicListContext } from "../../state/contexts/TopicListContext";
import axios from "axios";

const TopicsList = props => {
  const { topics } = useContext(TopicListContext);

  const setTopicID = id => {
    console.log("ID:", id);
    props.topicID(id);
  };

  return (
    <>
      {topics.map(item => (
        <div
          className="topic-list-item"
          onClick={() => {
            setTopicID(item.id);
          }}
        >
          <h3>{item.topicname}</h3>
          <h6>Updated: {item.updated_at}</h6>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
