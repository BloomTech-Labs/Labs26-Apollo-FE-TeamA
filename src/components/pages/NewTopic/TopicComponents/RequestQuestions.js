import React, { useState, useEffect } from "react";
import { Form, Button, Select, Divider, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getQuestions } from "../../../../api/index";

const RequestQuestions = props => {
  const [initialQuestions, setInitialQuestions] = useState([]);
  const allResponseQuestions = [];
  const { Option } = Select;

  // retrieve all questions from the API /question
  useEffect(() => {
    getQuestions()
      .then(res => {
        handleRequestQuestions(res.slice(0, 6));
      })
      .catch(err => console.log(err));
  }, []);

  // filter questions to display on questions of type: "request"
  const handleRequestQuestions = cq => {
    let options = [];

    for (let i = 0; i < cq.length; i++) {
      if (
        // cq[i].contextid === props.value.contextid &&
        cq[i].type === "Request Questions"
      ) {
        options.push(cq[i]);
      }
    }

    setInitialQuestions(options);
  };

  // load questions into Options for Select
  const loadQuestions = () => {
    const count = initialQuestions.length;
    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Option value={initialQuestions[i].id}>
          {initialQuestions[i].question}
        </Option>
      );
    }
    return children;
  };

  return (
    <Form.List name="requestQuestions">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider>Request Question {index + 1}</Divider>

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
                  <Select placeholder="Select a request question.">
                    {loadQuestions()}
                  </Select>
                </Form.Item>

                {/* <Form.Item
                  className="form-question"
                  name={[index, "style"]}
                  label={`Response Type for Question ${index + 1}`}
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select a response type.">
                    <Option value={"Text"}>Text</Option>
                    <Option value={"Star Rating"}>Star Rating</Option>
                    <Option value={"Yes or No"}>Yes or No</Option>
                    <Option value={"Multiple Choice"}>Multiple Choice</Option>
                    <Option value={"URL"}>URL</Option>
                  </Select>
                </Form.Item> */}

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

export default RequestQuestions;
