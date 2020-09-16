import React, { useContext, useState } from "react";
import { TopicListContext } from "../../state/contexts/TopicListContext";
import axios from "axios";

const TopicsList = props => {
  const { topics } = useContext(TopicListContext);

  return (
    <>
      {topics.map(item => (
        <div>
          <h1>{item.Name}</h1>
          <h4>{item.updated_at}</h4>
        </div>
      ))}
    </>
  );
};
