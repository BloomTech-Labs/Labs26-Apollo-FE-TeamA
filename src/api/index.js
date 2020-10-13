import axios from "axios";

// axios authentication
const getToken = () => {
  const idToken = JSON.parse(localStorage.getItem("okta-token-storage")).idToken
    .idToken;

  const authHeader = {
    headers: { Authorization: `Bearer ${idToken}` }
  };

  return authHeader;
};

// -------------------------API ENDPOINTS-----------------------------------
// GENERAL
const profile = `${process.env.REACT_APP_API_URI}/profile/`;
const topics = `${process.env.REACT_APP_API_URI}/topic/`;
const contexts = `${process.env.REACT_APP_API_URI}/context/`;
const threads = `${process.env.REACT_APP_API_URI}/thread/`;
const topicMembers = `${process.env.REACT_APP_API_URI}/topicmember/`;
const surveyRequests = `${process.env.REACT_APP_API_URI}/surveyrequest/`;
// CONTEXT QUESTIONS
const contextQuestions = `${process.env.REACT_APP_API_URI}/contextquestion/`;
const defaultCQ = `${process.env.REACT_APP_API_URI}/contextquestion/getdefaultcontextquestion/`;
const topicContextQuestion = `${process.env.REACT_APP_API_URI}/topiccontextquestion/`;
const contextResponses = `${process.env.REACT_APP_API_URI}/contextresponse/`;
// REQUEST QUESTIONS
const requestQuestions = `${process.env.REACT_APP_API_URI}/requestquestion/`;
const defaultRQ = `${process.env.REACT_APP_API_URI}/requestquestion/getdefaultrequestquestion/`;
const requestResponse = `${process.env.REACT_APP_API_URI}/requestresponse/`;
const topicRequestQuestion = `${process.env.REACT_APP_API_URI}/topicrequestquestion/`;

const getAllRequestQuestions = () => {
  return axios
    .get(requestQuestions, getToken())
    .then(res => {
      console.log("GET /requestquestions", res);
      return res.data;
    })
    .catch(err => console.log("GET /requestquestions", err));
};

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

const createTopicCQ = question => {
  return axios
    .post(topicContextQuestion, question, getToken())
    .then(res => {
      console.log("POST /topicContextQuestion", res);
      return res.data;
    })
    .catch(err => console.log("POST /topicContextQuestion", err));
};

const createTopicRQ = question => {
  return axios
    .post(topicRequestQuestion, question, getToken())
    .then(res => {
      console.log("POST /requestContextQuestion", res);
      return res.data;
    })
    .catch(err => console.log("POST /requestContextQuestion", err));
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
    .get(surveyRequests, getToken())
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

// create a topic
const createTopic = topic => {
  console.log(topic);
  return axios
    .post(topics, topic, getToken())
    .then(res => {
      console.log("POST /topic", res);
      return res.data;
    })
    .catch(err => console.log("POST /topic", err));
};

// edit topic
const editTopic = topic => {
  return axios
    .put(topics, topic, getToken())
    .then(res => {
      console.log("PUT /topic/", res);
      return res.data;
    })
    .catch(err => console.log("PUT /topic/", err));
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

// get survey requests
const getAllRequests = () => {
  return axios
    .get(surveyRequests, getToken())
    .then(res => {
      console.log("GET /surveyrequest", res);
      return res.data;
    })
    .catch(err => console.log("GET /surveyrequest", err));
};

// get a survey request by ID
const getRequestByID = id => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/surveyrequest/${id}`, getToken())
    .then(res => {
      console.log("GET /surveyrequest/:id", res);
      return res.data;
    })
    .catch(err => console.log("GET /surveyrequest/:id", err));
};

// create a survey request
const createRequest = request => {
  return axios
    .post(surveyRequests, request, getToken())
    .then(res => {
      console.log("POST /surveyrequest", res);
      return res.data;
    })
    .catch(err => console.log("POST /surveyrequest", err));
};

// edit a survey request
const editRequest = request => {
  return axios
    .put(surveyRequests, request, getToken())
    .then(res => {
      console.log("PUT /surveyrequest", res);
      return res.data;
    })
    .catch(err => console.log("PUT /surveyrequest", err));
};

// edit a survey request
const deleteRequest = id => {
  return axios
    .delete(`${process.env.REACT_APP_API_URI}/surveyrequest/${id}`, getToken())
    .then(res => {
      console.log("DELETE /surveyrequest/:id", res);
      return res.data;
    })
    .catch(err => console.log("DELETE /surveyrequest/:id", err));
};

// get all contexts
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

// get all context questions
const getCQ = () => {
  return axios
    .get(defaultCQ, getToken())
    .then(res => {
      console.log("GET /getdefaultcontextquestion", res);
      return res.data;
    })
    .catch(err => console.log("GET /getdefaultcontextquestion", err));
};

// create a context question
const createCQ = question => {
  return axios
    .post(contextQuestions, question, getToken())
    .then(res => {
      console.log("POST /contextquestion", res);
      return res.data;
    })
    .catch(err => console.log("POST /contextquestion", err));
};

// create a context question
const editCQ = question => {
  return axios
    .put(contextQuestions, question, getToken())
    .then(res => {
      console.log("PUT /contextquestion", res);
      return res.data;
    })
    .catch(err => console.log("PUT /contextquestion", err));
};

// get all request questions
const getRQ = () => {
  return axios
    .get(requestQuestions, getToken())
    .then(res => {
      console.log("GET /getdefaultrequestquestion", res);
      return res.data;
    })
    .catch(err => console.log("GET /getdefaultrequestquestion", err));
};

// create a request question
const createRQ = question => {
  return axios
    .post(requestQuestions, question, getToken())
    .then(res => {
      console.log("POST /requestquestion", res);
      return res.data;
    })
    .catch(err => console.log("POST /requestquestion", err));
};

// edit a request question
const editRQ = question => {
  return axios
    .put(requestQuestions, question, getToken())
    .then(res => {
      console.log("PUT /requestquestion", res);
      return res.data;
    })
    .catch(err => console.log("PUT /requestquestion", err));
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

// get topic members
const getTopicMembers = () => {
  return axios
    .get(topicMembers, getToken())
    .then(res => {
      console.log("GET /topicmembers", res);
      return res.data;
    })
    .catch(err => console.log("GET /topicmembers", err));
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
  createTopic,
  getAllRequests,
  getRequestByID,
  createRequest,
  editRequest,
  deleteRequest,
  getAllContexts,
  getContextByID,
  getCQ,
  createCQ,
  editCQ,
  getRQ,
  createRQ,
  editRQ,
  getAllThreads,
  getTopicMembers,
  addMember,
  editTopic,
  deleteTopic,
  getAllTopicMembers,
  getToken,
  getAllTopicContextQuestions,
  getAllTopicRequestQuestions,
  getAllRequestQuestions,
  createTopicCQ,
  createTopicRQ
};
