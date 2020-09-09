import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Select, Modal, Form, Input } from "antd";
import axios from "axios";

{
  /*
TO-DO's
------------------------------------------------------------
- clarify context question data & context question responses
- figure out how to generate join code
- create modal for join-code pop-up upon topic creation
- link topic leader id to user id
*/
}

// New Topic modal form component
const FormModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const newTopicValues = {
    leaderid: "",
    topic_name: "",
    topic_frequency: "",
    context_questions: [],
    request_questions: [],
    join_code: "",
    contextid: "",
    created_at: new Date(),
    updated_at: new Date()
  };

  return (
    // New Topic modal form set up
    <Modal
      visible={visible}
      title="New Topic"
      okText="Create Topic"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      {/* form to display on pop up modal */}
      <Form
        form={form}
        layout="vertical"
        name="newTopicForm"
        initialValues={newTopicValues}
      >
        {/* Topic Title */}
        <Form.Item
          name="topic_name"
          label="Give your topic a title."
          rules={[
            {
              required: true,
              message: "Please give the topic a title."
            }
          ]}
        >
          <Input />
        </Form.Item>

        {/* Topic Frequency */}
        <Form.Item
          name="topic_frequency"
          label="How often will this topic occur?"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please set a frequency."
            }
          ]}
        >
          <Select placeholder="Set a frequency.">
            <Option value="once">Once</Option>
            <Option value="daily">Daily</Option>
            <Option value="weekly">Weekly</Option>
            <Option value="monthly">Monthly</Option>
          </Select>
        </Form.Item>

        {/* Context Questions */}
        <h3>Context Questions</h3>
        <Form.List name="context_questions">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please select a context question."
                        }
                      ]}
                    >
                      <Select placeholder="Select a context question.">
                        <Option value="q1">Question 1</Option>
                        <Option value="q2">Question 2</Option>
                        <Option value="q3">Question 3</Option>
                        <Option value="q4">Question 4</Option>
                      </Select>
                    </Form.Item>
                    {fields.length >= 1 ? (
                      <Button
                        onClick={() => {
                          remove(field.name);
                        }}
                      >
                        Remove Context Question
                      </Button>
                    ) : null}
                  </Form.Item>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    Add Context Question
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        {/* Response Questions */}
        <h3>Response Questions</h3>
        <Form.List name="response_questions">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={field.key}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please select a response question."
                        }
                      ]}
                    >
                      <Select placeholder="Select a response question.">
                        <Option value="q1">Question 1</Option>
                        <Option value="q2">Question 2</Option>
                        <Option value="q3">Question 3</Option>
                        <Option value="q4">Question 4</Option>
                      </Select>
                    </Form.Item>
                    {fields.length >= 1 ? (
                      <Button
                        onClick={() => {
                          remove(field.name);
                        }}
                      >
                        Remove Response Question
                      </Button>
                    ) : null}
                  </Form.Item>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    Add Response Question
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    </Modal>
  );
};

// rendering New Topic Modal Form on button click
const NewTopicForm = () => {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const onCreate = values => {
    console.log("New Topic Values:", values);

    setVisible(false);

    axios
      .post("http://localhost:3000", values)
      .then(res => {
        console.log(res);
        history.push("./dashboard");
      })
      .catch(err => {
        console.log(err);
        alert("There was an error creating the topic. Please try again.");
      });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Topic
      </Button>

      <FormModal
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default NewTopicForm;
