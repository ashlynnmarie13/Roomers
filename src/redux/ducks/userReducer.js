import axios from "axios";

const GET_USER = "GET_USER";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/me")
  };
}

const initialState = {
  user: {},
  isAuthed: false
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      console.log(action.payload.data);
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
    default:
      return state;
  }
}
