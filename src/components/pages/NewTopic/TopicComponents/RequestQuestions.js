import React, { useState, useEffect } from "react";
import { Form, Button, Select, message } from "antd";
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
        handleRequestQuestions(res);
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
  const getQuestions = () => {
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

  const onFinish = values => {
    let selectedIDs = values.questions.map(q => Object.values(q)[0]);
    let selectedTypes = values.questions.map(q => Object.values(q)[1]);

    initialQuestions.forEach((q, index) => {
      if (q.id === selectedIDs[index]) {
        q.style = selectedTypes[index];
        allResponseQuestions.push(q);
      }
    });

    message.info("Your questions were saved");
    props.onChange("requestQ", allResponseQuestions);
  };

  return (
    <Form name="nest-messages" onFinish={onFinish}>
      <Form.List name="questions">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <>
                  <Form.Item
                    {...field}
                    className="form-question"
                    name={[field.name, `question${index}`]}
                    label={`Question ${index + 1}`}
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select a response question.">
                      {getQuestions()}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...field}
                    className="form-question"
                    name={[field.name, `type${index}`]}
                    label={`Response Type for Question ${index + 1}`}
                    rules={[{ required: true }]}
                  >
                    <Select
                      name={["question", "type"]}
                      placeholder="Select a response type."
                    >
                      <Option value={"Text"}>Text</Option>
                      <Option value={"Star Rating"}>Star Rating</Option>
                      <Option value={"Yes or No"}>Yes or No</Option>
                      <Option value={"Multiple Choice"}>Multiple Choice</Option>
                      <Option value={"URL"}>URL</Option>
                    </Select>
                  </Form.Item>

                  <Button
                    className="save-button"
                    type="secondary"
                    onClick={() => {
                      remove(field.name);
                    }}
                  >
                    <MinusCircleOutlined /> Remove Question
                  </Button>
                </>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: "100%" }}
                >
                  <PlusOutlined /> Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <h4 className="save-warning">
          Please make sure to save your request questions before moving on.
        </h4>
        <Button type="primary" htmlType="submit">
          Save Questions
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RequestQuestions;
