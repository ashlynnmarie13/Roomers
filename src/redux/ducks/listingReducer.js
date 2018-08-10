import axios from "axios";

const GET_LISTING = "GET_LISTING";
const GET_LISTINGS = "GET_LISTINGS";

const initialState = {
  listing: null,
  listings: null
};

export default function listingReducer(state = initialState, action) {
  switch (action) {
    case `${GET_LISTINGS}_FULFILLED`:
      return { ...state, listings: action.payload.data };
    default:
      return { state };
  }
}



export const getListingById = _id => dispatch => {
  axios.get(`/api/listing/info/${_id}`).then(res =>
    dispatch({
      type: GET_LISTING,
      payload: res.data
    })
  );
};

export function getListings(location) {
  return {
    type: "GET_LISTINGS",
    payload: axios.get("/api/listings/info")
  };
}