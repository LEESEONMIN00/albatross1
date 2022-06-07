import { finish, start } from "../modules/loading";

export default function createRequsetThunk(type, request) {
  const SUEESS = `${type}_SUCCESS`;
  const FAILURE = `${type}FAILURE`;

  //param :{username,password}
  return (param) => async (dispatch) => {
    dispatch({ type }); //start
    try {
      dispatch(start(type));
      //await api.register({username,password})
      const response = await request(param);
      //서버의 ctx.body = user.serialize()
      dispatch({
        type: SUEESS,
        payload: response.data, //{username:"dbwjd"}
        meta: response,
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload: error,
        error: true,
      });
      throw error;
    }
    dispatch(finish(type));
  };
}
