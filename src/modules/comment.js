// import React from "react";
// import createActionTypes from "../lib/createActionTypes";
// import createRequsetThunk from "../lib/createRequsetThunk";
// import * as api from "../api/post";
// import { handleActions } from 'redux-actions';

// const [COMMENT, COMMENT_SUCCESS, COMMENT_FAILURE] = createActionTypes("post/COMMENT");

// export const writeComment = createRequsetThunk(COMMENT, api.writeComment);

// const init ={
//     title: "",
//     body: "",
//     post: null,
//     postError: null,
//     originalPostId:null,
// };

// const comment = handleActions(
//     {
//         [COMMENT]: (state) => ({ ...state, post: null, postError: null }),
//         [COMMENT_SUCCESS]: (state, { payload: post }) => ({
//         ...state,
//         post,
//         }),

//         [COMMENT_FAILURE]: (state, { payload: postError }) => ({
//         ...state,
//         post: null,
//         postError,
//         }),
//     },
//     init
// )


// export default comment;