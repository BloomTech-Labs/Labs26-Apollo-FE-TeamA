import React from "react";
import RenderSelectRequest from "./RenderSelectRequest";

function MainSelectRequestContainer(props) {
  return <RenderSelectRequest getResponseList={props.getResponseList} />;
}

export default MainSelectRequestContainer;
