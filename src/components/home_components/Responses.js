import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ResponsesContext } from "../../state/contexts/ResponsesContext";
import { getToken } from "../../api/index";

const Responses = props => {
  const { responsesList } = useContext(ResponsesContext);

  useEffect(() => {
    console.log("Responses component, ", responsesList);
  });

  const getQuestionByID = id => {
    axios
      .get(`https://apollo-a-api.herokuapp.com/contextquestion/${id}`, getToken)
      .then(res => {
        console.log("GET /question/:id", res);
        console.log("getQuestionByID", res.data);
        return res.data.question;
      })
      .catch(err => {
        console.log("getQuestionByID ", err);
      });
  };

  return (
    <>
      <h2>Responses</h2>

      {responsesList ? (
        responsesList.map(item => (
          <div
            onClick={() => {
              props.getThreadList(item.id);
            }}
          >
            <h4>{getQuestionByID(item.contextquestionid)}</h4>
            <p>{item.response}</p>
          </div>
        ))
      ) : (
        <p>No responses for this Survey Request</p>
      )}
    </>
  );
};
export default Responses;
