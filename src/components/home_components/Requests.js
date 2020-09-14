import React, { useContext, useState } from "react";
import { Requestscontext } from "../../state/contexts/RequestsContext";
import axios from "axios";

const Requests = props => {
  const { requestList } = useContext(Requestscontext);
  const [list, setlist] = useState([]);

  axios.get("https://apollo-a-api.herokuapp.com/responses");

  return (
    <>
      {list.map(item => (
        <div>
          <h1>{item.repondedby}</h1>
          <h3>{item.created_at}</h3>
        </div>
      ))}
    </>
  );
};
