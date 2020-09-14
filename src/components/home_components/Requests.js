import React, { useContext, useState } from "react";
import { Requestscontext } from "../../state/contexts/RequestsContext";

const Requests = props => {
  const { requestList } = useContext(Requestscontext);
  const [list, setlist] = useState([]);

  return <></>;
};
