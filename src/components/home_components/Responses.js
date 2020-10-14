import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ResponsesContext } from "../../state/contexts/ResponsesContext";
import { getToken, getAllRequestQuestions, getProfile } from "../../api/index";

const Responses = props => {
  const { responseList } = useContext(ResponsesContext);
  console.log("Responses component, ", responseList);

  // const getQuestionByID = id => {
  //   getAllRequestQuestions
  //     .then(res => {
  //       console.log("GET /question/:id", res);
  //       console.log("getQuestionByID", res.data);
  //       let reqQuestion = res.filter(ques => ques.id == id)
  //       return reqQuestion.question
  //     })
  //     .catch(err => {
  //       console.log("getQuestionByID ", err);
  //     });
  // };

  // const getUserName = id => {
  //   return getProfile(id)
  //   .then(res => {
  //     console.log("getUserName -> res", res);
  //     let name = res.firstname
  //     console.log("getUserName -> name", name);
  //     return res.firstname
  //   })
  //   .catch(err => {console.log("getUserName", err)})
  // }

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
            {/* <h5>{getUserName(item.respondedby)}</h5> */}
          </div>
        ))
      ) : (
        <p>No responses for this Survey Request</p>
      )}
    </>
  );
};
export default Responses;
