import axios from "axios";

const GET_PROFILE = "GET_PROFILE";
const GET_PROFILES = "GET_PROFILES";

const initialState = {
  profile: null,
  profiles: null
};

export default function profileReducer(state = initialState, action) {
  switch (action) {
    case `${GET_PROFILES}_FULFILLED`:
      return { ...state, profiles: action.payload.data };
    default:
      return { state };
  }
}

// Get profile by id

export const getProfileById = _id => dispatch => {
  axios.get(`/api/user/info/${_id}`).then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  );
};

// Get all profiles
export function getProfiles(location) {
  console.log(location);
  return {
    type: "GET_PROFILES",
    payload: axios.get("/api/users/info")
  };
}
