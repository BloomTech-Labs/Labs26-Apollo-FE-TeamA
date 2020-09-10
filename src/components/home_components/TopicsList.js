import React, { useContext } from "react";
import { TopicListContext } from "../../state/contexts/TopicListContext";

const TopicsList = props => {
  const { topics } = useContext(TopicListContext);

  return (
    <>
      {topics.map(item => (
        <div>
          <h1>
            {item.topicName} {item.frequency}
          </h1>
          <h4>{item.updated_at}</h4>
        </div>
      ))}
    </>
  );
};
