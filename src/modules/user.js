import { createAction, handleActions } from "redux-actions";
import createActionTypes from "../lib/createActionTypes";
import createRequsetThunk from "../lib/createRequsetThunk";
import * as api from "../api/auth";

//usedispatch로 액션을 사용
const TEMP_SET_USER = "user/TEMP_SET_USER";
const [CHECK, CHECK_SUCCESS, CHANG_FIELD] = createActionTypes("user/CHECK");

const LOGOUT = "user/LOGOUT";

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createRequsetThunk(CHECK, api.check);

export const logout = createRequsetThunk(LOGOUT, api.logout);

const init = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHANG_FIELD]: (state, { payload: checkError }) => ({
      ...state,
      user: null,
      checkError,
    }),

    [LOGOUT]: (state) => ({ ...state, user: null }),
  },
  init
);
