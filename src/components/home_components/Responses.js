import React, { useContext, useState } from "react";
import axios from "axios";
import { ResponsesContext } from "../../state/contexts/ResponsesContext";

const Responses = props => {
  const { responsesList } = useContext(ResponsesContext);
  const [list, setList] = useState([]);

  axios
    .get("https://apollo-a-api.herokuapp.com/responses")
    .then(res => {
      console.log(res);
      setList(res.data);
    })
    .catch(err => console.log(err));
  return <></>;
};
