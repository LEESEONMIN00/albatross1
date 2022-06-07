import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequsetThunk from "../lib/createRequsetThunk";
import * as api from "../api/auth";
import createActionTypes from "../lib/createActionTypes";

//action정의

//클라이언트로만 움직일때 사용하는 것은createAction
//서버와 클라이언트의 req,res는 thunk를 사용!

const CHANG_FIELD = "auth/CHANG_FIELD"; //데이터 작성 변화
const INITIALIZE_FORM = "auth/INITIALIZE_FORM"; //다른 form으로 잘 가는지

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionTypes("auth/LOGIN");

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createActionTypes("auth/REGISTER");

export const changeField = createAction(
  CHANG_FIELD,
  ({ form, name, value }) => ({
    form, //register,login
    name, //login,password,pwcheck
    value, //real value
  })
);
export const initForm = createRequsetThunk(INITIALIZE_FORM, (form) => form);
export const register = createRequsetThunk(REGISTER, api.register);
//type,     request
export const login = createRequsetThunk(LOGIN, api.login);

//state 정의
const init = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
  },

  login: {
    username: "",
    password: "",
  },
  auth: null, //response.data로 넣었으니깐 state가 변했고 재렌더
  authError: null,
};

// REDUCER정의 :현재 상태와 액션 객체

const auth = handleActions(
  {
    [CHANG_FIELD]: (state, { payload: { form, name, value } }) =>
      produce(state, (draft) => {
        draft[form][name] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: init[form],
      authError: null,
    }),
    //reponese.date =>{username:"dbwjd"}
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),

    [REGISTER_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),

    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),

    [LOGIN_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
  },
  init
);

export default auth;
//draft 스프레드구문과 같은 역할
