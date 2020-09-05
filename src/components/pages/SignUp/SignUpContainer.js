import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button } from "antd";

// TO-DO's:
// - handle POST request to backend API for registration
// - form validation (?)

const SignUp = () => {
  const newUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  const [user, setUser] = useState(newUser);
  const history = useHistory();
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 16
      }
    }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const handleSubmit = values => {
    console.log(values);
    axios
      .post("http://localhost:3000", user)
      .then(res => {
        console.log(res);
        // push to dashboard using credentials provided from `user`
        //history.push("./dashboard");
      })
      .catch(err => {
        console.log(err);
        alert("There was an error creating an account. Please try again.");
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <Form
        {...layout}
        form={form}
        name="register"
        initialValues={newUser}
        scrollToFirstError
        onFinish={handleSubmit}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          required
          rules={[
            {
              required: true,
              message: "Please input your first name!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          required
          rules={[
            {
              required: true,
              message: "Please input your last name!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!"
            },
            {
              required: true,
              message: "Please input your E-mail!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!"
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
