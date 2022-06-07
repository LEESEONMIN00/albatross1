import React from "react";
import styled from "styled-components";
import Button from "../common/Button";

const PostActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.2rem;
  & + & {
    margin-left: 0.5rem;
  }
`;

const PostActionButton = ({ onPublish, onCancel, isEdit }) => {
  return (
    <PostActionButtonBlock>
      <StyledButton cyan onClick={onPublish}>
        {isEdit? "Edit!!":" Post!!"}
      </StyledButton>
      <StyledButton gray onClick={onCancel}>
        Cancel
      </StyledButton>
    </PostActionButtonBlock>
  );
};

export default PostActionButton;
