import axios from "axios";

// axios auth
const idToken = JSON.parse(localStorage.getItem("okta-token-storage")).idToken
  .idToken;
const authHeader = {
  headers: { Authorization: `Bearer ${idToken}` }
};

// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}/profile/`;
const topics = `${process.env.REACT_APP_API_URI}/topic/`;
const topicQuestions = `${process.env.REACT_APP_API_URI}/topicquestion/`;
const questions = `${process.env.REACT_APP_API_URI}/question/`;
const responses = `${process.env.REACT_APP_API_URI}/response/`;

// get topic by topic id
const getTopic = topicID => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/topic/${topicID}`, authHeader)
    .then(res => {
      console.log("GET /topic/:id", res);
      return res.data;
    })
    .catch(err => console.log("GET /topic/:id", err));
};

// get context by context id
const getContext = contextID => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/context/${contextID}`, authHeader)
    .then(res => {
      console.log("GET /context/:id", res);
      return res.data;
    })
    .catch(err => console.log("GeT /context/:id", err));
};

// get all preset questions
const getQuestions = () => {
  return axios
    .get(questions, authHeader)
    .then(res => {
      console.log("GET /context/:id", res);
      return res.data;
    })
    .catch(err => console.log("GeT /context/:id", err));
};

// get all topic questions
const getAllQuestions = () => {
  return axios
    .get(topicQuestions, authHeader)
    .then(res => {
      console.log("GET /topicquestions", res);
      return res.data;
    })
    .catch(err => console.log("GeT /topicquestions", err));
};

// get all questions by topic id
const getAllTopicQuestions = questions => {
  return axios
    .all(
      questions.map(q =>
        axios.get(
          `https://apollo-a-api.herokuapp.com/question/${q.questionid}`,
          authHeader
        )
      )
    )
    .then(res => {
      console.log("GET /question/:id", res);
      return res;
    })
    .catch(err => console.log("GET question/:id", err));
};

// get all responses
const getAllResponses = () => {
  return axios
    .get(responses, authHeader)
    .then(res => {
      console.log("GET /response", res);
      return res.data;
    })
    .catch(err => console.log("GET /response", err));
};

// delete topic by topic id
const deleteTopic = topicID => {
  return axios
    .delete(`${process.env.REACT_APP_API_URI}/topic/${topicID}`, authHeader)
    .then(res => {
      console.log("DELETE /topic/:id", res);
      return res.data;
    })
    .catch(err => console.log("DELETE /topic/:id", err));
};

export {
  getTopic,
  getContext,
  getQuestions,
  getAllQuestions,
  getAllTopicQuestions,
  getAllResponses,
  deleteTopic
};
