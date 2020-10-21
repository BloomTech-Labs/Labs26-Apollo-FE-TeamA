import React from "react";
import RenderSurveyRequest from "./RenderSurveyRequest";

function SurveyRequestContainer(props) {
  return <RenderSurveyRequest user={props.user} topicID={props.topicID} />;
}
export default SurveyRequestContainer;
