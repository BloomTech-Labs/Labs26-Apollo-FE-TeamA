import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { getQuestions } from "../../../../api/index";

const ContextResponses = ({ form, page }) => {
  const [inputs, setInputs] = useState([]);
  let contextQuestions = form.getFieldsValue().contextQuestions;
  let allQuestions = [];

  useEffect(() => {
    getQuestions()
      .then(res => {
        allQuestions = res.filter(q => q.type === "Context Questions");
        getFields();
      })
      .catch(err => console.log(err));
  }, [page]);

  // render input fields for responses to context questions
  const getFields = () => {
    const children = [];

    for (let i = 0; i < contextQuestions.length; i++) {
      children.push(
        <Form.Item
          key={i}
          name={["responses", `${contextQuestions[i].question.slice(-1)}`]}
          label={contextQuestions[i].question.slice(0, -1)}
          rules={[{ required: true, message: "Input something!" }]}
        >
          <Input placeholder="Answer your context question." />
        </Form.Item>
      );
    }

    console.log(children);
    setInputs(children);
  };

  return (
    <div>{inputs}</div>

    // <Form.List name="responses">
    //   {fields => {
    //     return (
    //       fields.map((field, index) => (
    //         <div key={field.key}>
    //           {inputs}
    //         </div>
    //       ))
    //     )
    //   }}
    // </Form.List>
  );
};

export default ContextResponses;
