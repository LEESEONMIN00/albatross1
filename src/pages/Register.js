import React, { useEffect, useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initForm, register } from "../modules/auth";
import { check } from "../modules/user";

import { useNavigate } from "react-router-dom";

function Register() {
  const history = useNavigate();
  const dispatch = useDispatch(); //생성한 action을 실행
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register, //auth(reducer)register(state)
    auth: auth.auth, //auth(reducer)register(auth)
    authError: auth.authError,
    user: user.user,
  })); //REDUX의 STATE를 조회

  const [err, setErr] = useState();

  const onChange = (e) => {
    setErr(null); //setErr(null)
    const { name, value } = e.target;
    dispatch(changeField({ form: "register", name, value }));
  };

  //유효성 검사 pw,pwc하기
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;

    if ([username, password, passwordConfirm].includes("")) {
      setErr("항목을 모두 입력해주세요");
      return;
    }

    if (password !== passwordConfirm) {
      setErr("패스워드가 일치 하지 않습니다. ");
      dispatch(changeField({ form: "register", key: password, value: "" }));
      dispatch(
        changeField({ form: "register", key: passwordConfirm, value: "" })
      );
      return;
    }
    dispatch(register({ username, password })); //화면에서 전송한 파라미터
    dispatch(initForm("register"));
  };

  useEffect(() => {
    setErr(""); //에러 메세지 표시 X
    dispatch(initForm("register"));
    return () => dispatch(initForm("register"));
  }, [dispatch]);

  useEffect(() => {
    //논리 체크
    if (authError) {
      if (authError.response.status === 409) {
        setErr("입력한 아이디는 사용되고 있는 아이디 입니다");
      }

      setErr("회원등록에 실패 하였습니다");
    }
    if (auth) {
      dispatch(check());
      console.log(`${auth.username}환영합니다`);
    }
  }, [auth, authError, dispatch]);

  //user확인
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
      <AuthForm
        type="register"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        error={err}
      />
    </AuthTemplate>
  );
}
export default Register;
