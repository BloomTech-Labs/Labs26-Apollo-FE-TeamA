import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { QuestionsContext } from "../../../../state/contexts/QuestionsContext";

const RequestQuestions = props => {
  const [presets, setPresets] = useState([]);
  const { questions } = useContext(QuestionsContext);
  const { Option } = Select;

  useEffect(() => {
    setPresets(questions.filter(q => q.type === "Request Questions"));
  }, []);

  // creating an Option for each question in state
  const loadPresets = () => {
    const count = presets.length;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Form.Item
          name={["presetRQ", `${presets[i].id}`]}
          initialValue={presets[i].question}
        >
          <Select placeholder={presets[i].question}>{loadQuestions()}</Select>
        </Form.Item>
      );
    }
    return children;
  };

  // creating an Option for each question in state
  const loadQuestions = () => {
    const count = presets.length;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Option key={i} value={presets[i].question}>
          {presets[i].question}
        </Option>
      );
    }
    return children;
  };

  return (
    <div>
      <Divider>Request Questions</Divider>

      {loadPresets()}

      <Form.List name="customRQ">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item
                    className="closed"
                    name={[index, "type"]}
                    initialValue={"Request Questions"}
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
                    <Input />
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
    </div>
  );
};

export default RequestQuestions;
