import React from "react";
import { Form, Input, Button, Divider } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const SurveyContextQuestions = () => {
  return (
    <div>
      <Divider>Context Questions</Divider>

      <Form.List name="cQ">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item
                    {...field}
                    className="closed"
                    name={[field.name, "id"]}
                    initialValue={null}
                  ></Form.Item>

                  <Form.Item
                    {...field}
                    className="closed"
                    name={[field.name, "default"]}
                    initialValue={false}
                  ></Form.Item>

                  <Form.Item
                    {...field}
                    className="closed"
                    name={[field.name, "style"]}
                    initialValue={"Text"}
                  ></Form.Item>

                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    name={[field.name, "question"]}
                    label={`Context Question ${index + 1}`}
                    rules={[{ required: true }]}
                    initialValue={""}
                  >
                    <Input.TextArea placeholder={""} />
                  </Form.Item>

                  {fields.length >= 1 ? (
                    <Button
                      className="remove-question-button"
                      onClick={() => {
                        remove(field.name);
                      }}
                    >
                      <p>
                        <DeleteOutlined /> Remove Question
                      </p>
                    </Button>
                  ) : null}
                </div>
              ))}
              <Form.Item>
                <Button
                  className="add-question-button"
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: "50%" }}
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

export default SurveyContextQuestions;
