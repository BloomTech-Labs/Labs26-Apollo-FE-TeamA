import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Select } from "antd";
import { SurveyRequestsContext } from "../../../state/contexts/SurveyRequestsContext";
import { SurveyContextContext } from "../../../state/contexts/SurveyContextContext";
import axios from "axios";
import { getToken } from "../../../api/index";

const RenderSurveyRequest = ({ page }) => {
  const { surveyRequestForm } = useContext(SurveyRequestsContext);
  const { surveyContextForm } = useContext(SurveyContextContext);

  if (page === 1) {
    return (
      <Form>
        {/* {surveyContextForm ? 
            (surveyContextForm.map(item => (
              <Form.item
              label={item.contextquestionid}
              >
                  <input/>
              </Form.item>
            )))
              :
              (null)
            } */}

        {/* {surveyRequestForm ? 
            (surveyRequestForm.map(item=> (
                <Form.item>
                    <input/>
                </Form.item>
            ))):
            (null)} */}
      </Form>
    );
  }
  if (page === 2) {
    return (
      <Form>
        {/* {surveyContextForm ? 
        (surveyContextForm.map(item => (
          <Form.item
          label={getContextQuestion(item.contextquestionid)}
          >
              <input/>
          </Form.item>
        )))
          :
          (null)
        }

        {surveyRequestForm ? 
        (surveyRequestForm.map(item=> (
            <Form.item
            label={getRequestQuestion(item.requestquestionid)}>
                <input/>
            </Form.item>
        ))):
        (null)} */}
      </Form>
    );
  }
};

export default RenderSurveyRequest;
