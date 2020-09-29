import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Modal, Form, Input, message } from "antd";
import { getAllTopics, addMember } from "../../../api/index";

const JoinTopic = props => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [topics, setTopics] = useState({});

  useEffect(() => {
    getAllTopics()
      .then(res => {
        console.log(res);
        setTopics(res);
      })
      .catch(err => console.log(err));
  }, []);

  // display Join code on submit
  const join = () => {
    form.validateFields().then(values => {
      for (let i = 0; i < topics.length; i++) {
        if (values.joinCode === topics[i].joincode) {
          let member = {
            topicid: topics[i].id,
            leaderid: topics[i].leaderid,
            memberid: props.user.sub
          };
          addMember(member)
            .then(res => {
              message.info("Success!");
              setVisible(false);
            })
            .catch(err => {
              message.info("Join code invalid.");
            });
        }
      }
    });
  };

  const cancelJoin = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button
        type="secondary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Join Topic
      </Button>

      <Modal
        visible={visible}
        width={400}
        title="Join Topic"
        okText="Join"
        cancelText="Cancel"
        onCancel={cancelJoin}
        onOk={join}
        maskClosable={false}
      >
        <Form name="join-form" layout="vertical" form={form}>
          <Form.Item
            name={["joinCode"]}
            label="Enter your join code:"
            rules={[
              { required: true, message: "Please enter your join code." }
            ]}
          >
            <Input placeholder="ex: 4gH7Dz" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JoinTopic;
