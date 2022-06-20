import React from "react";

import styled from "styled-components";
import Button from "./Button";
import Responsive from "./Responsive";
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 3px;
  }

  .userSec {
    display: flex;
    align-items: center;
  }

  .useInfo {
    font-weight: 800;
    margin-right: 1rem;
  }
`;
const Spacer = styled.div`
  height: 4rem;
`;
function Header({ user, onLogout }) {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo">ALBATROSS</Link>

          {user ? (
            <div className="userSec">
              <Link to="/userInfo" className="userInfo">환영합니다!{user.username}님</Link>
              <Button onClick={onLogout}>LOG OUT</Button>
            </div>
          ) : (
            <div className="userSec">
              <Button to="/login">LOGIN</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;
