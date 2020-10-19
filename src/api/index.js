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
const topicRequestQuestion = `${process.env.REACT_APP_API_URI}/topicrequestquestion/`;
const requestResponse = `${process.env.REACT_APP_API_URI}/requestresponse/`;

const getAllContextQuestions = () => {
  return axios
    .get(contextQuestions, getToken())
    .then(res => {
      // console.log("GET /contextquestion", res);
      return res.data;
    })
    .catch(err => console.log("GET /contextquestion", err));
};

// get all topics
const getAllTopics = () => {
  return axios
    .get(topics, getToken())
    .then(res => {
      // console.log("GET /topic", res);
      return res.data;
    })
    .catch(err => console.log("GET /topic", err));
};

const getRequestQuestionByID = id => {
  return getAllRequestQuestions()
    .then(res => {
      const filterQuestion = res.filter(item => item.id == id);
      // console.log("getRequestQuestionByID -> id", id);
      // console.log("getRequestQuestionByID -> res", res);
      // console.log(
      //   "getRequestQuestionByID -> filterQuestion",
      //   filterQuestion[0]
      // );
      return filterQuestion[0];
    })
    .catch(err =>
      console.log("getRequestQuestionByID -> getAllRequestQuestion", err)
    );
};

// const getAllTopicRequestQuestions = () => {
// get topic by topic id
const getTopic = topicID => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/topic/${topicID}`, getToken())
    .then(res => {
      // console.log("GET /topic/:id", res);
      return res.data;
    })
    .catch(err => console.log("GET /topic/:id", err));
};

// create a topic
const createTopic = topic => {
  // console.log(topic);
  return axios
    .post(topics, topic, getToken())
    .then(res => {
      // console.log("POST /topic", res);
      return res.data;
    })
    .catch(err => console.log("POST /topic", err));
};

// edit topic
const editTopic = topic => {
  return axios
    .put(topics, topic, getToken())
    .then(res => {
      // console.log("PUT /topic/", res);
      return res.data;
    })
    .catch(err => console.log("PUT /topic/", err));
};

// delete topic by id
const deleteTopic = topicID => {
  return axios
    .delete(`${process.env.REACT_APP_API_URI}/topic/${topicID}`, getToken())
    .then(res => {
      // console.log("DELETE /topic/:id", res);
      return res.data;
    })
    .catch(err => console.log("DELETE /topic/:id", err));
};

// get all survey requests
const getAllSurveyRequest = () => {
  return axios
    .get(surveyRequests, getToken())
    .then(res => {
      // console.log("GET /surveyrequest", res);
      return res.data;
    })
    .catch(err => console.log("GET /surveyrequest", err));
};

// get a survey request by ID
const getRequestByID = id => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/surveyrequest/${id}`, getToken())
    .then(res => {
      // console.log("GET /surveyrequest/:id", res);
      return res.data;
    })
    .catch(err => console.log("GET /surveyrequest/:id", err));
};

// create a survey request
const createRequest = request => {
  return axios
    .post(surveyRequests, request, getToken())
    .then(res => {
      // console.log("POST /surveyrequest", res);
      return res.data;
    })
    .catch(err => console.log("POST /surveyrequest", err));
};

// edit a survey request
const editRequest = request => {
  return axios
    .put(surveyRequests, request, getToken())
    .then(res => {
      // console.log("PUT /surveyrequest", res);
      return res.data;
    })
    .catch(err => console.log("PUT /surveyrequest", err));
};

// delete a survey request by id
const deleteRequest = id => {
  return axios
    .delete(`${process.env.REACT_APP_API_URI}/surveyrequest/${id}`, getToken())
    .then(res => {
      // console.log("DELETE /surveyrequest/:id", res);
      return res.data;
    })
    .catch(err => console.log("DELETE /surveyrequest/:id", err));
};

const getContextQuestionByID = id => {
  // console.log("GET /contextquestion/:id -> id ", id);
  return axios
    .get(`${process.env.REACT_APP_API_URI}/contextquestion/${id}`, getToken())
    .then(res => {
      // console.log("GET /contextquestion/:id", res);
      return res.data;
    })
    .catch(err => console.log("GET /contextquestion/:id", err));
};

// get all context responses
const getAllContextResponses = () => {
  return axios
    .get(contextResponses, getToken())
    .then(res => {
      // console.log("GET /contextresponse", res);
      return res.data;
    })
    .catch(err => console.log("GET /contextresponse", err));
};

// create a context response
const createContextResponse = response => {
  return axios
    .post(contextResponses, response, getToken())
    .then(res => {
      // console.log("POST /contextresponse", res);
      return res.data;
    })
    .catch(err => console.log("POST /contextresponse", err));
};

// get all survey request responses
const getAllRequestResponses = () => {
  return axios
    .get(requestResponse, getToken())
    .then(res => {
      // console.log("GET /requestresponse", res);
      return res.data;
    })
    .catch(err => console.log("GET /requestresponse", err));
};

// get all contexts
const getAllContexts = () => {
  return axios
    .get(contexts, getToken())
    .then(res => {
      // console.log("GET /context/", res);
      return res.data;
    })
    .catch(err => console.log("GET /context/", err));
};

// get context by context id
const getContextByID = contextID => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/context/${contextID}`, getToken())
    .then(res => {
      // console.log("GET /context/:id", res);
      return res.data;
    })
    .catch(err => console.log("GET /context/:id", err));
};

// get all default context questions
const getCQ = () => {
  return axios
    .get(defaultCQ, getToken())
    .then(res => {
      // console.log("GET /getdefaultcontextquestion", res);
      return res.data;
    })
    .catch(err => console.log("GET /getdefaultcontextquestion", err));
};

// create a context question
const createCQ = question => {
  return axios
    .post(contextQuestions, question, getToken())
    .then(res => {
      // console.log("POST /contextquestion", res);
      return res.data;
    })
    .catch(err => console.log("POST /contextquestion", err));
};

// edit a context question
const editCQ = question => {
  return axios
    .put(contextQuestions, question, getToken())
    .then(res => {
      // console.log("PUT /contextquestion", res);
      return res.data;
    })
    .catch(err => console.log("PUT /contextquestion", err));
};

// get all topic context questions
const getAllTopicContextQuestions = () => {
  return axios
    .get(topicContextQuestion, getToken())
    .then(res => {
      // console.log("GET /topicContextQuestion", res);
      return res.data;
    })
    .catch(err => console.log(err));
};

// create a topic context question
const createTopicCQ = question => {
  return axios
    .post(topicContextQuestion, question, getToken())
    .then(res => {
      // console.log("POST /topicContextQuestion", res);
      return res.data;
    })
    .catch(err => console.log("POST /topicContextQuestion", err));
};

// get all request questions
const getAllRequestQuestions = () => {
  return axios
    .get(requestQuestions, getToken())
    .then(res => {
      // console.log("GET /requestquestions", res);
      return res.data;
    })
    .catch(err => console.log("GET /requestquestions", err));
};

// get all default request questions
const getRQ = () => {
  return axios
    .get(defaultRQ, getToken())
    .then(res => {
      // console.log("GET /getdefaultrequestquestion", res);
      return res.data.questions;
    })
    .catch(err => console.log("GET /getdefaultrequestquestion", err));
};

// create a request question
const createRQ = question => {
  return axios
    .post(requestQuestions, question, getToken())
    .then(res => {
      // console.log("POST /requestquestion", res);
      return res.data;
    })
    .catch(err => console.log("POST /requestquestion", err));
};

// edit a request question
const editRQ = question => {
  return axios
    .put(requestQuestions, question, getToken())
    .then(res => {
      // console.log("PUT /requestquestion", res);
      return res.data;
    })
    .catch(err => console.log("PUT /requestquestion", err));
};

// get all topic request questions
const getAllTopicRequestQuestions = () => {
  return axios
    .get(topicRequestQuestion, getToken())
    .then(res => {
      // console.log("GET /topicRequestQuestion", res);
      return res.data;
    })
    .catch(err => console.log(err));
};

// create a topic request question
const createTopicRQ = question => {
  return axios
    .post(topicRequestQuestion, question, getToken())
    .then(res => {
      // console.log("POST /requestContextQuestion", res);
      return res.data;
    })
    .catch(err => console.log("POST /requestContextQuestion", err));
};

// get all threads
const getAllThreads = () => {
  return axios
    .get(threads, getToken())
    .then(res => {
      // console.log("GET /thread", res);
      return res.data;
    })
    .catch(err => console.log("GET /thread", err));
};

// get topic members
const getAllTopicMembers = () => {
  return axios
    .get(topicMembers, getToken())
    .then(res => {
      // console.log("GET /topicmember", res);
      return res.data;
    })
    .catch(err => console.log("GET /topicmember", err));
};

// add topic member
const addMember = member => {
  return axios
    .post(topicMembers, member, getToken())
    .then(res => {
      // console.log("POST to /topicmember", res);
      return res.data;
    })
    .catch(err => console.log("POST to /topicmember", err));
};

const getProfile = id => {
  return axios
    .get(`${process.env.REACT_APP_API_URI}/profile/${id}`, getToken())
    .then(res => {
      // console.log("GET /profile/:id", res);
      return res.data;
    })
    .catch(err => console.log("GET /profile/:id", err));
};

export {
  getRequestQuestionByID,
  getContextQuestionByID,
  getProfile,
  // topic handlers
  getAllTopics,
  getTopic,
  createTopic,
  editTopic,
  deleteTopic,
  // survey request handlers
  getAllSurveyRequest,
  getRequestByID,
  createRequest,
  editRequest,
  deleteRequest,
  getAllContextResponses,
  createContextResponse,
  getAllRequestResponses,
  // context handlers
  getAllContexts,
  getContextByID,
  // context question handlers
  getCQ,
  createCQ,
  editCQ,
  getAllTopicContextQuestions,
  createTopicCQ,
  // request question handlers
  getAllRequestQuestions,
  getRQ,
  createRQ,
  editRQ,
  getAllTopicRequestQuestions,
  createTopicRQ,
  // thread handlers
  getAllThreads,
  // topic member handlers
  getAllTopicMembers,
  addMember,
  // token handler
  getToken
};
