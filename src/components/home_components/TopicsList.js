import React, { useContext, useState } from "react";
import { TopicListContext } from "../../state/contexts/TopicListContext";
import Moment from "react-moment";
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
            props.getSurveyList(item.id);
            props.getSurveyRequestForm(item.id);
            props.getSurveryContextForm(item.id);
            props.resetReqAndResID();
          }}
        >
          <h3>{item.topicname}</h3>
          <h4>
            <Moment format="MM/DD/YYYY">{item.updated_at}</Moment>
          </h4>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
