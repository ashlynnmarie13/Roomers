import axios from "axios";

const GET_PROFILE = "GET_PROFILE";
const GET_PROFILES = "GET_PROFILES";

const initialState = {
  profile: null,
  profiles: null
};
// // Get current profile
// export const getCurrentProfile = () => dispatch => {
//   dispatch(setProfileLoading());
//   axios
//     .get("/api/profile")
//     .then(res =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       })
//     )
//
//     );
// };

// Get profile by id
// Get user by id
//for the chat page
export const getProfileById = _id => dispatch => {
  axios.get(`/api/user/info/${_id}`).then(res =>
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  );
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload
      };
    default:
      return state;
  }
}

// Get all profiles
export const getProfiles = () => dispatch => {
  axios.get("/api/user/info/all").then(res =>
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  );
};
