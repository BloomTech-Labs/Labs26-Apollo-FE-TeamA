import React, { useContext, useState } from "react";
import axios from "axios";
import { ResponsesContext } from "../../state/contexts/ResponsesContext";

const Responses = () => {
  const { responsesList } = useContext(ResponsesContext);
  return (
    <>
      {responsesList
        ? responsesList.map(item => (
            <div>
              <h4>{item.question_id}</h4>
              <p>{item.responses}</p>
            </div>
          ))
        : null}
    </>
  );
};
export default Responses;
