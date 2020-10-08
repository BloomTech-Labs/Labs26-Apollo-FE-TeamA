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

  const displayDate = date => {
    let res = date.slice(0, 10);
    return res;
  };
  return (
    <>
      {threads ? (
        threads.map(item => (
          <div>
            <p>{item.reply}</p>
            <h5>{getUserName(item.repliedby)}</h5>
            <h6>{displayDate(item.updated_at)}</h6>
          </div>
        ))
      ) : (
        <p>There is no comments made for this Response</p>
      )}
    </>
  );
};
export default ThreadsList;
