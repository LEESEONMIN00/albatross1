import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../modules/user";
import Header from "../components/common/Header";

function HeaderContainer() {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  const onLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout()); //여기가 문제라고?
  };
  return <Header user={user} onLogout={onLogout} />;
}

export default HeaderContainer;
