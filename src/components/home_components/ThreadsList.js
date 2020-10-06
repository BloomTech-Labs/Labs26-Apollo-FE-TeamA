import React, { useContext, useState } from "react";
import { ThreadsContext } from "../../state/contexts/ThreadsContext";
import axios from "axios";
import { getToken } from "../../api/index";

const ThreadsList = props => {
  const { threads } = useContext(ThreadsContext);

  const getUserName = id => {
    axios
      .get(`https://apollo-a-api.herokuapp.com/profile/${id}`, getToken())
      .then(res => {
        console.log("GET /profile/:id", res);
        return res.data.firstname;
      })
      .catch(err => console.log("getUserName", err));
  };

  return (
    <>
      {threads ? (
        threads.map(item => (
          <div>
            <h4>{getUserName(item.repliedby)}</h4>
            <p>{item.replies}</p>
          </div>
        ))
      ) : (
        <p>There is no comments made for this Response</p>
      )}
    </>
  );
};
export default ThreadsList;
