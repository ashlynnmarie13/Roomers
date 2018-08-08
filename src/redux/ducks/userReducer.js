import axios from "axios";

const GET_USER = "GET_USER";
const ADD_USER_INFO = "ADD_USER_INFO";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/me")
  };
}

const initialState = {
  user: {},
  userInfo: {},
  isAuthed: false
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
      console.log(action.payload.data);
      return { ...state, userInfo: action.payload.data };
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
