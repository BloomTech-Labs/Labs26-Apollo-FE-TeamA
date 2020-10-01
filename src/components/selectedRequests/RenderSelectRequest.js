import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import Requests from "../home_components/Requests";
import { RequestsContext } from "../../state/contexts/RequestsContext";
import { Button, message, Dropdown, Menu, Modal, Form } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { getAllResponses } from "../../api/index";

const RenderSelectRequest = props => {
  const [selectRequestID, setRequestID] = useState(0);

  const getRequestID = id => {
    setRequestID(id);
  };
  const resetRequestID = id => {
    setRequestID(0);
  };

  return (
    <div>
      <Requests requestsID={getRequestID} />
    </div>
  );
};
export default RenderSelectRequest;
