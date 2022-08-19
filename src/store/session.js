import axios from "axios";

const initialState = {
  auth: {},
  invalidLogin: false,
};

const session = (state = initialState, action) => {
  if (action.type === "SET_AUTH") {
    state = { ...state, auth: action.auth };
  } else if (action.type === "SET_INVALID_LOGIN") {
    state = { ...state, invalidLogin: true };
  }
  return state;
};

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch({ type: "SET_AUTH", auth: {} });
  };
};

export const exchangeToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
    }
  };
};
export const login = (credentials) => {
  return async (dispatch) => {
    try {
      let response = await axios.post("/api/sessions", credentials);
      const { token } = response.data;
      window.localStorage.setItem("token", token);
      response = await axios.get("/api/sessions", {
        headers: {
          authorization: token,
        },
      });
      const auth = response.data;
      dispatch({ auth, type: "SET_AUTH" });
    } catch (err) {
      if (err.response.status === 401) {
        dispatch({ type: "SET_INVALID_LOGIN" });
      }
      //console.log(err.response.status);
    }
  };
};

export default session;
