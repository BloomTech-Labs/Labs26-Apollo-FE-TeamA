import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { getRQ } from "../../../../api/index";

const RequestQuestions = () => {
  const [presets, setPresets] = useState([]);
  const { Option } = Select;

  // fetch default request questions
  useEffect(() => {
    getRQ()
      .then(res => {
        console.log("RQ:", res);
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
      <Divider>Request Questions</Divider>
      {presets.map(q => {
        return (
          <div key={q.question}>
            <Form.Item
              className="closed"
              name={["rQ", q.question, "default"]}
              initialValue={"False"}
            ></Form.Item>

            <Form.Item
              className="closed"
              name={["rQ", q.question, "style"]}
              initialValue={q.style}
            ></Form.Item>

            <Form.Item
              name={["rQ", q.question, "question"]}
              rules={[{ required: true }]}
              initialValue={q.question}
            >
              <Input placeholder={q.question} />
            </Form.Item>

            <Button
              onClick={() => {
                removeQuestion(q.question);
              }}
            >
              <DeleteFilled />
            </Button>
          </div>
        );
      })}
      <Button onClick={addQuestion}>Add Question</Button>
    </div>
  );
};

export default RequestQuestions;
