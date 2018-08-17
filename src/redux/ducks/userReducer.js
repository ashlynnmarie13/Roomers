import axios from "axios";

const GET_USER = "GET_USER";
const ADD_USER_INFO = "ADD_USER_INFO";
const GET_STATE = "GET_STATE";
const LOG_OUT = "LOG_OUT";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/me")
  };
}
export function logout() {
  return {
    type: LOG_OUT,
    payload: axios.get("/logout")
  };
}

const getState = {
  cities: {},
  pictures: []
};
const initialState = {
  user: {},
  isAuthed: false,
  userInfo: {}
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data,
        isAuthed: true
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        isAuthed: false
      };
    case `${ADD_USER_INFO}_FULFILLED`:
      return {
        ...state,
        userInfo: action.payload.data
      };
    case `${GET_STATE}_FULFILLED`:
      return {
        ...state,
        [action.newVal.key]: action.newVal.value
      };

    case `${LOG_OUT}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data,
        isAuthed: true
      };
    default:
      return state;
  }
}

export function addUserInfo(info) {
  console.log(info);
  return {
    type: ADD_USER_INFO,
    payload: axios.post("/api/user/info", info)
  };
}

// Get user by id
//for the chat page
export function getUserById(_id) {
  console.log(_id);
  return {
    type: GET_USER,
    payload: axios.get(`/api/user/info/${_id}`)
  };
}
