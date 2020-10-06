import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import Requests from "../home_components/Requests";
import { RequestsContext } from "../../state/contexts/RequestsContext";
import { Button, message, Dropdown, Menu, Modal, Form } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { getAllResponses } from "../../api/index";

const RenderSelectRequest = ({ getResponseList }) => {
  const [selectRequestID, setRequestID] = useState(0);

  const resetRequestID = id => {
    setRequestID(0);
  };

  return (
    <div>
      <Requests getRsponseList={getResponseList} />
    </div>
  );
};
export default RenderSelectRequest;
