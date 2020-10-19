import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ResponsesContext } from "../../state/contexts/ResponsesContext";
import { getToken } from "../../api/index";

const Responses = props => {
  const { responseList } = useContext(ResponsesContext);
  console.log("Responses component, ", responseList);

  return (
    <>
      <h2>Responses</h2>

      {responseList ? (
        responseList.map(item => {
          // console.log("Responses Component -> item", item)
          return (
            <div
              className="response-list"
              onClick={() => {
                props.getThreadList(item.id);
              }}
            >
              {/* <h4>Question: {item.requestquestionid.question}</h4>
            <p>{item.response}</p>
            <h5>Responded by: {item.respondedby}</h5> */}
            </div>
          );
        })
      ) : (
        <p>No responses for this Survey Request</p>
      )}
    </>
  );
};
export default Responses;
