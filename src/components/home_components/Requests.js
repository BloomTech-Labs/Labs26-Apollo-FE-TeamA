import React, { useContext, useState } from "react";
import { RequestsContext } from "../../state/contexts/RequestsContext";
import axios from "axios";
import { getToken } from "../../api/index";

const Requests = props => {
  const { requestsList } = useContext(RequestsContext);

  const setRequestID = id => {
    props.requestsID(id);
  };

  const getUserProfile = id => {
    return axios
      .get(`https://apollo-a-api.herokuapp.com/${id}`, getToken())
      .then(res => {
        console.log("getUserProfile GET /profile/:id", res);
        return JSON.parse(res.data.firstname);
      })
      .catch(err => console.log("GET /profile/:id", err));
  };

  return (
    <>
      {requestsList ? (
        requestsList.map(item => (
          <div
            onClick={() => {
              setRequestID(item.id);
            }}
          >
            <h3>Created: {item.created_at}</h3>
            <h3>{getUserProfile(item.respondedby)}</h3>
          </div>
        ))
      ) : (
        <p>There is no Responses made for this topic</p>
      )}
    </>
  );
};

export default Requests;
