import React from "react";
import { Form, Input, Button, Divider } from "antd";

const SurveyContextResponses = ({ form }) => {
  let contextQuestions = form.getFieldsValue().cQ;

  return (
    <div>
      <Divider>Context Responses</Divider>

      {contextQuestions
        ? contextQuestions.map((q, index) => {
            return (
              <div>
                <Form.Item
                  className="closed"
                  name={["cR", q.question, "surveyrequestid"]}
                  initialValue={null}
                />

                <Form.Item
                  className="closed"
                  name={["cR", q.question, "contextquestionid"]}
                  initialValue={q.id}
                />

                <Form.Item
                  name={["cR", q.question, "response"]}
                  label={q.question}
                  initialValue={""}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default SurveyContextResponses;
