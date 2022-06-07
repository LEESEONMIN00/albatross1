import createActionTypes from "../lib/createActionTypes";
import createRequsetThunk from "../lib/createRequsetThunk";
import * as api from "../api/post";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";

const [READ, READ_SUCCESS, READ_FAILURE] = createActionTypes("post/READ");

const UNLOAD_POST = "post/UNLOAD_POST"; //포스트 페이지에서 벗어날 때 데이터 비우기

export const readPost = createRequsetThunk(READ, api.readPost);
export const unloadPost = createAction(UNLOAD_POST);

const init = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),

    [READ_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),

    [UNLOAD_POST]: () => init,
  },
  init
);

export default post;
