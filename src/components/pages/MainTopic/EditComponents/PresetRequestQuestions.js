import React, { useState, useEffect } from "react";
import { Form, Select, Divider } from "antd";
import { getQuestions } from "../../../../api/index";

const PresetRequestQuestions = props => {
  const [inputs, setInputs] = useState([]);
  const { Option } = Select;

  // retrieve all context questions from the API /question
  useEffect(() => {
    getQuestions()
      .then(res => {
        getFields(res);
      })
      .catch(err => console.log(err));
  }, [props.requestQ]);

  // loading questions from API /question into state
  const handleContextQuestions = cq => {
    let options = [];
    for (let i = 0; i < cq.length; i++) {
      if (
        // cq[i].contextid === props.value.contextid &&
        cq[i].type === "Request Questions"
      ) {
        options.push(cq[i]);
      }
    }
    return options;
  };

  // creating an Option for each question in state
  const loadQuestions = async res => {
    const initialQuestions = await handleContextQuestions(res);
    const count = initialQuestions.length;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Option
          key={i}
          value={[initialQuestions[i].question, initialQuestions[i].id]}
        >
          {initialQuestions[i].question}
        </Option>
      );
    }
    return children;
  };

  const getFields = async res => {
    const presets = await loadQuestions(res);
    const children = [];
    for (let i = 0; i < props.requestQ.length; i++) {
      children.push(
        <div>
          <Divider>Request Question</Divider>

          <Form.Item
            name={["oldRQ", `${props.requestQ[i][0].id}`]}
            rules={[{ required: true }]}
            initialValue={[
              props.requestQ[i][0].question,
              props.requestQ[i][0].id
            ]}
          >
            <Select placeholder={props.requestQ[i][0].question}>
              {presets}
            </Select>
          </Form.Item>
        </div>
      );
    }
    setInputs(children);
  };

  return (
    <>
      <div>{inputs}</div>
    </>
  );
};

export default PresetRequestQuestions;
