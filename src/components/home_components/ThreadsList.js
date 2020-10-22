import React, { useContext, useState } from "react";
import { ThreadsContext } from "../../state/contexts/ThreadsContext";
import axios from "axios";
import { getToken } from "../../api/index";
import { Comment, Tooltip, List } from "antd";

const ThreadsList = props => {
  const { threads } = useContext(ThreadsContext);

  let userName = "";
  let userAvatar = "Null";

  const getUserName = id => {
    axios
      .get(`https://apollo-a-api.herokuapp.com/profile/${id}`, getToken())
      .then(res => {
        console.log("GET /profile/:id", res);
        userName = res.data.firstname;
        userAvatar = res.data.avatar;

        console.log("GET /profile/:id -> userName: ", userName);
        console.log("GET /profile/:id -> userAvatar: ", userAvatar);
      })
      .catch(err => console.log("getUserName", err));
  };

  const displayDate = date => {
    let res = date.slice(0, 10);
    return res;
  };
  return (
    <div className="Thread-List">
      <h4>Question: {props.responseQuestion}</h4>
      <h5>Response: {props.responseText}</h5>
      <h5>Responder: {props.responseUser}</h5>

      <p>Commnet Section</p>
      {threads ? (
        threads.map(item => (
          <>
            <Comment
              author={userName}
              content={item.reply}
              datetime={displayDate(item.updated_at)}
            />
          </>
        ))
      ) : (
        <p>There is no comments made for this Response</p>
      )}
    </div>
  );
};
export default ThreadsList;
