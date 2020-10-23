import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";

const ResponseForm = props => {
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();

  const submitResponses = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        setShowForm(false);
        form.resetFields();
      })
      .catch(err => console.log(err));
  };

  const cancelResponses = () => {
    setShowForm(false);
    form.resetFields();
  };

  return (
    <div className="response-form">
      <Form
        form={form}
        layout="vertical"
        name="ResponseForm"
        onFinish={submitResponses}
      >
        {showForm && props.topic.leaderid !== props.user.sub ? (
          <div>
            <h3>Respond to the Survey Request</h3>

            {props.questions.map((question, index) => {
              return (
                <div className="response-form-input">
                  <h3 style={{ color: "#7F64FF", marginTop: "1rem" }}>
                    {index + 1}. {question.requestquestionid}
                  </h3>

                  <Form.Item
                    name={[
                      "ResponseForm",
                      `${props.user.sub}`,
                      `${question.requestquestionid}`
                    ]}
                    rules={[{ required: true }]}
                    required
                  >
                    <Input.TextArea />
                  </Form.Item>
                </div>
              );
            })}

            <div className="response-buttons">
              <Button type="secondary" onClick={cancelResponses}>
                Cancel
              </Button>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Responses
                </Button>
              </Form.Item>
            </div>
          </div>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Respond
          </Button>
        )}
      </Form>
    </div>
  );
};

export default ResponseForm;
