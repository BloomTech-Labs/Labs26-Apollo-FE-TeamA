import React, { useContext } from "react";
import { TopicListContext } from "../../state/contexts/TopicListContext";

const TopicsList = props => {
  const { topics } = useContext(TopicListContext);

  return (
    <>
      {topics.map(item => (
        <div>
          <h1>
            <p>{item.topicName}</p>
            <p>{item.frequency}</p>
          </h1>
          <h4>{item.updated_at}</h4>
        </div>
      ))}
    </>
  );
};
