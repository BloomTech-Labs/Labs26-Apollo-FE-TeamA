import React, { useContext, useState } from "react";
import { TopicListContext } from "../../state/contexts/TopicListContext";
import { StarFilled } from "@ant-design/icons";

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
            props.getSurveyList(item.id);
            props.resetReqAndResID();
          }}
        >
          {props.leader === item.leaderid ? (
            <h3>
              {item.topicname.slice(0, 1)} <StarFilled />
            </h3>
          ) : (
            <h3>{item.topicname.slice(0, 1)}</h3>
          )}
        </div>
      ))}
    </>
  );
};

export default TopicsList;
