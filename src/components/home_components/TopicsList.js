import React, { useContext, useState } from "react";
import { TopicListContext } from "../../state/contexts/TopicListContext";
import axios from "axios";

const TopicsList = props => {
  // const { topics } = useContext(TopicListContext);

  const [topiclist, settopiclist] = useState([]);

  axios
    .get("https://apollo-a-api.herokuapp.com/topic")
    .then(res => {
      console.log(res);
      settopiclist(res.data);
    })
    .catch(err => console.log(err.response));

  return (
    <>
      {topiclist.map(item => (
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

export default TopicsList;
