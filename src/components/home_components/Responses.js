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
import singleResponse from "./singleResponse";

const Responses = props => {
  const { responseList } = useContext(ResponsesContext);
  console.log("Responses component, ", responseList);

  // useEffect(() => {
  //   const temp = [];
  //   getAllRequestResponses()
  //     .then(res => {
  //       //RequestResponses takes
  //       let RequestResponses = res.filter(
  //         response => response.surveyrequestid === props.requestID
  //       );
  //       // console.log("getAllRequestResponses -> requestID", requestID);
  //       console.log("getResponseList -> res", res);
  //       // console.log("getResponseList -> RequestResponses", RequestResponses);
  //       props.responseList(RequestResponses);
  //       console.log("getResponseList -> RequestReponses", props.responseListView);
  //     })
  //     .catch(err => console.log("getResponseList", err));

  //   }, []);

  return (
    <>
      <h2>Responses</h2>

      {responseList ? (
        responseList.map(item => {
          return (
            <div>
              <Button
                className="single-response"
                onClick={() => {
                  props.getThreadList(item.id);
                }}
              >
                <h3>{item.response}</h3>
              </Button>
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
// axios
//   .all(
//     RequestResponses.map(item => {
//       getRequestQuestionByID(item.requestquestionid)
//         .then(res => {
//           item.requestquestionid = res;

//           getProfile(item.respondedby)
//             .then(res => {
//               item.respondedby = res;
//               temp.push(item);
//               console.log(
//                 "axios.all(RequestResponse) -> getRequestQuestion -> getProfile -> temp: ",
//                 temp
//               );
//             })
//             .catch(err =>
//               console.log(
//                 "axios.all() -> getProfile -> responseList",
//                 err.response
//               )
//             );
//         })
//         .catch(err =>
//           console.log(
//             "axios.all() -> getRequestQuestionByID -> responseList",
//             err.response
//           )
//         );
//     })
//   )
//   .then(res => {
//     console.log("axios.all(RequestResponses) -> res", res);
//   })
//   .catch(err => console.log("axios.all(RequestResponses)", err));

// console.log(
//   "Responses Component -> item.requestquestionid",
//   item.requestquestionid
//   );
//   console.log(
//     "Responses Component -> item.respondedby",
//     item.respondedby
//     );
//     return (
//     <Popover arrowPointAtCenter  title={getProfileName(item.respondedby)} content={getQuestion(item.requestquestionid)}>
//       <div
//       className="single-response"
//       onClick={() => {
//         props.getThreadList(item.id);
//       }}
//       >
//     <p>{item.response}</p>
//   </div>
//   </Popover>
// );

// const getProfileName = user => {
//   return (getProfile(user)
//   .then(res => {
//     console.log("getProfileName -> res: ", res);
//     return res.firstname
//   })
//   .catch(err => {
//     console.log("getProfileName: ", err)
//     return "No User Found"
//   }))
// }

// const getQuestion = qID => {
//   return(
//     getRequestQuestionByID(qID)
//     .then(res =>{
//       console.log("getQuestion -> res: ", res);
//       return res.question
//     })
//     .catch(err => {
//       console.log("getQuestion: ", err)
//       return "No Question Found"
//     })
//   )
// }
