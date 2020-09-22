import React, { useState, useEffect } from "react";
import { Form, Button, Select, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getQuestions } from "../../../../api/index";

// ISSUE FOR ADDING CUSTOM QUESTIONS------------------------
// issue may arise when attempting to add custom questions
// because the question db table does not account for
// context types, so all questions ever created will show up

const ContextQuestions = props => {
  const [initialQuestions, setInitialQuestions] = useState([]);
  const { Option } = Select;

  // retrieve all context questions from the API /question
  useEffect(() => {
    getQuestions()
      .then(res => {
        handleContextQuestions(res);
      })
      .catch(err => console.log(err));
  }, []);

  // loading questions from API /question into state
  const handleContextQuestions = cq => {
    let options = [];

    for (let i = 0; i < cq.length; i++) {
      if (
        // cq[i].contextid === props.value.contextid &&
        cq[i].type === "Context Questions"
      ) {
        options.push(cq[i]);
      }
    }

    setInitialQuestions(options);
  };

  // creating an Option for each question in state
  const loadQuestions = () => {
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

  return (
    <Form.List name="contextQuestions">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider>Context Question {index + 1}</Divider>
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

                {fields.length > 1 ? (
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
  );
};

export default ContextQuestions;
