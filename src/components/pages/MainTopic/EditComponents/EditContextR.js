import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";

const EditContextR = ({ form, page, contextR }) => {
  const [inputs, setInputs] = useState([]);
  let oldQuestions = form.getFieldsValue().oldCQ; // object with questions as array
  let newQuestions = form.getFieldsValue().newCQ; // array of questions as objects
  let oldQ, newQ, contextQuestions;

  const getQuestions = async () => {
    if (oldQuestions) {
      oldQ = Object.values(oldQuestions);

      if (newQuestions) {
        newQ = newQuestions.map(q => q.question);
        contextQuestions = oldQ.concat(newQ);
        return contextQuestions;
      } else {
        contextQuestions = oldQ;
        return contextQuestions;
      }
    }
  };

  useEffect(() => {
    getQuestions()
      .then(res => {
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
          name={["responses", `${contextQuestions[i].slice(-1)}`]}
          label={contextQuestions[i].slice(0, -1)}
          rules={[{ required: true, message: "Input something!" }]}
          initialValue={contextR[i] ? contextR[i].response : ""}
        >
          <Input placeholder={contextR[i] ? contextR[i].response : ""} />
        </Form.Item>
      );
    }
    setInputs(children);
  };

  return <div>{inputs}</div>;
};

export default EditContextR;
