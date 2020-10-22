import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ResponsesContext } from "../../state/contexts/ResponsesContext";
import {
  getToken,
  getAllRequestResponses,
  getRequestQuestionByID,
  getProfile
} from "../../api/index";

import { Popover, Button } from "antd";

const singleResponse = ({ item, getThreadList }) => {
  console.log("singleResponse -> item: ", item);

  let userName = "";
  let newQuestion = "";

  // useEffect (() => {
  //     if(item){
  //         getProfile(item.respondedby)
  //         .then(res => {
  //           console.log("getProfileName -> res: ", res);
  //           userName = res.firstname
  //         })
  //         .catch(err => {
  //           console.log("getProfileName: ", err)
  //           userName = "No User Found"
  //         })

  //         getRequestQuestionByID(item.requestquestionid)
  //         .then(res =>{
  //             console.log("getQuestion -> res: ", res);
  //             newQuestion = res.question
  //         })
  //         .catch(err => {
  //             console.log("getQuestion: ", err)
  //             newQuestion = "No Question Found"
  //         })

  //     }
  // }, [])

  const getProfileName = <h4>{userName}</h4>;

  const getQuestion = <h6>Question: {newQuestion}</h6>;

  return (
    // <Popover arrowPointAtCenter  title={getProfileName} content={getQuestion}>
    <Button
      className="single-response"
      onClick={() => {
        getThreadList(item.id);
      }}
    >
      <h3>{item.response}</h3>
    </Button>
    // </Popover>
  );
};
export default singleResponse;
