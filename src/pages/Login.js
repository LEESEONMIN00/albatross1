import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import { changeField, initForm, login } from "../modules/auth";
import { check } from "../modules/user";

const LOGIN = "login";

function Login() {
  const history = useNavigate();
  const dispatch = useDispatch(); //생성한 action을 실행
  const { form, authError, auth, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  })); //connect함수를 이용하지 않고 REDUX의 STATE를 조회
  //form이라는 이름으로 auth.login로 정의

  const [err, setErr] = useState();

  const onChange = (e) => {
    setErr(null);
    const { name, value } = e.target; //username dbwjd
    dispatch(changeField({ form: LOGIN, name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
    dispatch(initForm(LOGIN));
  };

  useEffect(() => {
    dispatch(initForm(LOGIN)); //form를 지워주는 역할
    return () => dispatch(initForm(LOGIN));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setErr("ID또는 패스워드를 확인해주세요ㅠㅠ");
    }
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history("/");
    }
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.log("로컬 스토리지 에러");
    }
  }, [user, history]);

  return (
    <AuthTemplate>
      <Helmet>
        <title>LOG IN</title>
      </Helmet>
      <AuthForm
        type={LOGIN}
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={err}
      />
    </AuthTemplate>
  );
}

export default Login;
