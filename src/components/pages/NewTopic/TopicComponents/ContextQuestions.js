import React, { useState, useEffect } from "react";
import { Form, Button, Select, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getQuestions } from "../../../../api/index";

// ISSUE FOR ADDING CUSTOM QUESTIONS------------------------
// issue may arise when attempting to add custom questions
// because the question db table does not account for
// context types, so all questions ever created will show up

const ContextQuestions = props => {
  const [initialQuestions, setInitialQuestions] = useState([]);
  const allContextQuestions = [];
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
  const getQuestions = () => {
    const count = initialQuestions.length;
    const children = [];

    for (let i = 0; i < count; i++) {
      children.push(
        <Option key={i} value={initialQuestions[i].id}>
          {initialQuestions[i].question}
        </Option>
      );
    }

    return children;
  };

  // submitting values back to RenderNewTopic component
  const onFinish = values => {
    let selectedIDs = values.questions.map(q => Object.values(q)[0]);

    initialQuestions.forEach((q, index) => {
      if (q.id === selectedIDs[index]) {
        allContextQuestions.push(q);
      }
    });

    message.info("Your questions were saved");
    props.onChange("contextQ", allContextQuestions);
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
                    key={index}
                    className="form-question"
                    name={[field.name, `q${index}`]}
                    label={`Question ${index + 1}`}
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select a response question.">
                      {getQuestions()}
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
                  <PlusOutlined /> Add Question
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item>
        <h4 className="save-warning">
          Please make sure to save your context questions before moving on.
        </h4>
        <Button type="primary" htmlType="submit">
          Save Questions
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContextQuestions;

// return (
//   <div>
//     <h2>Context Questions</h2>

//     <Form.Item name="radio-group" label="Choose your context questions:">
//       <Checkbox.Group className="context_options" onChange={handleCheckbox}>
//         {initialQuestions.map(q => {
//           return <Checkbox value={q}>{q.question}</Checkbox>;
//         })}
//       </Checkbox.Group>
//     </Form.Item>
//   </div>
// );
