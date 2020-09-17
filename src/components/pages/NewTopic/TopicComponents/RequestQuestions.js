import React, { useState, useEffect } from "react";
import { Form, Checkbox } from "antd";
import axios from "axios";

const RequestQuestions = props => {
  const [initialQuestions, setInitialQuestions] = useState([]);

  useEffect(() => {
    const idToken = JSON.parse(localStorage.getItem("okta-token-storage"))
      .idToken.idToken;

    axios
      .get("https://apollo-a-api.herokuapp.com/question", {
        headers: { Authorization: `Bearer ${idToken}` }
      })
      .then(res => {
        handleRequestQuestions(res.data);
      })
      .catch(err => console.log(`GET to /question:`, err));
  }, []);

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

  const handleCheckbox = questions => {
    props.onChange("requestQ", questions);
  };

  return (
    <div>
      <h2>Request Questions</h2>

      <Form.Item
        name="radio-group"
        label="Select request questions for your team members."
      >
        <Checkbox.Group className="context_options" onChange={handleCheckbox}>
          {initialQuestions.map(q => {
            return <Checkbox value={q}>{q.question}</Checkbox>;
          })}
        </Checkbox.Group>
      </Form.Item>
    </div>
  );
};

export default RequestQuestions;

// {
//   Checkbox.checked ? <Radio.Group onChange={handleType} defaultValue="Text">
//     <Radio.Button value="Text">Text</Radio.Button>
//     <Radio.Button value="Star Rating">Star Rating</Radio.Button>
//     <Radio.Button value="Yes or No">Yes or No</Radio.Button>
//     <Radio.Button value="Multiple Choice">Multiple Choice</Radio.Button>
//     <Radio.Button value="URL">URL</Radio.Button>
//   </Radio.Group> : null
// }
