import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import { getCQ } from "../../../../api/index";

const ContextQuestions = () => {
  const [presets, setPresets] = useState([]);

  // fetch default context questions
  useEffect(() => {
    getCQ()
      .then(res => {
        console.log("CQ:", res);
        setPresets(res);
      })
      .catch(err => console.log(err));
  }, []);

  const addQuestion = () => {
    const newQuestion = {
      default: "False",
      style: "Text",
      question: ""
    };

    setPresets([...presets, newQuestion]);
  };

  const removeQuestion = question => {
    const newQuestions = presets.filter(preset => preset.question !== question);
    setPresets(newQuestions);
  };

  return (
    <div>
      <Divider>Context Questions</Divider>
      {presets.map((q, index) => {
        return (
          <div key={q.question}>
            <Form.Item
              className="closed"
              name={["cQ", q.question, "default"]}
              initialValue={"False"}
            ></Form.Item>

            <Form.Item
              className="closed"
              name={["cQ", q.question, "style"]}
              initialValue={q.style}
            ></Form.Item>

            <Form.Item
              name={["cQ", q.question, "question"]}
              label={`Context Question ${index + 1}`}
              rules={[{ required: true }]}
              initialValue={q.question}
            >
              <Input placeholder={q.question} />
            </Form.Item>

            <Button
              className="remove-question-button"
              onClick={() => {
                removeQuestion(q.question);
              }}
            >
              <p>Remove Question</p>
            </Button>
          </div>
        );
      })}
      <Button
        type="primary"
        className="add-question-button"
        onClick={addQuestion}
      >
        Add Question
      </Button>
    </div>
  );
};

export default ContextQuestions;
