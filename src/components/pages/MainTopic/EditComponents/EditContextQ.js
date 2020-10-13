import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Select, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PresetCQ from "./PresetCQ";
import { QuestionsContext } from "../../../../state/contexts/QuestionsContext";

const EditContextQ = props => {
  const [initQ, setInitQ] = useState([]);
  const { questions } = useContext(QuestionsContext);
  const { Option } = Select;

  // retrieve all context questions from the API /question
  useEffect(() => {
    setInitQ(questions.filter(q => q.type === "Context Questions"));
  }, []);

  // creating an Option for each question in state
  const loadQuestions = () => {
    const count = initQ.length;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Option key={i} value={[initQ[i].question, initQ[i].id]}>
          {initQ[i].question}
        </Option>
      );
    }
    return children;
  };

  return (
    <>
      {/* <PresetCQ contextQ={props.contextQ} /> */}

      <Divider>Context Question</Divider>

      <Form.List name="newCQ">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item
                    className="closed"
                    name={[index, "type"]}
                    initialValue={"Context Questions"}
                  ></Form.Item>

                  <Form.Item
                    className="closed"
                    name={[index, "style"]}
                    initialValue={"Text"}
                  ></Form.Item>

                  <Form.Item
                    name={[index, "question"]}
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select a context question.">
                      {loadQuestions()}
                    </Select>
                  </Form.Item>

                  {fields.length >= 1 ? (
                    <Button
                      type="danger"
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                      icon={<MinusCircleOutlined />}
                    >
                      Remove Question
                    </Button>
                  ) : null}
                </div>
              ))}

              <Divider />

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "60%" }}
                >
                  <PlusOutlined /> Add Question
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </>
  );
};

export default EditContextQ;
