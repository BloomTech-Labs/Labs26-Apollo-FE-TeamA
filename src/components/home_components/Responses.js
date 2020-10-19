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
          console.log(
            "Responses Component -> item.requestquestionid.question: ",
            item.requestquestionid.question
          );
          console.log(
            "Responses Component -> item.respondedby.firstname",
            item.respondedby.firstname
          );
          return (
            <div
              onClick={() => {
                props.getThreadList(item.id);
              }}
            >
              <p>Question: {item.requestquestionid.question}</p>
              <p>{item.response}</p>
              <p>Responded by: {item.respondedby.firstname}</p>
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
