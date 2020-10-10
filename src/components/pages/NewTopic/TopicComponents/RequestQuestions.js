import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { getRQ } from "../../../../api/index";

const RequestQuestions = () => {
  const [presets, setPresets] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    getRQ()
      .then(res => {
        console.log("RQ:", res);
        setPresets(res);
      })
      .catch(err => console.log(err));
  }, []);

  // load all three preset questions
  const loadPresets = () => {
    const children = [];
    for (let i = 0; i < presets.length; i++) {
      children.push(
        <Form.Item
          name={["presetRQ", `${presets[i].id}`]}
          initialValue={presets[i].question}
        >
          <Input disabled={true} placeholder={presets[i].question} />
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
                    name={[index, "default"]}
                    initialValue={"False"}
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
