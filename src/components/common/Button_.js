import React from "react";
import palette from "../../lib/palette";
import styled from "styled-components";
import { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.button`
  border: none;
  outline: none;

  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;

  color: white;
  cursor: pointer;

  background: ${palette.gray[8]};

  &:hover {
    background: ${palette.gray[9]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[6]};
      &:hover {
        background: ${palette.cyan[5]};
      }
    `}


    ${(props) =>
    props.gray &&
    css`
      background: ${palette.gray[6]};
      &:hover {
        background: ${palette.gray[5]};
      }
    `}
`;
const Button = ({ to, ...rest }) => {
  const history = useNavigate();

  const onClick = (e) => {
    if (to) {
      history(to);
    }

    if (rest.onClick) {
      //다른ONclick이벤트가 들어온다면
      rest.onClick(e); //해당 이벤트 실행
    }
  };

  return <StyledButton {...rest} onClick={onClick} />;
};

export default Button;

//useNavigate양식이 제출되거나 특정 event가 발생할 때,  내가 원하는 url로 가게 해준다.
//navagate(이동할 url, 전달할 인자)
