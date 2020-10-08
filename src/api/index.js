import axios from "axios";

// axios auth
const getToken = () => {
  const idToken = JSON.parse(localStorage.getItem("okta-token-storage")).idToken
    .idToken;

  const authHeader = {
    headers: { Authorization: `Bearer ${idToken}` }
  };

  return authHeader;
};

const apiUrl = `${process.env.REACT_APP_API_URI}/profile/`;
const topics = `${process.env.REACT_APP_API_URI}/topic/`;
const contexts = `${process.env.REACT_APP_API_URI}/context/`;
const topicQuestions = `${process.env.REACT_APP_API_URI}/topicquestion/`;
const topicMembers = `${process.env.REACT_APP_API_URI}/topicmember/`;
const questions = `${process.env.REACT_APP_API_URI}/question/`;
const responses = `${process.env.REACT_APP_API_URI}/response/`;
const threads = `${process.env.REACT_APP_API_URI}/thread/`;
const surveyRequest = `${process.env.REACT_APP_API_URI}/surveyrequest/`;
const requestResponse = `${process.env.REACT_APP_API_URI}/requestresponse/`;
const topicContextQuestion = `${process.env.REACT_APP_API_URI}/topiccontextquestion/`;
const topicRequestQuestion = `${process.env.REACT_APP_API_URI}/topicrequestquestion/`;

const getAllTopicRequestQuestions = () => {
  return axios
    .get(topicRequestQuestion, getToken())
    .then(res => {
      console.log("GET /topicRequestQuestion", res);
      return res.data;
    })
    .catch(err => console.log(err));
};

const getAllTopicContextQuestions = () => {
  return axios
    .get(topicContextQuestion, getToken())
    .then(res => {
      console.log("GET /topicContextQuestion", res);
      return res.data;
    })
    .catch(err => console.log(err));
};

// get all topics
const getAllTopics = () => {
  return axios
    .get(topics, getToken())
    .then(res => {
      console.log("GET /topic", res);
      return res.data;
    })
    .catch(err => console.log("GET /topic", err));
};

const getAllSurveyRequest = () => {
  return axios
    .get(surveyRequest, getToken())
    .then(res => {
      console.log("GET /surveyrequest", res);
      return res.data;
    })
    .catch(err => console.log("GET /surveyrequest", err));
};

const getAllTopicMembers = () => {
  return axios
    .get(topicMembers, getToken())
    .then(res => {
      console.log("GET /topicmember", res);
      return res.data;
    })
    .catch(err => console.log("GET /topicmember", err));
};

// get topic by topic id
const getTopic = topicID => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/topic/${topicID}`, getToken())
    .then(res => {
      console.log("GET /topic/:id", res);
      return res.data;
    })
    .catch(err => console.log("GET /topic/:id", err));
};

const getAllContexts = () => {
  return axios
    .get(contexts, getToken())
    .then(res => {
      console.log("GET /context/", res);
      return res.data;
    })
    .catch(err => console.log("GET /context/", err));
};

// get context by context id
const getContextByID = contextID => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/context/${contextID}`, getToken())
    .then(res => {
      console.log("GET /context/:id", res);
      return res.data;
    })
    .catch(err => console.log("GET /context/:id", err));
};

// get all preset questions
const getQuestions = () => {
  return axios
    .get(questions, getToken())
    .then(res => {
      console.log("GET /question", res);
      return res.data;
    })
    .catch(err => console.log("GET /question", err));
};

// get all topic questions
const getAllQuestions = () => {
  return axios
    .get(topicQuestions, getToken())
    .then(res => {
      console.log("GET /topicquestions", res);
      return res.data;
    })
    .catch(err => console.log("GET /topicquestions", err));
};

// get all questions by topic id
const getAllTopicQuestions = questions => {
  return axios
    .all(
      questions.map(q =>
        axios.get(
          `https://apollo-a-api.herokuapp.com/question/${q.questionid}`,
          getToken()
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
    .get(requestResponse, getToken())
    .then(res => {
      console.log("GET /requestrespose", res);
      return res.data;
    })
    .catch(err => console.log("GET /requestresponse", err));
};

// get all threads
const getAllThreads = () => {
  return axios
    .get(threads, getToken())
    .then(res => {
      console.log("GET /thread", res);
      return res.data;
    })
    .catch(err => console.log("GET /thread", err));
};

const getTopicMembers = () => {
  return axios
    .get(topicMembers, getToken())
    .then(res => {
      console.log("GET /topicmembers", res);
      return res.data;
    })
    .catch(err => console.log("GET /topicmembers", err));
};

// create a topic
const createTopic = topic => {
  console.log(topic);
  return axios
    .post(topics, topic, getToken())
    .then(res => {
      console.log("POST to /topic", res);
      return res.data;
    })
    .catch(err => console.log("POST to /topic", err));
};

const createQuestion = question => {
  return axios
    .post(questions, question, getToken())
    .then(res => {
      console.log("POST to /question", res);
      return res.data;
    })
    .catch(err => console.log("POST to /question", err));
};

const createTopicQuestion = question => {
  return axios
    .post(topicQuestions, question, getToken())
    .then(res => {
      console.log("POST to /topicquestion", res);
      return res.data;
    })
    .catch(err => console.log("POST to /topicquestion", err));
};

const createResponse = response => {
  return axios
    .post(responses, response, getToken())
    .then(res => {
      console.log("POST to /response", res);
      return res.data;
    })
    .catch(err => console.log("POST to /response", err));
};

// add topic member
const addMember = member => {
  return axios
    .post(topicMembers, member, getToken())
    .then(res => {
      console.log("POST to /topicmember", res);
      return res.data;
    })
    .catch(err => console.log("POST to /topicmember", err));
};

// edit topic
const editTopic = topic => {
  return axios
    .put(topics, topic, getToken())
    .then(res => {
      console.log("PUT to /topic/", res);
      return res.data;
    })
    .catch(err => console.log("PUT to /topic/", err));
};

// edit topic question
const editTopicQuestion = topicquestion => {
  return axios
    .put(topicQuestions, topicquestion, getToken())
    .then(res => {
      console.log("PUT to /topicquestion/", res);
      return res.data;
    })
    .catch(err => console.log("PUT to /topicquestion/", err));
};

// edit topic response
const editResponse = response => {
  return axios
    .put(responses, response, getToken())
    .then(res => {
      console.log("PUT to /response/", res);
      return res.data;
    })
    .catch(err => console.log("PUT to /response/", err));
};

// delete topic by topic id
const deleteTopic = topicID => {
  return axios
    .delete(`${process.env.REACT_APP_API_URI}/topic/${topicID}`, getToken())
    .then(res => {
      console.log("DELETE /topic/:id", res);
      return res.data;
    })
    .catch(err => console.log("DELETE /topic/:id", err));
};

// delete topic by topic id
const deleteTopicQuestion = question => {
  return axios
    .delete(
      `${process.env.REACT_APP_API_URI}/topicquestion/${question.id}`,
      getToken()
    )
    .then(res => {
      console.log("DELETE /topicquestion/:id", res);
      return res.data;
    })
    .catch(err => console.log("DELETE /topicquestion/:id", err));
};

// delete topic by topic id
const deleteResponse = response => {
  return axios
    .delete(
      `${process.env.REACT_APP_API_URI}/response/${response.id}`,
      getToken()
    )
    .then(res => {
      console.log("DELETE /response/:id", res);
      return res.data;
    })
    .catch(err => console.log("DELETE /response/:id", err));
};

const getAllRequestResponses = () => {
  return axios
    .get(requestResponse, getToken())
    .then(res => {
      console.log("GET /requestresponse", res);
      return res.data;
    })
    .catch(err => console.log("GET /requestresponse", err));
};

export {
  getAllRequestResponses,
  getAllTopics,
  getAllSurveyRequest,
  getTopic,
  getAllContexts,
  getContextByID,
  getQuestions,
  getAllQuestions,
  getAllTopicQuestions,
  getAllResponses,
  getAllThreads,
  getTopicMembers,
  createTopic,
  createQuestion,
  createTopicQuestion,
  createResponse,
  addMember,
  editTopic,
  editTopicQuestion,
  editResponse,
  deleteTopic,
  deleteTopicQuestion,
  deleteResponse,
  getAllTopicMembers,
  getToken,
  getAllTopicContextQuestions,
  getAllTopicRequestQuestions
};
