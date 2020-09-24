import React, { useContext, useState } from "react";
import { RequestsContext } from "../../state/contexts/RequestsContext";
import axios from "axios";
const Requests = props => {
  const { requestsList } = useContext(RequestsContext);

  const setRequestID = id => {
    console.log("Requests ID: ", id);
    props.requestsID(id);
  };

  return (
    <>
      {requestsList
        ? requestsList.map(item => (
            <div
              onClick={() => {
                setRequestID(item.id);
              }}
            >
              <h3>Created: {item.created_at}</h3>
            </div>
          ))
        : null}
    </>
  );
};

export default Requests;
