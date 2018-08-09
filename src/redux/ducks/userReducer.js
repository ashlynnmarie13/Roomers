import axios from "axios";

const GET_USER = "GET_USER";
const ADD_USER_INFO = "ADD_USER_INFO";
const GET_STATE = "GET_STATE";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/me")
  };
}
const getState = {
  cities: {},
  pictures: []
};
const initialState = {
  user: {},
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
      return {
        ...state,
        userInfo: action.payload.data
      };
    case `${GET_STATE}_FULFILLED`:
      return {
        ...state,
        [action.newVal.key]: action.newVal.value
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
// export function getState(updatedVal) {
//   return { type: "GET_STATE", newVal: updatedVal };
// }
