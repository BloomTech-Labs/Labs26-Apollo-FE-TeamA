import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ResponsesContext } from "../../state/contexts/ResponsesContext";
import { getToken, getAllRequestQuestions } from "../../api/index";

const Responses = props => {
  const { responseList } = useContext(ResponsesContext);
  console.log("Responses component, ", responseList);

  // const getQuestionByID = id => {
  //   getAllRequestQuestions
  //     .then(res => {
  //       console.log("GET /question/:id", res);
  //       console.log("getQuestionByID", res.data);
  //       return res.data.question;
  //     })
  //     .catch(err => {
  //       console.log("getQuestionByID ", err);
  //     });
  // };

  return (
    <>
      <h2>Responses</h2>

      {responseList ? (
        responseList.map(item => (
          <div
            onClick={() => {
              props.getThreadList(item.id);
            }}
          >
            {/* <h4>{getQuestionByID(item.requestquestionid)}</h4> */}
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
