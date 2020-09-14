import React, { useContext, useState } from "react";
import { ThreadsContext } from "../../state/contexts/ThreadsContext";
import axios from "axios";

const ThreadsList = props => {
  const { threads } = useContext(ThreadsContext);
  const [list, setList] = useState([]);

  axios
    .get("https://apollo-a-api.herokuapp.com/thread")
    .then(res => {
      console.log(res);
      setList(res.data);
    })
    .catch(err => {
      console.log(err.response);
    });

  return (
    <>
      {list.map(item => (
        <div>
          <p>{item.replies}</p>
        </div>
      ))}
    </>
  );
};
export default ThreadsContext;
