import { createAction, handleActions } from "redux-actions";
import createActionTypes from "../lib/createActionTypes";
import createRequsetThunk from "../lib/createRequsetThunk";
import * as api from "../api/post";


const INITIALIZE = "write/INITIALIZE";
const CHANG_FIELD = "write/CHANG_FIELD";
const SET_ORIGINAL_POST ="write/SET_ORIGINAL_POST";

const [POST, POST_SUCCESS, POST_FAILUR] = createActionTypes("write/POST");
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] = createActionTypes("write/UPDATE")


export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANG_FIELD, ({ key, value }) => ({
  key,
  value,
}));

export const setOriginalPost = createAction(SET_ORIGINAL_POST,(post)=>post);


const init = {
  title: "",
  body: "",
  tags: [],
  post: null,
  postError: null,
  originalPostId:null,
};
export const writePost = createRequsetThunk(POST, api.WritePost);
export const updatePost = createRequsetThunk(UPDATE,api.updatePost);

const write = handleActions(
  {
    [INITIALIZE]: (state) => init,
    [CHANG_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),

    [POST]: (state) => ({ ...state, post: null, postError: null }),
    //서버가 보낸 body가 클라이언트로 와서->respone.date담아져서
    [POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),

    [POST_FAILUR]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
    [SET_ORIGINAL_POST]:(state,{payload: post})=>({
      ...state,
      title: post.title,
      body: post.body,
      tags:post.tags,
      originalPostId: post._id,
    }),
    [UPDATE_SUCCESS]:(state,{payload: post})=>({
      ...state,
      post,
    }),
    [UPDATE_FAILURE]:(state,{payload: postError})=>({
      ...state,
      post: null,
      postError,
    }),
  },
  init
);

export default write;
