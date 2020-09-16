import React, { useState, useEffect } from "react";
import { Form, Checkbox } from "antd";
import axios from "axios";

const ContextQuestions = props => {
  const [initialQuestions, setInitialQuestions] = useState([]);

  useEffect(() => {
    const idToken = JSON.parse(localStorage.getItem("okta-token-storage"))
      .idToken.idToken;

    axios
      .get("https://apollo-a-api.herokuapp.com/question", {
        headers: { Authorization: `Bearer ${idToken}` }
      })
      .then(res => {
        handleContextQuestions(res.data);
      })
      .catch(err => console.log(`GET to /question:`, err));
  }, []);

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

  const handleCheckbox = questions => {
    props.onChange("contextQ", questions);
  };

  return (
    <div>
      <h2>Context Questions</h2>

      <Form.Item name="radio-group" label="Select context questions.">
        <Checkbox.Group className="context_options" onChange={handleCheckbox}>
          {initialQuestions.map(q => {
            return <Checkbox value={q}>{q.question}</Checkbox>;
          })}
        </Checkbox.Group>
      </Form.Item>
    </div>
  );
};

export default ContextQuestions;
